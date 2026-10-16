# Spec: rediseño de "Qué puedo dejar andando solo"

Estado: decidido, listo para implementar. Reemplaza las 4 tarjetas 2×2 (`.piezas`).

---

## 1. Concepto: "Elige tu pega"

Una lista de cuatro nombres enormes en Archivo condensado. El nombre activo **se estira**: pasa de `font-stretch: 75%` a `100%` y de tinta secundaria a tinta, y debajo una **barra azul de 3px se llena** mientras dura su escena. A la derecha, una hoja blanca (la misma "hoja" de la demo del hero) muestra la pega funcionando: una mini-escena hecha con los componentes que el visitante ya vio arriba (burbuja, fila con destello, aviso, rótulos con número rojo).

**El gesto que se recuerda:** las palabras que se ensanchan. Es un efecto que solo permite la fuente variable que ya cargamos (eje `wdth` 62-125 de Archivo). No hace falta ningún asset ni color nuevo. Nadie más en el rubro lo hace, y se ve "de imprenta", no de plantilla. La barra que se llena funciona además como reloj del avance automático: el visitante ve cuánto falta para que cambie, sin flechas ni puntos de carrusel.

**Por qué mejora lo de hoy:** las tarjetas actuales muestran cuatro miniaturas de 96px que no se mueven, y todas pesan lo mismo. Ahora una sola pega ocupa media pantalla a la vez y se ve **andando**: el dueño de una pyme ve el antes y el después de su tarea en 7 segundos, sin leer.

**Por qué es honesto:**
- Cada escena lleva el sello EJEMPLO y datos inventados que se ven inventados.
- El estado va escrito en palabras, en la lista y al pie de cada escena. Registros: "Ya funcionando en un cliente". Las otras tres: "Lo puedo armar", más una frase al pie que dice sin rodeos que todavía no corre en un cliente.
- La animación no promete integraciones con nombre propio (ni SII ni proveedores), solo muestra el flujo.

**Descartado a propósito:** el recorrido ligado al scroll (sección fijada que avanza con la rueda). Con dueños poco técnicos que leen en el celular, secuestrar el scroll confunde, se traba en Android de gama baja y choca con `scroll-padding` y la cabecera sticky. Las pestañas con avance automático dan lo mismo sin quitarle el control a nadie.

---

## 2. Layout

### Escritorio (≥1024px, referencia 1440)
Se mantiene el fondo `.banda-tinte` (azul pálido). `.contenedor` de 1200px y retícula de 12 columnas con gap de 24px (igual que el hero y el contacto).

```
h2  "Qué puedo dejar andando solo"          (ancho completo, arriba)
.lead                                         (máx. 52ch)
                                              margin-top 48px
┌ col 1–6 (588px) ─────────────┐ ┌ col 7–12 (588px) ───────────────┐
│ .pegas-guia (solo con JS)     │ │ .pega (hoja blanca)              │
│ ───────────────────────────── │ │  REGISTROS            [EJEMPLO]  │
│ 1  Registros   ← activo 100%  │ │  frase (1.25rem)                 │
│    Ya funcionando en un cliente│ │  escena (alto fijo por la grilla)│
│ ▬▬▬▬▬▬▬▬▬▬░░░░░░░ barra 3px    │ │  nota de honestidad              │
│ 2  Pedidos     ← 75%, tinta-2 │ │  ─────────────────────────────── │
│    Lo puedo armar             │ │  figcaption ……………… Pausar        │
│ 3  Avisos                     │ └──────────────────────────────────┘
│ 4  Boletas y facturas         │
└───────────────────────────────┘
enlace-texto "¿Tienes otra pega repetitiva? Cuéntamela."   margin-top 32px
```

- Lista: columnas 1-6 (`grid-column: 1 / 7`). Panel: 7-12 (`7 / 13`), `align-self: start`. Mitad y mitad, porque "Boletas y facturas" a 48px y 100% de ancho mide unos 480px y necesita las 6 columnas para no partirse.
- Fila (`.pega-tab`): ancho completo, `min-height: 96px`, `padding: 20px 0 20px`, borde superior 1px `--regla-suave` (la primera fila también; la última lleva además un borde inferior). Retícula interna `grid-template-columns: 2.5rem 1fr` con el número en la primera columna, alineado a la línea base del nombre.
- Panel: `.hoja` con padding 32px. Los cuatro paneles se apilan en **la misma celda** de una retícula (`grid-area: 1 / 1`) y los inactivos llevan `visibility: hidden`. Así el contenedor toma el alto del panel más alto y **cambiar de pestaña no hace saltar la página**.

