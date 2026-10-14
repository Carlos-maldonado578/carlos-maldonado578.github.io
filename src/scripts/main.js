const $ = (id) => document.getElementById(id);
const t0 = Date.now();

/* ---- Demo: solo animacion de presentacion; el contenido final esta en el HTML ---- */
const demo = $('demo');
const repetir = $('demo-repetir');
if (demo && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  let timers = [];
  const correr = () => {
    timers.forEach(clearTimeout);
    repetir.hidden = true;
    demo.classList.remove('p1', 'p2', 'p3');
    void demo.offsetWidth;
    demo.classList.add('armada', 'p1');
    timers = [
      setTimeout(() => demo.classList.add('p2'), 800),
      setTimeout(() => demo.classList.add('p3'), 2400),
      setTimeout(() => (repetir.hidden = false), 3000),
    ];
  };
  demo.classList.add('armada');
  const io = new IntersectionObserver((e) => {
    if (e[0].isIntersecting) { io.disconnect(); correr(); }
  }, { threshold: 0.5 });
  io.observe(demo);
  repetir.addEventListener('click', correr);
}

/* ---- Formulario ---- */
const URL_WEBHOOK = import.meta.env.PUBLIC_WEBHOOK_URL;
const form = $('form');
const campos = {
  nombre: $('f-nombre'),
  contacto: $('f-contacto'),
  mensaje: $('f-mensaje'),
};
const boton = $('enviar');
const fallo = $('fallo');

function validar(v) {
  const e = {};
  if (v.nombre.length < 2) e.nombre = 'Falta tu nombre.';
  if (!v.contacto) e.contacto = 'Falta un correo o teléfono para responderte.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.contacto) && v.contacto.replace(/\D/g, '').length < 8)
    e.contacto = 'Revisa el correo o teléfono: no parece completo.';
  if (v.mensaje.length < 10) e.mensaje = 'Cuéntame un poco más (al menos una frase).';
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
  const corte = setTimeout(() => ctl.abort(), 10000);
  try {
    if (!URL_WEBHOOK) throw new Error('sin endpoint');
    const r = await fetch(URL_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...v, hp: form.elements.sitio_web.value, t: Date.now() - t0 }),
      credentials: 'omit',
      signal: ctl.signal,
    });
    if (!r.ok) throw new Error('http ' + r.status);
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    $('exito-fecha').textContent =
      `Solicitud recibida el ${p(d.getDate())}-${p(d.getMonth() + 1)}-${d.getFullYear()} a las ${p(d.getHours())}:${p(d.getMinutes())}.`;
    $('tal-form').hidden = true;
    $('exito').hidden = false;
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
