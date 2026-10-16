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
    [0, () => {}], // arranca en el estado final del HTML: la tabla nunca carga vacia
    [5000, () => { filas.forEach((f) => f.classList.remove('on')); aviso.classList.remove('on'); mostrarMsg(0); }],
    [1400, fila(0)],
    [1500, () => mostrarMsg(1)],
    [1400, fila(1)],
    [1500, () => mostrarMsg(2)],
    [1400, fila(2)],
    [1500, () => aviso.classList.add('on')],
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

/* ---- Elige tu pega: pestanas con escenas; rotacion continua mientras la seccion es visible ---- */
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
  let iniciado = false;
  let visible = false;
  let congelado = false; // Pausar: escena y barra quietas a medias
  let manual = false; // el usuario interactuo o pulso Pausar: sin auto-avance hasta Reanudar
  const movil = matchMedia('(max-width: 1023px)');

  // cada pega se ve DUR_PEGA ms: la escena se arma y el ultimo paso se alarga hasta completar el tiempo (la barra azul sigue ese tiempo)
  const DUR_PEGA = 9000;

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
      const pasos = escenas[i].pasos.map((x) => [...x]);
      const resto = pasos.slice(0, -1).reduce((s, x) => s + x[0], 0);
      pasos[pasos.length - 1][0] = Math.max(500, DUR_PEGA - resto);
      tabs[i].style.setProperty('--dur', resto + pasos[pasos.length - 1][0] + 'ms');
      pegas.classList.remove('auto'); // reinicia la barra
      void pegas.offsetWidth;
      pegas.classList.toggle('auto', !manual);
      b = bucle(pasos, { repetir: false, alTerminar: () => !manual && activar((actual + 1) % tabs.length) });
      if (!manual && !(visible && !document.hidden)) b.pausar();
    }
  };

  const sincronizar = () => {
    const corre = visible && !document.hidden;
    if (!iniciado && corre && !manual) {
      iniciado = true;
      pausaP.hidden = false;
      activar(0);
    }
    if (iniciado && !manual && b) corre ? b.reanudar() : b.pausar();
    pegas.classList.toggle('pausado', manual || !corre);
  };

  // cualquier interaccion: el auto-avance se corta y queda en pausa hasta pulsar Reanudar
  const cortar = () => {
    if (manual && !congelado) return;
    congelado = false;
    manual = true;
    iniciado = true;
    pausaP.hidden = false;
    pausaP.textContent = 'Reanudar';
    pegas.classList.remove('auto');
    pegas.classList.add('pausado');
    if (b) b.reanudar(); // la escena en curso termina sola
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

  pausaP.addEventListener('click', () => {
    manual = !manual;
    pausaP.textContent = manual ? 'Reanudar' : 'Pausar';
    if (manual) {
      congelado = true;
      if (b) b.pausar();
    } else if (congelado && b) {
      congelado = false;
      b.reanudar();
    } else {
      congelado = false;
      iniciado = true;
      activar(actual); // reanuda la rotacion desde la pega actual
    }
    sincronizar();
  });

  activar(0, { jugar: false });
  if (!reducido) {
    // visible = 40% de la seccion o, si es mas alta que la pantalla (movil), al menos un tercio de la pantalla
    new IntersectionObserver(([e]) => { visible = e.intersectionRect.height >= Math.min(e.boundingClientRect.height * 0.4, innerHeight / 3); sincronizar(); }, { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }).observe(pegas);
    document.addEventListener('visibilitychange', sincronizar);
  }
}

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
if (eje && pausaC && !reducido) {
  const lectura = $('caso-hora');
  const vertical = matchMedia('(max-width: 899px)');
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
    const pista = vertical.matches ? eje.querySelector('.reloj').clientHeight : eje.querySelector('.reloj').clientWidth;
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