### Móvil (390)
Una columna con el mismo DOM, sin acordeón. Los cuatro nombres van arriba como lista vertical y el panel queda debajo, a ancho completo.
- Fila: `min-height: 72px`, padding 14px 0, número de 2rem.
- Panel: `.hoja` con padding 16px (lo que ya trae `.hoja` bajo 768).
- Al tocar una pestaña, si el borde superior del panel queda bajo `innerHeight - 160`, se hace `panel.scrollIntoView({ block: 'nearest', behavior: reducido ? 'auto' : 'smooth' })`.
- Pedidos bajo 600px: el tablero de 3 columnas pasa a 3 carriles horizontales apilados (rótulo de estado a la izquierda, `6.5rem`, tarjetas a la derecha).

### Tablet (768-1023)
Igual que móvil, con el panel en `max-width: 690px`.

### Escala tipográfica (nueva solo para esta sección)
| Elemento | Fuente | Tamaño | Peso / ancho | Color |
|---|---|---|---|---|
| Nombre de pega (`.pega-nombre`) | Archivo | `clamp(1.75rem, 1rem + 2.6vw, 3rem)`: 28px a 390, 48px a 1440 | 700; inactivo `font-stretch 75%`, activo `100%`; line-height 1.05 | inactivo `--tinta-2`, activo `--tinta` |
| Número (`.num`) | Archivo | 1rem en la fila | 600, tabular | `--rojo` |
| Estado (`.pega-estado`) | Archivo | 0.9375rem / 1.4 | 400 "Lo puedo armar" en `--tinta-2`; 600 "Ya funcionando en un cliente" en `--azul` | — |
| Guía (`.pegas-guia`) | Archivo | 0.9375rem | 400 | `--tinta-2` |
| Frase del panel (`.pega-frase`) | Archivo | 1.25rem / 1.4 | 500 | `--tinta` |
| Rótulos y EJEMPLO | `.rotulo` y `.ejemplo` existentes | — | — | — |
| Nota de honestidad (`.pega-honesto`) | Archivo | 0.9375rem / 1.5 | 400 | `--tinta-2` |

Espaciado: lead → bloque 48px (`--s7`). Dentro del panel: cabecera → frase 24px, frase → escena 24px, escena → nota 24px, nota → pie 16px. Bloque → enlace de cierre 32px.

---

## 3. Las cuatro escenas

Reglas comunes:
- El HTML trae el **estado final completo**. JS lo esconde y lo vuelve a construir paso a paso, igual que el hero (`.armada .x:not(.on) { opacity: 0 }`, transición de opacidad 250ms, destello de 1s en filas nuevas).
- Cada escena dura 7-8s y luego queda quieta 2,5s antes de pasar a la siguiente.
- Todos los nombres, horas y montos son inventados y van bajo el sello EJEMPLO.
- Los tiempos son la **espera antes de cada paso**, en ms, en el mismo formato que el arreglo `pasos` de `main.js`.

### 3.1 Registros: estado "Ya funcionando en un cliente"
**Frase:** "Tu equipo manda un mensaje corto por Telegram y los datos caen solos en la planilla."
**Diferencia con el hero:** el hero suma filas. Esta escena muestra que **un solo mensaje trae varios datos** y cada uno cae en su columna.

Estructura: un rótulo (1 rojo) "Llega el mensaje", con meta y burbuja. Después, un rótulo (2 rojo) "Cada dato a su columna" con una tabla de columnas Hora | Quién | Cajas | Rechazo:
- 15:40 · Pedro · 92 · 1 (fija)
- 15:52 · Ana · 104 · 0 (fija)
- 16:05 · Rosa · 86 · 2 (`.fila-nueva`)

Meta: `Telegram · Rosa · 16:05`. Burbuja: `Turno tarde: <b class="dato">86</b> cajas, <b class="dato">2</b> rechazadas`.

| Espera | Paso |
|---|---|
| 0 | reinicia: burbuja y fila sin `.on`, `.dato` sin `.marcado` |
| 400 | aparece la burbuja |
| 1200 | `.dato` reciben `.marcado` (subrayado azul de 2px, `text-underline-offset 0.2em`) |
| 1200 | aparece la fila 16:05 con destello; las celdas 86 y 2 en peso 600 |
| 1500 | aparece la línea final `.pega-resultado`: "Anotado. Nadie tipeó nada." |
| 2500 | quieto (fin, ~6,8s más la espera) |

