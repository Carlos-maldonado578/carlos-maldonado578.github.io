const $ = (id) => document.getElementById(id);
const t0 = Date.now();
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Caso real: un reloj recorre el eje de 08:00 a 20:00 una vez al entrar en pantalla; el HTML ya es el estado final ---- */
const DUR_CASO = 9500; // ms que tarda el cursor de 08:00 a 20:00 (unica duracion)
const ESPERA_CASO = 500; // ms quieto en 08:00 antes de partir
const eje = $('caso-eje');
const pausaC = $('caso-pausa');
const ICONOS_C = {
  'Pausar': '<path d="M8 5v14M16 5v14"/>',
  'Reanudar': '<path d="M7 4l13 8-13 8z"/>',
  'Ver de nuevo': '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
};
// Botón solo con símbolo: el nombre accesible cambia con el estado
function estadoC(nombre) {
  pausaC.setAttribute('aria-label', nombre);
  pausaC.title = nombre;
  pausaC.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">' + ICONOS_C[nombre] + '</svg>';
}
// en pantallas angostas el caso son dos listas apiladas: queda el estado final, sin reloj
if (eje && pausaC && !reducido && matchMedia('(min-width: 900px)').matches) {
  const lectura = $('caso-hora');
    const lleno = eje.querySelector('.tramo.lleno');
  const num = (el, k) => parseFloat(el.style.getPropertyValue(k));
  const [ia, ib] = [num(lleno, '--a'), num(lleno, '--b')];
  const hitos = [...eje.querySelectorAll('.hito, .tramo.lleno')].map((el) => [el, num(el, '--h') || num(el, '--a')]);
  const dos = (n) => String(n).padStart(2, '0');
  let t = 0;
  let last = 0;
  let raf = 0;

  const pintar = () => {
    const p = Math.min(1, Math.max(0, (t - ESPERA_CASO) / DUR_CASO));
    const h = 8 + 12 * p;
    const min = Math.floor(h * 60 + 1e-6);
    lectura.textContent = `${dos(Math.floor(min / 60))}:${dos(min % 60)}`;
    const pista = eje.querySelector('.reloj').clientWidth;
    eje.style.setProperty('--c', p * pista + 'px');
    lleno.style.setProperty('--r', Math.min(1, Math.max(0, (h - ia) / (ib - ia))));
    hitos.forEach(([el, x]) => el.classList.toggle('on', h >= x));
  };
  const correr = () => {
    last = performance.now();
    raf = requestAnimationFrame(function paso(now) {
      t += Math.min(now - last, 100); // tras una pestana en segundo plano no salta
      last = now;
      pintar();
      if (t < ESPERA_CASO + DUR_CASO) return (raf = requestAnimationFrame(paso));
      raf = 0;
      eje.classList.replace('corre', 'fin');
      estadoC('Ver de nuevo');
    });
  };
  const empezar = () => {
    t = 0;
    eje.classList.remove('fin');
    eje.classList.add('corre');
    estadoC('Pausar');
    pintar();
    correr();
  };

  eje.classList.add('armada');
  pintar();
  pausaC.addEventListener('click', () => {
    if (eje.classList.contains('fin')) return empezar();
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
      estadoC('Reanudar');
    } else {
      estadoC('Pausar');
      correr();
    }
  });
  const ver = new IntersectionObserver(([e]) => {
    if (e.intersectionRect.height < Math.min(e.boundingClientRect.height * 0.4, innerHeight / 3)) return;
    ver.disconnect();
    pausaC.hidden = false;
    empezar();
  }, { threshold: Array.from({ length: 21 }, (_, i) => i / 20) });
  ver.observe(eje);
}

/* ---- Formulario ---- */
const URL_WEBHOOK = import.meta.env.PUBLIC_WEBHOOK_URL;
const form = $('form');
const campos = {
  mensaje: $('f-mensaje'),
  nombre: $('f-nombre'),
  contacto: $('f-contacto'),
};
const boton = $('enviar');
const fallo = $('fallo');

function validar(v) {
  const e = {};
  if (v.nombre.length < 2) e.nombre = 'Falta tu nombre.';
  if (!v.contacto) e.contacto = 'Falta un correo o teléfono para responderte.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.contacto) && v.contacto.replace(/\D/g, '').length < 8)
    e.contacto = 'Revisa el correo o teléfono: no parece completo.';
  if (v.mensaje.length < 10) e.mensaje = 'Falta contarme un poco más (al menos una frase).';
  return e;
}

