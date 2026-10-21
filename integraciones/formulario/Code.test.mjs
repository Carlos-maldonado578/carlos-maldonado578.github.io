// Prueba de Code.gs en Node con simulacros de los servicios de Apps Script (no toca Google).
// Uso: npm run test:gs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

const codigo = readFileSync(new URL('./Code.gs', import.meta.url), 'utf8');
const TOKEN = '123456789:AAFakeTokenParaPruebasNoEsReal_abcdefghij';

// Entorno nuevo por prueba: planilla, cache, Telegram y correo simulados
function entorno({ telegram = 200, correoFalla = false, telegramLanza = false, hojaFalla = false, sinPlanilla = false } = {}) {
  const hojas = {};
  const llamadas = { fetch: [], correos: [] };
  const hoja = (nombre) => (hojas[nombre] ??= { filas: [], formatos: [] });
  const libro = {
    getSheetByName: (n) => hojas[n] ?? null,
    insertSheet: (n) => { hoja(n); return libro.getSheetByName(n) && wrap(n); },
  };
  let falla = hojaFalla;
  const wrap = (n) => ({
    appendRow: (f) => { if (falla && n === 'Contactos') throw new Error('Sheets no disponible'); hoja(n).filas.push(Array.from(f)); },
    getLastRow: () => hoja(n).filas.length,
    getRange: (fila, _c, _nf, nc) => ({
      setNumberFormat: (f) => hoja(n).formatos.push(f),
      setValues: (v) => { if (falla && n === 'Contactos') throw new Error('Sheets no disponible'); hoja(n).filas[fila - 1] = Array.from(v[0]).slice(0, nc); },
    }),
  });
  libro.getSheetByName = (n) => (hojas[n] ? wrap(n) : null);
  const cache = new Map();
  const props = { TELEGRAM_TOKEN: TOKEN, TELEGRAM_CHAT_ID: '99', EMAIL_AVISO: 'aviso@ejemplo.cl' };
  const ctx = {
    // Script vinculado: solo getActiveSpreadsheet(). openById no existe a proposito: si el codigo lo usara, las pruebas fallan.
    SpreadsheetApp: { getActiveSpreadsheet: () => { if (sinPlanilla) throw new Error('No hay planilla contenedora'); return libro; } },
    PropertiesService: { getScriptProperties: () => ({ getProperty: (k) => props[k] ?? null }) },
    CacheService: { getScriptCache: () => ({ get: (k) => cache.get(k) ?? null, put: (k, v) => cache.set(k, v) }) },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    Utilities: {
      DigestAlgorithm: { SHA_256: 'sha256' },
      computeDigest: (_a, s) => [...createHash('sha256').update(s).digest()].map((b) => (b > 127 ? b - 256 : b)),
      formatDate: (_d, _z, f) => (f === 'yyyyMMddHH' ? '2026102010' : '2026-10-20 10:00:00'),
    },
    UrlFetchApp: {
      fetch: (url, op) => {
        llamadas.fetch.push({ url, op });
        if (telegramLanza) throw new Error('Request failed for ' + url);
        return { getResponseCode: () => telegram };
      },
    },
    MailApp: { sendEmail: (o) => { if (correoFalla) throw new Error('cuota'); llamadas.correos.push(o); } },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (s) => ({ setMimeType() { return this; }, getContent: () => s }) },
    Logger: { log() {} },
  };
  vm.createContext(ctx);
  vm.runInContext(codigo, ctx);
  const post = (obj, crudo) => JSON.parse(ctx.doPost({ postData: { contents: crudo ?? JSON.stringify(obj) } }).getContent());
  const sinEspera = () => { for (const k of [...cache.keys()]) if (k.endsWith(':min')) cache.delete(k); };
  return { ctx, hojas, llamadas, post, sinEspera, props, arreglar: () => { falla = false; }, vaciaExistente: (n) => hoja(n) };
}

const bueno = (extra = {}) => ({ nombre: 'Ana Prueba', contacto: 'ana@ejemplo.cl', mensaje: 'Anotamos los pedidos a mano y los pasamos a una planilla.', hp: '', t: 9000, ...extra });