**Nota de honestidad:** "Esto ya funciona en un cliente real. Los nombres y números de este ejemplo son inventados."

### 3.2 Pedidos: estado "Lo puedo armar"
**Frase:** "Los pedidos que entran por formulario o WhatsApp quedan ordenados por estado, y tú ves en qué va cada uno."

Tablero de 3 columnas con encabezado `th`-like en azul pálido: **Pendiente | Listo | Despachado**. Tarjetas (`.pedido`): fondo blanco, borde 1px `--linea-campo`, radio 10px, padding 8px 12px, 1rem tabular, con una línea principal y una meta en `.nota`.
- Pendiente: `#215 · 8 bandejas` / `entró 09:20`. Más **el hueco de #214** (fantasma).
- Listo: `#211 · 20 bandejas`. Más el fantasma de #214.
- Despachado: `#209 · 6 bandejas`, `#210 · 15 bandejas` y **#214 (versión final, visible sin JS)**.
- #214: `#214 · 12 bandejas` / meta `entró 09:12 por formulario`.

Bajo el tablero, el aviso (componente `.aviso`): `Aviso al cliente: "Tu pedido #214 va en camino."`

| Espera | Paso |
|---|---|
| 0 | reinicia: las tres copias de #214 sin `.on`, aviso sin `.on` |
| 400 | #214 aparece en Pendiente con destello |
| 2000 | se apaga en Pendiente y aparece en Listo (destello) |
| 1800 | se apaga en Listo y aparece en Despachado (destello) |
| 900 | aparece el aviso al cliente |
| 2500 | quieto (~7,5s) |

"Moverse" se resuelve como apagar y encender copias, sin `transform` entre columnas. Es barato, no rompe la retícula y funciona igual en carriles móviles. Bajo movimiento normal se puede sumar `translateX(-6px) → 0` en la copia que aparece (200ms). No más que eso.

**Nota de honestidad:** "Todavía no lo tengo andando en un cliente: es una muestra de cómo lo armaría para ti."

### 3.3 Avisos: estado "Lo puedo armar"
**Frase:** "Te llega un aviso cuando el stock se está acabando o algo se atrasa. Antes de que sea tarde, no después."

Estructura:
- Rótulo (1 rojo) "Va bajando el stock". Fila `.nivel` con el nombre a la izquierda, "Tapas 38 mm", y la cifra grande a la derecha (`.nivel-cifra`, Archivo 700 2rem tabular).
- Debajo, la barra `.nivel-barra`: alto 16px, radio 10px, fondo blanco, borde 1px `--linea-campo`. El relleno `.nivel-relleno` va en `--azul` con ancho `calc(var(--nivel) / 800 * 100%)` y `transition: width 600ms ease-out`. La marca de mínimo `.nivel-min` es una línea vertical de 2px en `--tinta` al 25% (200/800), con el texto "mínimo 200" debajo (`.nota`).
- Rótulo (2 rojo) "Te llega el aviso". Debajo, `.aviso`: `Aviso · 11:20: Quedan <b>180</b> tapas de 38 mm. El mínimo que fijaste es 200.`

Estado final del HTML: cifra 180, `--nivel: 180`, aviso visible.

| Espera | Paso |
|---|---|
| 0 | reinicia: cifra 640, `--nivel: 640`, aviso sin `.on` |
| 600 | 410 |
| 1300 | 230 |
| 1300 | 180 (cruza la marca) |
| 700 | aparece el aviso con destello de 1s en su fondo |
| 2500 | quieto (~6,4s) |

La cifra cambia con `textContent` y sin animar el número (contador rodante = ruido). No se usa ningún color de alarma: el rojo es solo para numeración y error, y el aviso usa el componente de siempre. La alerta se nota porque **aparece**, no porque se tiña.

**Nota de honestidad:** igual que en Pedidos.

### 3.4 Boletas y facturas: estado "Lo puedo armar"
**Frase:** "Los datos del pedido pasan solos a la boleta o factura. No tipeas dos veces lo mismo."

