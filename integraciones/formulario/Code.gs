/**
 * Receptor del formulario de contacto (Google Apps Script, aplicacion web).
 *
 * La pagina (GitHub Pages) hace POST con { nombre, contacto, mensaje, hp, t } como texto JSON.
 * Por cada contacto valido: fila en la planilla + aviso a Telegram + correo.
 * Guia de instalacion: README.md (en esta carpeta).
 *
 * Este script esta VINCULADO a la planilla "Contactos web" (se crea desde la planilla: Extensiones > Apps Script).
 * Solo puede tocar esa planilla (permiso spreadsheets.currentonly); no necesita ni guarda su ID.
 *
 * Secretos: NO van en este archivo. Se leen de Propiedades del script (Configuracion del proyecto):
 *   TELEGRAM_TOKEN, TELEGRAM_CHAT_ID, EMAIL_AVISO
 */

var HOJA = 'Contactos';
var HOJA_ERRORES = 'Errores';
var ZONA = 'America/Santiago';
var MAX = { nombre: 100, contacto: 150, mensaje: 2000 };
var MAX_CUERPO = 8000; // caracteres del JSON completo
var MIN_MS_FORMULARIO = 3000; // un humano no llena el formulario en menos de 3 s
var ESPERA_SEG = 60; // maximo 1 envio por contacto cada 60 s
var MAX_POR_HORA_CONTACTO = 5;
var MAX_POR_HORA_GLOBAL = 30;

function doPost(e) {
  try {
    var d = leerCuerpo(e);
    if (!d) return responder({ ok: false });

    // 1. Spam: campo trampa lleno o enviado demasiado rapido. Se responde ok SIN guardar ni avisar,
    //    para que un bot no sepa que fue descartado.
    if (d.hp !== '' || !(d.t >= MIN_MS_FORMULARIO)) return responder({ ok: true });

    // 2. Validacion (mismas reglas que validar() de src/scripts/main.js, mas largos maximos)
    if (!valido(d)) return responder({ ok: false });

    // 3. Limites + escritura, bajo cerrojo para no pisar filas ni contadores
    var cerrojo = LockService.getScriptLock();
    cerrojo.waitLock(8000); // menos que el corte de 15 s de la pagina
    try {
      var tope = excedeLimites(d.contacto);
      if (tope) {
        // Tope global: alerta unica por Telegram y {ok:false}, para que el visitante real vea el correo de respaldo
        // y no se pierda su contacto en silencio. Limite por contacto: {ok:true}, es la misma persona reenviando
        // y su primer mensaje ya quedo guardado.
        if (tope === 'global') {
          alertarTope();
          return responder({ ok: false });
        }
        return responder({ ok: true });
      }
      guardarFila(d);
      registrarEnvio(d.contacto); // solo despues de guardar: si guardar falla, el reintento cuenta como primero
    } finally {
      cerrojo.releaseLock();
    }

    // 4. Avisos: si fallan, la fila ya esta guardada; el error queda en la hoja Errores
    avisarTelegram(d);
    avisarCorreo(d);
    return responder({ ok: true });
  } catch (err) {
    registrarError('doPost', err);
    return responder({ ok: false });
  }
}

/* ---------- entrada ---------- */

function leerCuerpo(e) {
  if (!e || !e.postData || typeof e.postData.contents !== 'string') return null;
  var crudo = e.postData.contents;
  if (crudo.length > MAX_CUERPO) return null;
  var o;
  try { o = JSON.parse(crudo); } catch (x) { return null; }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return null;
  // La pagina siempre manda textos: cualquier otro tipo (numeros, listas, objetos) se rechaza
  if (typeof o.nombre !== 'string' || typeof o.contacto !== 'string' || typeof o.mensaje !== 'string') return null;
  var hp = o.hp == null ? '' : o.hp;
  if (typeof hp !== 'string') return null;
  return {
    nombre: o.nombre.trim(),
    contacto: o.contacto.trim(),
    mensaje: o.mensaje.trim(),
    hp: hp,
    t: typeof o.t === 'number' ? o.t : NaN,
  };
}

