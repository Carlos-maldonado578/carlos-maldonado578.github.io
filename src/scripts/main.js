const $ = (id) => document.getElementById(id);
const t0 = Date.now();
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Demo: bucle de presentacion con pausa (WCAG 2.2.2); el estado final completo esta en el HTML ---- */
const demo = $('demo');
const pausa = $('demo-pausa');
if (demo && pausa && !reducido) {
  const filas = demo.querySelectorAll('.fila-nueva');
  const aviso = demo.querySelector('.aviso');
  const msg = $('demo-msg');
  const meta = $('demo-meta');
  const mensajes = [
    ['Telegram · Juan · 08:14', 'Producción: 120 cajas'],
    ['Telegram · Marta · 08:31', 'Producción: 98 cajas'],
    ['Telegram · Luis · 08:47', 'Producción: 134 cajas'],
  ];
  const mostrarMsg = (i) => {
    meta.textContent = mensajes[i][0];
    msg.textContent = mensajes[i][1];
    msg.classList.remove('on');
    void msg.offsetWidth;
    msg.classList.add('on');
  };
  const fila = (i) => () => filas[i].classList.add('on');
  // [espera antes del paso en ms, paso]
  const pasos = [
    [0, () => { filas.forEach((f) => f.classList.remove('on')); aviso.classList.remove('on'); mostrarMsg(0); }],
    [1400, fila(0)],
    [1500, () => mostrarMsg(1)],
    [1400, fila(1)],
    [1500, () => mostrarMsg(2)],
    [1400, fila(2)],
    [1500, () => aviso.classList.add('on')],
    [6000, () => {}],
  ];
  let i = 0;
  let timer;
  const tick = () => {
    pasos[i][1]();
    i = (i + 1) % pasos.length;
    timer = setTimeout(tick, pasos[i][0]);
  };
  demo.classList.add('armada');
  pausa.hidden = false;
  tick();
  pausa.addEventListener('click', () => {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
      pausa.textContent = 'Reanudar';
    } else {
      pausa.textContent = 'Pausar';
      timer = setTimeout(tick, pasos[i][0]);
    }
  });
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
    // solo textContent: nunca innerHTML con lo que escribe el visitante
    $('x-nombre').textContent = v.nombre;
    $('x-contacto').textContent = v.contacto;
    $('x-quien').textContent = v.nombre;
    $('x-hora').textContent = `${p(d.getHours())}:${p(d.getMinutes())}`;
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

/* ---- Cabecera y volver arriba ---- */
const subir = document.querySelector('.subir');
const movil = matchMedia('(max-width: 767px)');
const alScroll = () => {
  // en movil el boton no tapa el boton de enviar (franja de 96px al pie)
  const r = boton.getBoundingClientRect();
  const tapa = movil.matches && r.bottom > innerHeight - 96 && r.top < innerHeight;
  subir.classList.toggle('visible', scrollY > innerHeight && !tapa);
};
addEventListener('scroll', alScroll, { passive: true });
addEventListener('resize', alScroll);
alScroll();