Estructura en dos bloques (lado a lado sobre 600px de panel, apilados abajo):
1. Rótulo (1 rojo) "Ya está en tu planilla". Una fila de tabla (encabezado Pedido | Cliente | Cant. | Precio): `#214 · Almacén Las Rosas · 12 · $3.500`.
2. Rótulo (2 rojo) "Se arma la boleta". La hoja `.boleta` lleva borde 1px `--regla-suave`, radio 10px, y una lista `dl` de pares:
   - Cliente: Almacén Las Rosas
   - Detalle: Bandejas
   - Cantidad: 12
   - Precio unitario: $3.500
   - **Total: $42.000** (peso 700, separado por una regla superior de 1px)

Bajo la boleta, `.pega-resultado`: "Lista para emitir. Tú la revisas y apruebas."

| Espera | Paso |
|---|---|
| 0 | reinicia: los `dd` sin `.on`, resultado sin `.on` |
| 500 | Cliente: la celda de origen destella y el `dd` aparece |
| 700 | Detalle |
| 700 | Cantidad (destella la celda 12) |
| 700 | Precio unitario (destella $3.500) |
| 900 | Total |
| 1000 | resultado |
| 2500 | quieto (~7s) |

"Una sola vez": cada celda de origen destella **una vez** (`destello` 1s, el mismo keyframe) y nunca se repite dentro del ciclo. Sin RUT, sin folio ni logo del SII: no se inventan identificadores oficiales.

**Nota de honestidad:** igual que en Pedidos.

---

## 4. Ya funcionando y Lo puedo armar

Se marca con palabras, en dos lugares y sin pastillas de color:
1. **En la lista**, bajo cada nombre:
   - Registros: "Ya funcionando en un cliente", en `--azul` peso 600.
   - Las otras: "Lo puedo armar", en `--tinta-2` peso 400.
   La diferencia está en el color, el peso y la redacción. Se lee aunque el nombre esté atenuado.
2. **Al pie de cada escena**, la nota de honestidad (textos en §3). Es la frase que impide malinterpretar la animación.

Se eliminan los `.sello-estado` con borde: dos sellos (EJEMPLO más estado) en la misma tarjeta eran el ruido de hoy. Queda **un solo sello por panel: EJEMPLO**.

Registros va primero y es la pestaña por defecto. Lo real se ve antes que lo posible.

El TODO de Carlos se mantiene: si mañana Pedidos queda corriendo en un cliente, se cambia el texto del estado y la nota de esa pega. Nada más.

---

## 5. Interacción y accesibilidad

### Patrón: pestañas verticales (APG Tabs, activación automática)
- `div.pegas-lista[role=tablist][aria-label="Pegas que puedo automatizar"][aria-orientation=vertical]`
- Cada fila es `button.pega-tab[role=tab][id=tab-registros][aria-controls=pega-registros][aria-selected][tabindex=0|-1]`.
- Cada panel es `article.pega.hoja[role=tabpanel][id=pega-registros][aria-labelledby=tab-registros][tabindex=0]`. Los roles los pone JS: sin JS son artículos comunes.
- Teclado: ↑/↓ y también ←/→ (con wrap), Inicio/Fin. Activación automática al mover el foco con foco móvil (roving tabindex). Tab sale de la lista y entra al panel activo.
- Foco: el contorno global de 3px azul. En la fila se aplica al botón entero, con `outline-offset: 4px` y `border-radius: 10px`.
- Mouse (`@media (hover: hover) and (pointer: fine)`): al pasar el cursor 200ms sobre una fila, se activa. Si el cursor sale antes, se cancela. Sin ese retraso, el panel parpadea al cruzar la lista en diagonal.
- Clic o toque: activa.

### Avance automático y pausa (WCAG 2.2.2)
- Arranca solo cuando la sección está ≥40% visible (`IntersectionObserver`). Se detiene si sale o si `document.hidden`.
- **Da una sola vuelta**: Registros, Pedidos, Avisos, Boletas, y vuelve a Registros, que queda en su estado final. Después ya no se mueve.
- **Cualquier interacción lo detiene para siempre**: clic, hover-intent, teclado o foco dentro de la lista (`focusin`). La pega que eligió el usuario reproduce su escena una vez y queda en el estado final.
- Botón visible `#pegas-pausa` (`.btn-texto`, "Pausar" / "Reanudar") en el pie del bloque, fuera de los paneles, oculto sin JS. Pausa el temporizador y la barra (`.pegas.pausado .pega-barra { animation-play-state: paused }`). Al reanudar continúa desde el paso actual; la barra puede desfasarse hasta ~1,5s, lo que se acepta.
- Al terminar la vuelta, el botón se esconde (`hidden`), porque ya no hay nada que pausar.
- Sin `aria-live` en las escenas: los números que cambian no se anuncian. El `figcaption` del pie describe la escena en palabras.

