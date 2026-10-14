const $ = (id) => document.getElementById(id);
const t0 = Date.now();
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Motor de presentaciones: pasos [espera antes del paso en ms, paso]; lo usan la demo y las pegas ---- */
function bucle(pasos, { repetir = true, alTerminar } = {}) {
  let i = 0;
  let timer = 0;
  let pausado = false;
  const tick = () => {
    timer = 0;
    pasos[i][1]();
    i++;
    if (i >= pasos.length) {
      if (!repetir) return alTerminar && alTerminar();
      i = 0;
    }
    timer = setTimeout(tick, pasos[i][0]);
  };
  tick();
  return {
    get pausado() { return pausado; },
    pausar() {
      if (!timer) return;
      clearTimeout(timer);
      timer = 0;
      pausado = true;
    },
    reanudar() {
      if (!pausado) return;
      pausado = false;
      timer = setTimeout(tick, pasos[i][0]);
    },
    detener() {
      clearTimeout(timer);
      timer = 0;
      pausado = false;
    },
  };
}

/* ---- Demo: bucle de presentacion con pausa (WCAG 2.2.2); el estado final completo esta en el HTML ---- */
const demo = $('demo');
const pausa = $('demo-pausa');
if (demo && pausa && !reducido) {
  const filas = demo.querySelectorAll('.fila-nueva');
  const aviso = demo.querySelector('.aviso');
  const msg = $('demo-msg');
  const meta = $('demo-meta');
  const mensajes = [
    ['Telegram · Juan · 08:14', 'Producción: 120 cajas'],
    ['Telegram · Marta · 08:31', 'Producción: 98 cajas'],
    ['Telegram · Luis · 08:47', 'Producción: 134 cajas'],
  ];
  const mostrarMsg = (i) => {
    meta.textContent = mensajes[i][0];
    msg.textContent = mensajes[i][1];
    msg.classList.remove('on');
    void msg.offsetWidth;
    msg.classList.add('on');
  };
  const fila = (i) => () => filas[i].classList.add('on');
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
  demo.classList.add('armada');
  pausa.hidden = false;
  const b = bucle(pasos);
  pausa.addEventListener('click', () => {
    if (b.pausado) {
      b.reanudar();
      pausa.textContent = 'Pausar';
    } else {
      b.pausar();
      pausa.textContent = 'Reanudar';
    }
  });
}