// Igual que validar() de main.js
function valido(d) {
  if (d.nombre.length < 2 || d.nombre.length > MAX.nombre) return false;
  if (!d.contacto || d.contacto.length > MAX.contacto) return false;
  var esCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.contacto);
  var digitos = d.contacto.replace(/\D/g, '').length;
  if (!esCorreo && digitos < 8) return false;
  if (d.mensaje.length < 10 || d.mensaje.length > MAX.mensaje) return false;
  return true;
}

/* ---------- limites ---------- */
// CacheService es "mejor esfuerzo" (puede perder claves): frena el abuso normal, no es una garantia absoluta.
// Ventanas fijas por hora; para endurecer, cambiar por una hoja de conteo.

// Solo COMPRUEBA: devuelve false (puede seguir), 'contacto' o 'global'. Los contadores se suben en registrarEnvio().
function excedeLimites(contacto) {
  var cache = CacheService.getScriptCache();
  var hora = horaActual();
  var clave = 'c:' + huella(normalizar(contacto));

  if (cache.get(clave + ':min')) return 'contacto';
  if (cuenta(cache, clave + ':h:' + hora) >= MAX_POR_HORA_CONTACTO) return 'contacto';
  if (cuenta(cache, 'g:h:' + hora) >= MAX_POR_HORA_GLOBAL) return 'global';
  return false;
}

function registrarEnvio(contacto) {
  var cache = CacheService.getScriptCache();
  var hora = horaActual();
  var clave = 'c:' + huella(normalizar(contacto));
  cache.put(clave + ':min', '1', ESPERA_SEG);
  cache.put(clave + ':h:' + hora, String(cuenta(cache, clave + ':h:' + hora) + 1), 3600);
  cache.put('g:h:' + hora, String(cuenta(cache, 'g:h:' + hora) + 1), 3600);
}

function horaActual() {
  return Utilities.formatDate(new Date(), ZONA, 'yyyyMMddHH');
}

// Al llegar al tope global se avisa UNA vez por hora (por Telegram y en la hoja Errores): puede ser abuso.
// Mientras dura, los envios responden {ok:false} y la pagina muestra el correo de respaldo.
function alertarTope() {
  var cache = CacheService.getScriptCache();
  var marca = 'g:alerta:' + horaActual();
  if (cache.get(marca)) return;
  cache.put(marca, '1', 3600);
  var msg = 'Tope de ' + MAX_POR_HORA_GLOBAL + ' contactos por hora alcanzado: posible abuso. Los envios siguientes de esta hora no se guardan (los visitantes ven el correo de respaldo).';
  registrarError('tope-global', msg);
  try {
    UrlFetchApp.fetch('https://api.telegram.org/bot' + prop('TELEGRAM_TOKEN') + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chat_id: prop('TELEGRAM_CHAT_ID'), text: msg }),
      muteHttpExceptions: true,
    });
  } catch (err) {
    registrarError('telegram', err);
  }
}

function cuenta(cache, k) {
  return parseInt(cache.get(k) || '0', 10) || 0;
}

// Mismo contacto escrito distinto cuenta como uno: correo en minusculas y sin la parte +etiqueta; telefono por sus
// ultimos 9 digitos (912345678 = +56 9 1234 5678). Se quitan espacios y caracteres invisibles.
function normalizar(c) {
  var t = String(c).replace(/[\s\u200b-\u200f\u2060\ufeff]/g, '').toLowerCase();
  if (t.indexOf('@') !== -1) {
    var i = t.lastIndexOf('@');
    return t.slice(0, i).split('+')[0] + t.slice(i);
  }
  return t.replace(/\D/g, '').slice(-9);
}

function huella(s) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s);
  return bytes.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('');
}

/* ---------- planilla ---------- */

// Inyeccion de formulas: un valor que empieza con = + - @ o tabulacion (o retorno de carro) se guarda como texto
function segura(v) {
  return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
}