### Barra de avance
`span.pega-barra` dentro de la pestaña activa: alto 3px, `--azul`, `transform-origin: left`, `animation: avance var(--dur) linear both` (`scaleX(0) → scaleX(1)`). JS define `--dur` con la duración de la escena más la espera. Sin avance automático (después de la vuelta, tras una interacción o con movimiento reducido), la barra queda llena y quieta como subrayado del activo. Es decorativa: el estado activo ya lo transmiten `aria-selected`, el peso y el color.

### `prefers-reduced-motion: reduce`
Sin avance automático y sin escenas: cada panel muestra su estado final. El cambio de ancho del nombre es instantáneo (`transition: none`), la barra va llena y sin animación, y el botón Pausar no aparece. Las pestañas funcionan igual.

### Sin JS
- `.pegas-lista`, `.pegas-guia` y `#pegas-pausa` llevan `hidden` en el HTML.
- Los cuatro `article.pega` se ven apilados en una columna (máx. 690px, separados 24px), cada uno con su h3 (rótulo), sello, frase, escena en estado final y nota. Todo el contenido queda visible y legible.
- La retícula de celda compartida y `visibility: hidden` solo se aplican bajo `.pegas.armada`, que pone JS.

### Contraste
Todo con tokens existentes y ratios ya verificados en DESIGN.md:
- Nombre inactivo `--tinta-2` sobre azul pálido: 6.60:1. Activo `--tinta`: 13.97:1.
- Estado activo `--azul` sobre azul pálido: 8.81:1. Número `--rojo` sobre azul pálido: 5.96:1.
- Relleno de nivel `--azul` contra pista blanca: 10.4:1 (>3:1 no-texto). Borde de pista `--linea-campo`: 4.71:1.
- Atenuar se hace **con color, nunca con `opacity`**, porque `opacity` bajaría el texto por debajo de 4.5:1.

---

## 6. Tokens

**Ninguno nuevo.** Solo una variable de componente, `--dur` (duración de la barra), que fija JS. No se agregan colores ni sombras. La novedad visual sale del eje de ancho de Archivo, que ya está cargado.

---

## 7. Cambios por archivo

### `src/pages/index.astro`
Reemplazar el bloque `<ul class="piezas">…</ul>` (líneas 130-167). Se mantienen el `h2#t-hago`, el `.lead` y el comentario TODO (con el texto ajustado a "cambia el estado y la nota de honestidad de esa pega"). Estructura:

```html
<div class="pegas" id="pegas">
  <p class="pegas-guia" hidden>Elige una pega y mira cómo quedaría andando.</p>
  <div class="pegas-lista" hidden>  <!-- role/aria los pone JS -->
    <button type="button" class="pega-tab" id="tab-registros" aria-controls="pega-registros">
      <span class="num">1</span>
      <span class="pega-nombre">Registros</span>
      <span class="pega-estado activo">Ya funcionando en un cliente</span>
      <span class="pega-barra" aria-hidden="true"></span>
    </button>
    … pedidos (2), avisos (3), boletas (4) con "Lo puedo armar"
  </div>
  <div class="pegas-paneles">
    <article class="pega hoja" id="pega-registros">
      <div class="hoja-cab"><h3 class="rotulo">Registros</h3><span class="ejemplo">EJEMPLO</span></div>
      <p class="pega-frase">…</p>
      <div class="pega-escena escena-registros">…estado final…</div>
      <p class="pega-honesto">…</p>
    </article>
    … pedidos, avisos, boletas
  </div>
  <div class="hoja-pie pegas-pie">
    <p class="nota">Ejemplos ilustrativos con datos inventados.</p>
    <button type="button" class="btn-texto" id="pegas-pausa" hidden>Pausar</button>
  </div>
</div>
<a class="enlace-texto pegas-cierre" href="#contacto">¿Tienes otra pega repetitiva? Cuéntamela.</a>
```

Ojo con dos cosas:
- `.hoja-cab .rotulo` como `h3` necesita `margin: 0`, que ya da el reset.
- Los `button` sin JS están dentro de un contenedor `hidden`, así que no quedan botones muertos.