test('contacto valido: fila "Nuevo", aviso a Telegram con el token en la URL y correo', () => {
  const e = entorno();
  assert.deepEqual(e.post(bueno()), { ok: true });
  assert.equal(e.hojas.Contactos.filas[0][0], 'Fecha');
  const fila = e.hojas.Contactos.filas[1];
  assert.deepEqual(fila.slice(1), ['Ana Prueba', 'ana@ejemplo.cl', bueno().mensaje, 'Nuevo']);
  assert.equal(e.hojas.Contactos.formatos.at(-1), '@');
  assert.equal(e.llamadas.fetch.length, 1);
  assert.match(e.llamadas.fetch[0].url, /api\.telegram\.org\/bot.+\/sendMessage$/);
  const cuerpo = JSON.parse(e.llamadas.fetch[0].op.payload);
  assert.equal(cuerpo.chat_id, '99');
  assert.ok(!('parse_mode' in cuerpo), 'texto plano: sin parse_mode');
  assert.match(cuerpo.text, /Ana Prueba/);
  assert.equal(e.llamadas.correos.length, 1);
  assert.equal(e.llamadas.correos[0].to, 'aviso@ejemplo.cl');
  assert.equal(e.llamadas.correos[0].replyTo, 'ana@ejemplo.cl');
});

test('spam: campo trampa o menos de 3 s responden ok sin guardar ni avisar', () => {
  for (const extra of [{ hp: 'http://spam.example' }, { t: 2999 }, { t: 0 }, { t: undefined }, { t: '9000' }]) {
    const e = entorno();
    assert.deepEqual(e.post(bueno(extra)), { ok: true }, JSON.stringify(extra));
    assert.equal(e.hojas.Contactos, undefined);
    assert.equal(e.llamadas.fetch.length + e.llamadas.correos.length, 0);
  }
});

test('validacion: mismas reglas que main.js y largos maximos -> ok:false sin guardar', () => {
  const malos = [
    { nombre: 'A' }, { nombre: ' ' }, { nombre: 'x'.repeat(101) },
    { contacto: '' }, { contacto: 'abc' }, { contacto: '1234567' }, { contacto: 'x'.repeat(151) },
    { mensaje: 'corto' }, { mensaje: 'x'.repeat(2001) },
  ];
  for (const extra of malos) {
    const e = entorno();
    assert.deepEqual(e.post(bueno(extra)), { ok: false }, JSON.stringify(extra).slice(0, 60));
    assert.equal(e.hojas.Contactos, undefined);
    assert.equal(e.llamadas.fetch.length, 0);
  }
  const e = entorno();
  assert.deepEqual(e.post(null, 'no es json'), { ok: false });
  assert.deepEqual(e.post(null, '[1,2]'), { ok: false });
  assert.deepEqual(e.post(null, JSON.stringify({ ...bueno(), mensaje: 'x'.repeat(9000) })), { ok: false });
  assert.deepEqual(e.ctx.doPost({}).getContent(), '{"ok":false}');
  // telefono con 8+ digitos es valido
  assert.deepEqual(entorno().post(bueno({ contacto: '+56 9 1234 5678' })), { ok: true });
});

test('limites: 1 por minuto y 5 por hora por contacto (aunque lo escriban distinto); excedidos responden ok sin guardar', () => {
  const e = entorno();
  assert.deepEqual(e.post(bueno()), { ok: true });
  assert.deepEqual(e.post(bueno({ contacto: 'ANA@Ejemplo.CL' })), { ok: true }); // mismo contacto, dentro de 60 s
  assert.equal(e.hojas.Contactos.filas.length, 2); // encabezado + 1
  for (let i = 0; i < 6; i++) { e.sinEspera(); e.post(bueno()); }
  assert.equal(e.hojas.Contactos.filas.length - 1, 5); // tope por hora
  assert.equal(e.llamadas.correos.length, 5);
});

test('limite global: 30 por hora; desde el 31 responde {ok:false} (el visitante ve el correo) y no guarda', () => {
  const e = entorno();
  for (let i = 0; i < 30; i++) assert.deepEqual(e.post(bueno({ contacto: `c${i}@ejemplo.cl` })), { ok: true });
  for (let i = 30; i < 40; i++) assert.deepEqual(e.post(bueno({ contacto: `c${i}@ejemplo.cl` })), { ok: false });
  assert.equal(e.hojas.Contactos.filas.length - 1, 30);
});