function guardarFila(d) {
  var libro = SpreadsheetApp.getActiveSpreadsheet(); // planilla contenedora del script vinculado
  var hoja = libro.getSheetByName(HOJA) || libro.insertSheet(HOJA);
  if (hoja.getLastRow() === 0) hoja.appendRow(['Fecha', 'Nombre', 'Contacto', 'Mensaje', 'Estado']); // tambien si la hoja ya existia vacia
  var fila = hoja.getLastRow() + 1;
  var fecha = Utilities.formatDate(new Date(), ZONA, 'yyyy-MM-dd HH:mm:ss');
  var rango = hoja.getRange(fila, 1, 1, 5);
  rango.setNumberFormat('@'); // formato "texto sin formato": nada se interpreta como formula, fecha o numero
  rango.setValues([[fecha, segura(d.nombre), segura(d.contacto), segura(d.mensaje), 'Nuevo']]);
}

/* ---------- avisos ---------- */

function textoAviso(d) {
  return 'Nuevo contacto web\n\nNombre: ' + d.nombre + '\nContacto: ' + d.contacto + '\n\n' + d.mensaje;
}

function avisarTelegram(d) {
  try {
    var token = prop('TELEGRAM_TOKEN');
    var r = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chat_id: prop('TELEGRAM_CHAT_ID'), text: textoAviso(d) }), // sin parse_mode: texto plano
      muteHttpExceptions: true,
    });
    // la descripcion que devuelve Telegram ("chat not found", "Forbidden...") no incluye el token
    if (r.getResponseCode() !== 200) registrarError('telegram', 'HTTP ' + r.getResponseCode() + ' ' + r.getContentText().slice(0, 200));
  } catch (err) {
    registrarError('telegram', err);
  }
}

function avisarCorreo(d) {
  try {
    var opciones = {
      to: prop('EMAIL_AVISO'),
      subject: 'Nuevo contacto web: ' + d.nombre.replace(/[\r\n]+/g, ' ').slice(0, 60),
      body: textoAviso(d),
    };
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.contacto)) opciones.replyTo = d.contacto;
    MailApp.sendEmail(opciones);
  } catch (err) {
    registrarError('correo', err);
  }
}

/* ---------- utilidades ---------- */

function prop(nombre) {
  var v = PropertiesService.getScriptProperties().getProperty(nombre);
  if (!v) throw new Error('Falta la propiedad del script: ' + nombre);
  return v;
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Nunca escribe el token: se borra de cualquier mensaje antes de guardarlo
function registrarError(origen, err) {
  try {
    var msg = String(err && err.message ? err.message : err);
    var token = PropertiesService.getScriptProperties().getProperty('TELEGRAM_TOKEN');
    if (token) msg = msg.split(token).join('***');
    var libro = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = libro.getSheetByName(HOJA_ERRORES) || libro.insertSheet(HOJA_ERRORES);
    if (hoja.getLastRow() === 0) hoja.appendRow(['Fecha', 'Origen', 'Error']);
    hoja.appendRow([Utilities.formatDate(new Date(), ZONA, 'yyyy-MM-dd HH:mm:ss'), origen, segura(msg.slice(0, 500))]); // appendRow es atomico: no pisa filas
    hoja.getRange(hoja.getLastRow(), 1, 1, 3).setNumberFormat('@');
  } catch (x) {
    Logger.log('No se pudo registrar el error (' + origen + '): ' + x);
  }
}

/* ---------- prueba desde el editor ---------- */

// Ejecuta esta funcion desde el editor de Apps Script (menu "Ejecutar"). Simula un envio real:
// debe aparecer una fila en "Contactos", un mensaje en Telegram y un correo. Mira el resultado en "Registro de ejecucion".
function probar() {
  var cuerpo = JSON.stringify({
    nombre: 'Prueba desde el editor',
    contacto: 'prueba-' + Date.now() + '@ejemplo.cl', // distinto cada vez para no chocar con el limite
    mensaje: 'Mensaje de prueba: si lo ves en la planilla, en Telegram y en el correo, todo funciona.',
    hp: '',
    t: 10000,
  });
  var salida = doPost({ postData: { contents: cuerpo } });
  Logger.log('Respuesta: ' + salida.getContent() + '  (debe ser {"ok":true}; revisa la hoja "Errores" si Telegram o el correo no llegaron)');
}