### `src/styles/global.css`
- **Borrar:** `.piezas`, `.pieza`, `.mini`, `.mini .ejemplo`, `.mini-fila`, `.chips`, `.chip`, `.mini .aviso`, `.sello-estado` y `.sello-estado.activo` (líneas 111-124). `.cierre` sigue sin uso; se puede borrar también.
- **Agregar**, en el bloque `/* que hago: elige tu pega */`:
  - `.pegas` (en una columna, gap 24px; `@media (min-width:1024px)` con retícula de 12 columnas: lista `1/7`, paneles `7/13`, pie `7/13`). Sin `.armada`, los paneles van en una columna con máx. 690px.
  - `.pega-tab` (reset de botón: `background:none; border:0; border-top:1px solid var(--regla-suave); width:100%; text-align:left; color:inherit; font:inherit; cursor:pointer`, grid 2.5rem 1fr, `position:relative`).
  - `.pega-nombre` (escala de §2, `transition: font-stretch 300ms ease-out, color 200ms ease-out`).
  - `.pega-tab[aria-selected="true"] .pega-nombre { font-stretch:100%; color:var(--tinta) }`.
  - `.pega-estado`, `.pega-estado.activo`.
  - `.pega-barra` (`position:absolute; left:2.5rem; right:0; bottom:-1px; height:3px; background:var(--azul); transform:scaleX(0); transform-origin:left`). En la pestaña activa: `transform:scaleX(1)`. Bajo `.pegas.auto`, con la pestaña activa: `animation: avance var(--dur) linear both`. Más `@keyframes avance` y `.pegas.pausado .pega-barra { animation-play-state: paused }`.
  - `.pegas.armada .pegas-paneles { display:grid }`, `.pegas.armada .pega { grid-area:1/1 }`, `.pegas.armada .pega:not(.activa) { visibility:hidden }`.
  - Por escena: `.dato.marcado`, `.tablero` / `.carril` / `.pedido` (con la variante de carriles bajo 600px), `.nivel`, `.nivel-cifra`, `.nivel-barra`, `.nivel-relleno`, `.nivel-min`, `.boleta` (`dl` en grid 1fr auto), `.pega-frase`, `.pega-honesto`, `.pega-resultado`.
  - Extender el selector de aparición existente: `.armada .pedido:not(.on)`, `.armada .boleta dd:not(.on)`, `.armada .pega-resultado:not(.on)` (más los ya existentes `.aviso`, `.mensaje` y `.fila-nueva`) con `opacity:0`. Las copias fantasma de #214 llevan `.fantasma { display:none }` y `.armada .fantasma { display:block }`.
  - Bloque `@media (prefers-reduced-motion: reduce)`: `.pega-nombre { transition:none }` y `.pega-barra { animation:none !important; transform:scaleX(1) }` en el activo.

### `src/scripts/main.js`
1. **Extraer el motor del hero** a una función `bucle(pasos, { repetir })` que devuelve `{ pausar, reanudar, detener }`. Es el mismo `tick` con `setTimeout` que ya existe. El hero la usa con `repetir:true`; las pegas, con `repetir:false` y un callback `alTerminar`. Sin dependencias nuevas.
2. **Bloque `/* ---- Elige tu pega ---- */`** (unas 90 líneas):
   - Si `!reducido`, agrega `.armada` y `.auto`.
   - Siempre: quita `hidden` a la lista y la guía y pone los roles y ARIA (también con movimiento reducido).
   - `activar(i, { porUsuario })`: actualiza `aria-selected` y `tabindex`, alterna `.activa` en el panel, define `--dur`, reinicia la barra (quita y repone la clase, con `void el.offsetWidth` como en el hero) y lanza `bucle(escenas[i])`.
   - `escenas`: cuatro arreglos `[espera, fn]` con los tiempos de §3.
   - Teclado: `keydown` en la lista. Hover-intent: `pointerenter` y `pointerleave` con `setTimeout` de 200ms, solo si `matchMedia('(hover:hover) and (pointer:fine)')`.
   - Avance: `IntersectionObserver` (umbral 0.4) más `visibilitychange`. `usuarioEligio = true` corta el avance automático para siempre. Al completar la vuelta: `activar(0)`, la escena queda en estado final y `pausa.hidden = true`.
   - En móvil, `scrollIntoView` según §2.
   - **Al detener cualquier escena**, se restaura su estado final (todas las `.on` puestas y los valores finales). Nunca debe quedar una escena a medio armar.