test('limites por contacto siguen respondiendo {ok:true} (misma persona reenviando; el primero ya se guardo)', () => {
  const e = entorno();
  assert.deepEqual(e.post(bueno()), { ok: true });
  assert.deepEqual(e.post(bueno()), { ok: true }); // dentro de 60 s
  for (let i = 0; i < 8; i++) { e.sinEspera(); assert.deepEqual(e.post(bueno()), { ok: true }); } // pasado el tope de 5 por hora
  assert.equal(e.hojas.Contactos.filas.length - 1, 5);
});

test('inyeccion de formulas: = + - @ tabulacion se guardan con apostrofo delante', () => {
  const e = entorno();
  e.post(bueno({ nombre: '=HYPERLINK("http://x","clic")', contacto: '+56912345678', mensaje: '@SUM(A1:A9) mensaje largo' }));
  e.sinEspera();
  e.post(bueno({ nombre: '-2+3 nombre', contacto: '\t56912345678', mensaje: '\tmensaje con tabulacion' }));
  const [, a, b] = e.hojas.Contactos.filas;
  assert.deepEqual(a.slice(1, 4), ["'=HYPERLINK(\"http://x\",\"clic\")", "'+56912345678", "'@SUM(A1:A9) mensaje largo"]);
  // el cuerpo se recorta (trim), asi que la tabulacion inicial no llega: nada peligroso queda al comienzo
  assert.ok(!/^[=+\-@\t]/.test(b[1]) && !/^[=+\-@\t]/.test(b[3]));
  assert.ok(String(b[1]).startsWith("'-2"));
});

test('fallos de Telegram o correo: la fila queda guardada, ok:true y el error va a "Errores" sin el token', () => {
  for (const cfg of [{ telegram: 500 }, { telegramLanza: true }, { correoFalla: true }]) {
    const e = entorno(cfg);
    assert.deepEqual(e.post(bueno()), { ok: true }, JSON.stringify(cfg));
    assert.equal(e.hojas.Contactos.filas.length, 2);
    assert.ok(e.hojas.Errores.filas.length >= 2, 'hoja Errores con encabezado y al menos un error');
    assert.ok(!JSON.stringify(e.hojas.Errores.filas).includes(TOKEN), 'el token no se escribe en Errores');
  }
});

test('script vinculado: usa getActiveSpreadsheet (nunca openById) y no necesita SHEET_ID', () => {
  const e = entorno();
  assert.ok(!('SHEET_ID' in e.props));
  assert.deepEqual(e.post(bueno()), { ok: true });
  assert.equal(e.hojas.Contactos.filas.length, 2);
  assert.ok(!/openById|SHEET_ID/.test(codigo), 'Code.gs no debe usar openById ni SHEET_ID');
});

test('sin planilla contenedora: ok:false (la pagina muestra el correo de respaldo) y sin excepciones', () => {
  const e = entorno({ sinPlanilla: true });
  assert.deepEqual(e.post(bueno()), { ok: false });
  assert.equal(e.llamadas.fetch.length + e.llamadas.correos.length, 0);
});

test('sin propiedades de Telegram o correo: la fila igual se guarda, ok:true y el error queda en Errores', () => {
  const e = entorno();
  e.props.TELEGRAM_TOKEN = '';
  e.props.EMAIL_AVISO = '';
  assert.deepEqual(e.post(bueno()), { ok: true });
  assert.equal(e.hojas.Contactos.filas.length, 2);
  assert.ok(e.hojas.Errores.filas.some((f) => /Falta la propiedad/.test(f[2])));
});

test('appsscript.json: permiso de planilla limitado a la planilla contenedora', () => {
  const m = JSON.parse(readFileSync(new URL('./appsscript.json', import.meta.url), 'utf8'));
  assert.ok(m.oauthScopes.includes('https://www.googleapis.com/auth/spreadsheets.currentonly'));
  assert.ok(!m.oauthScopes.includes('https://www.googleapis.com/auth/spreadsheets'));
  assert.deepEqual(m.webapp, { executeAs: 'USER_DEPLOYING', access: 'ANYONE_ANONYMOUS' });
});