function marcar(k, msg) {
  const el = $('e-' + k);
  el.textContent = msg || '';
  el.hidden = !msg;
  if (msg) campos[k].setAttribute('aria-invalid', 'true');
  else campos[k].removeAttribute('aria-invalid');
}

Object.keys(campos).forEach((k) =>
  campos[k].addEventListener('input', () => marcar(k, '')));

const bloquear = (si) => {
  Object.values(campos).forEach((c) => (c.readOnly = si));
  boton.setAttribute('aria-busy', String(si));
};

let enviando = false;
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  if (enviando) return;
  const v = {
    nombre: campos.nombre.value.trim(),
    contacto: campos.contacto.value.trim(),
    mensaje: campos.mensaje.value.trim(),
  };
  const errores = validar(v);
  Object.keys(campos).forEach((k) => marcar(k, errores[k]));
  const primero = Object.keys(campos).find((k) => errores[k]);
  if (primero) return campos[primero].focus();

  enviando = true;
  fallo.hidden = true;
  bloquear(true);
  boton.textContent = 'Enviando…';
  const ctl = new AbortController();
  const corte = setTimeout(() => ctl.abort(), 15000); // Apps Script puede tardar unos segundos en arrancar
  try {
    if (!URL_WEBHOOK) throw new Error('sin endpoint');
    // text/plain: Apps Script no responde la verificacion previa de CORS que dispara application/json. El cuerpo sigue siendo JSON.
    // La redireccion de Apps Script (302 a googleusercontent.com) se sigue sola (redirect: 'follow' es el valor por defecto).
    const r = await fetch(URL_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...v, hp: form.elements.sitio_web.value, t: Date.now() - t0 }),
      credentials: 'omit',
      signal: ctl.signal,
    });
    if (!r.ok) throw new Error('http ' + r.status);
    // exito solo si el receptor responde exactamente {ok:true}; cualquier otra cosa (ok:false, HTML, texto) es fallo
    const resp = await r.json();
    if (resp?.ok !== true) throw new Error('respuesta sin ok');
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    // solo textContent: nunca innerHTML con lo que escribe el visitante
    $('x-nombre').textContent = v.nombre;
    $('x-contacto').textContent = v.contacto;
    $('x-hora').textContent = `${p(d.getHours())}:${p(d.getMinutes())}`;
    $('tal-form').hidden = true;
    $('exito').hidden = false;
    document.getElementById('contacto').classList.add('enviado');
    document.querySelector('.cabecera').classList.add('cta-envio');
    $('exito-t').focus();
  } catch {
    fallo.hidden = false;
    boton.textContent = 'Reintentar';
  } finally {
    clearTimeout(corte);
    bloquear(false);
    enviando = false;
  }
});

/* ---- Cabecera: el boton aparece solo cuando ni el CTA del hero ni el formulario estan en pantalla ---- */
const cabecera = document.querySelector('.cabecera');
if (cabecera) {
  const sobre = new Set();
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? sobre.add(e.target) : sobre.delete(e.target)));
    cabecera.classList.toggle('cta-oculto', sobre.size > 0);
  });
  [document.querySelector('.hero-cta .btn'), document.getElementById('contacto')].forEach((el) => el && io.observe(el));
}

/* ---- Cabecera y volver arriba ---- */
const subir = document.querySelector('.subir');
const movil = matchMedia('(max-width: 767px)');
let sube = false; // el boton aparece al subir, no mientras se baja leyendo
let ultimo = scrollY;
const alScroll = () => {
  const dy = scrollY - ultimo;
  if (Math.abs(dy) > 4) sube = dy < 0;
  ultimo = scrollY;
  // en movil el boton no tapa el boton de enviar (franja de 96px al pie)
  const r = boton.getBoundingClientRect();
  const tapa = movil.matches && r.bottom > innerHeight - 96 && r.top < innerHeight;
  subir.classList.toggle('visible', scrollY > innerHeight && sube && !tapa);
};
addEventListener('scroll', alScroll, { passive: true });
addEventListener('resize', alScroll);
alScroll();