### `DESIGN.md`
- Reemplazar "Tarjetas de Qué puedo" por "Elige tu pega" (lista con nombre que se estira y panel con escena).
- En Layout, cambiar la línea de la sección.
- En Movimiento, agregar el avance de una vuelta, la barra de 3px y la transición de `font-stretch`.
- Agregar una regla con nombre: **The Ancho Rule**. El eje `wdth` de Archivo marca el ítem activo (75% inactivo, 100% activo). Se usa solo en esta lista.

### Criterios de verificación
1. A 1440, la lista ocupa las columnas 1-6 y el panel las 7-12. "Boletas y facturas" activo no se parte en dos líneas. Cambiar de pestaña no cambia el alto de la sección (medir `getBoundingClientRect().height` en las 4).
2. A 390 no hay scroll horizontal. Los nombres miden 28px. El tablero de Pedidos se ve en carriles. Al tocar "Boletas y facturas", el panel queda a la vista.
3. Teclado: Tab llega a la pestaña activa; ↓ recorre las 4 con wrap; Inicio/Fin funcionan; Tab siguiente entra al panel. El contorno de foco se ve en las 4 filas.
4. Lector de pantalla (NVDA y Chrome): anuncia "pestaña, 1 de 4, seleccionada". El panel se anuncia con el nombre de su pestaña y los paneles inactivos no se leen.
5. Avance: con la sección en pantalla, recorre las 4 una vez (unos 40s) y se detiene en Registros. Al hacer scroll fuera se pausa. Un clic lo corta para siempre. "Pausar" congela la escena y la barra.
6. Con `prefers-reduced-motion` (DevTools > Rendering): nada se mueve, no aparece Pausar y los paneles muestran el estado final.
7. Con JS desactivado: los 4 artículos se ven apilados y completos, y no se ve ninguna lista de botones ni el botón Pausar.
8. Ningún texto queda bajo 4.5:1. Revisar con axe la sección en sus 4 estados.
9. `grep` en global.css sin restos de `.pieza`, `.mini` ni `.chip`. No aparecen `box-shadow`, `gradient` ni colores hex nuevos.
10. Las 4 escenas llevan EJEMPLO y nota de honestidad; solo Registros dice "Ya funcionando en un cliente".

---

## 8. Riesgos y qué NO hacer

**Riesgos**
- **El ancho depende de la fuente.** Con la fuente de respaldo (Arial no tiene eje `wdth`) el gesto desaparece, pero el color y el peso siguen marcando el activo. Es aceptable y no hay que "arreglarlo" con `transform: scaleX` sobre el texto.
- **Salto de línea al estirar.** Si en algún ancho intermedio (1024-1100) "Boletas y facturas" se parte al activarse, la fila crece y empuja las de abajo. Por eso: `min-height` de fila suficiente para dos líneas solo entre 1024 y 1180px, o bajar el clamp a 2.75rem en ese tramo. Verificar en 1024, 1100 y 1280.
- **Dos demos animadas en la página** (hero y esta). Están en pantallas distintas, esta solo corre visible y da una vuelta. No sumar movimiento en otra sección.
- **Desfase de la barra tras reanudar.** Se acepta; sincronizarla por pasos agrega código que no paga.
- **Hover-intent en laptops con trackpad.** Si en la prueba se siente nervioso, subir a 300ms antes de quitarlo.

**Qué NO hacer**
- No usar `opacity` para atenuar los nombres (rompe el contraste).
- No pintar cada pega de un color, ni usar íconos (engranaje, campana, carrito), emoji, sombras, degradados ni neón.
- No agregar flechas ni puntos de carrusel: la lista es la navegación.
- No usar scroll fijado ni animación ligada a la rueda.
- No poner pastillas de estado con borde. El estado se escribe con palabras.
- No inventar clientes, RUT, folios, logos, cifras de ahorro ("ahorra 10 horas") ni testimonios dentro de las escenas.
- No animar números con contador rodante ni hacer que las tarjetas "vuelen" entre columnas.
- No repetir en Registros la escena del hero tal cual: esta muestra "varios datos de un mensaje".
- No dejar la sección moviéndose indefinidamente: una vuelta y se queda quieta.