/* ---- Elige tu pega: pestanas con escenas; una vuelta automatica y luego quieta ---- */
const pegas = $('pegas');
if (pegas) {
  const lista = pegas.querySelector('.pegas-lista');
  const tabs = [...lista.querySelectorAll('.pega-tab')];
  const paneles = [...pegas.querySelectorAll('.pega')];
  const pausaP = $('pegas-pausa');
  const q = (p, s) => p.querySelector(s);
  const qa = (p, s) => [...p.querySelectorAll(s)];
  const on = (el, si = true) => el.classList.toggle('on', si);
  const flash = (el) => { el.classList.remove('celda-flash'); void el.offsetWidth; el.classList.add('celda-flash'); };

  // cada escena: ini (todo apagado), fin (estado final del HTML), pasos [espera, paso]; el primero es el reinicio
  const escenas = [
    (p) => {
      const msg = q(p, '.mensaje'), fila = q(p, '.fila-nueva'), datos = qa(p, '.dato'), res = q(p, '.pega-resultado');
      const poner = (si) => { on(msg, si); on(fila, si); on(res, si); datos.forEach((d) => d.classList.toggle('marcado', si)); };
      return {
        fin: () => poner(true),
        pasos: [
          [0, () => poner(false)],
          [400, () => on(msg)],
          [1200, () => datos.forEach((d) => d.classList.add('marcado'))],
          [1200, () => on(fila)],
          [1500, () => on(res)],
          [2500, () => {}],
        ],
      };
    },
    (p) => {
      const [a, c, d] = qa(p, '.p214'), aviso = q(p, '.aviso');
      const poner = (x, y, z, av) => { on(a, x); on(c, y); on(d, z); on(aviso, av); };
      return {
        fin: () => poner(false, false, true, true),
        pasos: [
          [0, () => poner(false, false, false, false)],
          [400, () => on(a)],
          [2000, () => { on(a, false); on(c); }],
          [1800, () => { on(c, false); on(d); }],
          [900, () => on(aviso)],
          [2500, () => {}],
        ],
      };
    },
    (p) => {
      const cifra = q(p, '.nivel-cifra'), barra = q(p, '.nivel-barra'), aviso = q(p, '.aviso');
      const nivel = (n) => { cifra.textContent = n; barra.style.setProperty('--nivel', n); };
      return {
        fin: () => { nivel(180); on(aviso); },
        pasos: [
          [0, () => { nivel(640); on(aviso, false); }],
          [600, () => nivel(410)],
          [1300, () => nivel(230)],
          [1300, () => nivel(180)],
          [700, () => on(aviso)],
          [2500, () => {}],
        ],
      };
    },
    (p) => {
      const origen = qa(p, 'tbody td'), dd = qa(p, '.boleta dd'), res = q(p, '.pega-resultado');
      const poner = (si) => { dd.forEach((x) => on(x, si)); on(res, si); };
      const campo = (i, td) => () => { on(dd[i]); if (td) flash(td); };
      return {
        fin: () => { poner(true); origen.forEach((t) => t.classList.remove('celda-flash')); },
        pasos: [
          [0, () => poner(false)],
          [500, campo(0, origen[1])],
          [700, campo(1)],
          [700, campo(2, origen[2])],
          [700, campo(3, origen[3])],
          [900, campo(4)],
          [1000, () => on(res)],
          [2500, () => {}],
        ],
      };
    },
  ].map((f, i) => f(paneles[i]));

  // roles de pestanas (sin JS son articulos comunes); tambien con movimiento reducido
  pegas.classList.add('tabs');
  if (!reducido) pegas.classList.add('armada');
  lista.hidden = false;
  q(pegas, '.pegas-guia').hidden = false;
  lista.setAttribute('role', 'tablist');
  lista.setAttribute('aria-label', 'Pegas que puedo automatizar');
  lista.setAttribute('aria-orientation', 'vertical');
  tabs.forEach((t) => t.setAttribute('role', 'tab'));
  paneles.forEach((p) => { p.setAttribute('role', 'tabpanel'); p.tabIndex = 0; });

  let actual = -1;
  let b = null;
  let fase = 'espera'; // espera | andando | fin
  let visible = false;
  let manual = false;
  const movil = matchMedia('(max-width: 1023px)');

  const activar = (i, { jugar = true } = {}) => {
    if (b) b.detener();
    if (actual >= 0) escenas[actual].fin();
    actual = i;
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
    });
    paneles.forEach((p, k) => p.classList.toggle('activa', k === i));
    b = null;
    if (!reducido && jugar) {
      const pasos = escenas[i].pasos;
      tabs[i].style.setProperty('--dur', pasos.reduce((s, x) => s + x[0], 0) + 'ms');
      b = bucle(pasos, { repetir: false, alTerminar: () => fase === 'andando' && avanzar() });
    }
  };

  const sincronizar = () => {
    const corre = visible && !document.hidden;
    if (fase === 'espera' && corre) {
      fase = 'andando';
      pegas.classList.add('auto');
      pausaP.hidden = false;
      activar(0);
    }
    if (fase === 'andando' && b) {
      const parar = !corre || manual;
      parar ? b.pausar() : b.reanudar();
      pegas.classList.toggle('pausado', parar);
    }
  };

  const avanzar = () => {
    if (actual < tabs.length - 1) return activar(actual + 1);
    cortar();
    activar(0, { jugar: false });
  };

  // cualquier interaccion o el fin de la vuelta: la escena en curso termina sola y no se avanza mas
  const cortar = () => {
    if (fase === 'fin') return;
    fase = 'fin';
    pegas.classList.remove('auto', 'pausado');
    pausaP.hidden = true;
    if (b) b.reanudar();
  };

  const elegir = (i, enfocar) => {
    cortar();
    activar(i);
    if (enfocar) tabs[i].focus();
    if (movil.matches && paneles[i].getBoundingClientRect().top > innerHeight - 160)
      paneles[i].scrollIntoView({ block: 'nearest', behavior: reducido ? 'auto' : 'smooth' });
  };

  tabs.forEach((t, i) => t.addEventListener('click', () => elegir(i)));
  lista.addEventListener('focusin', cortar);
  lista.addEventListener('keydown', (ev) => {
    const n = tabs.length;
    const mover = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[ev.key];
    let j;
    if (mover) j = (actual + mover + n) % n;
    else if (ev.key === 'Home') j = 0;
    else if (ev.key === 'End') j = n - 1;
    else return;
    ev.preventDefault();
    elegir(j, true);
  });

  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let espera = 0;
    tabs.forEach((t, i) => {
      t.addEventListener('pointerenter', () => { espera = setTimeout(() => i !== actual && elegir(i), 200); });
      t.addEventListener('pointerleave', () => clearTimeout(espera));
    });
  }

  pausaP.addEventListener('click', () => {
    manual = !manual;
    pausaP.textContent = manual ? 'Reanudar' : 'Pausar';
    sincronizar();
  });

  activar(0, { jugar: false });
  if (!reducido) {
    new IntersectionObserver(([e]) => { visible = e.intersectionRatio >= 0.4; sincronizar(); }, { threshold: [0, 0.4] }).observe(pegas);
    document.addEventListener('visibilitychange', sincronizar);
  }
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