test('probar(): simula un envio valido', () => {
  const e = entorno();
  e.ctx.probar();
  assert.equal(e.hojas.Contactos.filas.length, 2);
  assert.equal(e.hojas.Contactos.filas[1][4], 'Nuevo');
});

test('si guardar falla, el reintento NO cuenta como repetido: se guarda al segundo intento (A1)', () => {
  const e = entorno({ hojaFalla: true });
  assert.deepEqual(e.post(bueno()), { ok: false });
  assert.equal(e.llamadas.fetch.length + e.llamadas.correos.length, 0);
  e.arreglar();
  assert.deepEqual(e.post(bueno()), { ok: true }); // sin esperar 60 s
  assert.equal(e.hojas.Contactos.filas.length, 2);
  assert.equal(e.llamadas.correos.length, 1);
});

test('tope global: avisa UNA vez por hora por Telegram y en Errores; los demas se descartan', () => {
  const e = entorno();
  for (let i = 0; i < 40; i++) e.post(bueno({ contacto: `c${i}@ejemplo.cl` }));
  assert.equal(e.hojas.Contactos.filas.length - 1, 30);
  const alertas = e.llamadas.fetch.filter((f) => /Tope de 30/.test(JSON.parse(f.op.payload).text));
  assert.equal(alertas.length, 1);
  assert.equal(e.hojas.Errores.filas.filter((f) => f[1] === 'tope-global').length, 1);
});

test('normalizacion: ana+1@x.cl, ANA@x.cl y ana@x.cl son el mismo; ana.b@x.cl no es anab@x.cl; telefonos por ultimos 9 digitos; invisibles ignorados', () => {
  const n = entorno().ctx.normalizar;
  assert.equal(n('ana+1@Ejemplo.cl'), n('ANA@ejemplo.cl'));
  assert.notEqual(n('ana.b@ejemplo.cl'), n('anab@ejemplo.cl'));
  assert.equal(n('912345678'), n('+56 9 1234 5678'));
  assert.equal(n('ana\u200b@ejemplo.cl'), n('ana@ejemplo.cl'));
  const e = entorno();
  for (const c of ['ana@ejemplo.cl', 'ANA+2@ejemplo.cl', 'ana+x@ejemplo.cl']) e.post(bueno({ contacto: c }));
  assert.equal(e.hojas.Contactos.filas.length - 1, 1);
});

test('entrada que no es texto se rechaza: numeros, listas, objetos (A4)', () => {
  for (const extra of [{ nombre: ['ab'] }, { nombre: {} }, { contacto: 12345678 }, { mensaje: 12345678901 }, { hp: 0 }, { hp: [] }]) {
    const e = entorno();
    assert.deepEqual(e.post(bueno(extra)), { ok: false }, JSON.stringify(extra));
    assert.equal(e.hojas.Contactos, undefined);
  }
});

test('una hoja "Contactos" que ya existe vacia recibe encabezados (A6)', () => {
  const e = entorno();
  e.vaciaExistente('Contactos'); // como si Carlos renombrara "Hoja 1"
  e.post(bueno());
  assert.deepEqual(e.hojas.Contactos.filas[0], ['Fecha', 'Nombre', 'Contacto', 'Mensaje', 'Estado']);
  assert.equal(e.hojas.Contactos.filas[1][1], 'Ana Prueba');
});

test('el repo no lleva secretos: ningun token de bot, id de planilla ni correo de aviso en integraciones/', () => {
  for (const f of readdirSync(new URL('./', import.meta.url))) {
    if (f === 'Code.test.mjs') continue;
    const t = readFileSync(new URL('./' + f, import.meta.url), 'utf8');
    assert.ok(!/\b\d{8,10}:[A-Za-z0-9_-]{30,}\b/.test(t), `${f}: parece un token de Telegram`);
    assert.ok(!/\b1[A-Za-z0-9_-]{43}\b/.test(t), `${f}: parece un ID de planilla`);
    assert.ok(!/getProperty\(['"][A-Z_]+['"]\)\s*\|\|\s*['"]/.test(t), `${f}: valor por defecto para un secreto`);
  }
});
