# Implementar ejemplos (V1) y FAQ (V3) — 2026-10-20

Elección de Carlos sobre la exploración `2026-10-19-exploracion-ejemplos-faq.md` (commit `b3beda5`):
- **Ejemplos: V1 "Una sola historia"**, tal como está en el prototipo.
- **FAQ: V3 "Respuestas que tranquilizan"**, con los ajustes de abajo.

## Instrucciones

### 1. Ejemplos → V1
- Lleva la V1 a `index.astro`: caso real arriba con su línea de tiempo, filete, rótulo "Ejemplo · Así se vería en tu negocio" y las tarjetas Pedidos / Stock con filas Antes / Ahora dentro del mismo bloque verde; un solo CTA al final.
- Reemplaza la sección "Lo mismo sirve para…" (desaparece como sección aparte, con su título y las mini-UI).
- Textos de las tarjetas tal cual el prototipo.

### 2. FAQ → V3, con ajustes
- Tarjetas destacadas sin repetir el titular en la respuesta:
  - **¿Cuánto cuesta? · Sabes el valor antes de empezar** → respuesta: "Un pago por armarlo y una mensualidad. Te digo los dos en la primera conversación."
  - **¿De quién son los datos? · La planilla es tuya** → respuesta: "Si un día dejamos de trabajar juntos, te la quedas con todos tus datos." (de `copy.md`).
- Las dos tarjetas deben quedar con alturas parejas, sin aire sobrante en la segunda.
- El titular "Sabes el valor antes de empezar" hoy corta con "empezar" sola en la segunda línea: usa `text-wrap: balance` o ajusta el ancho para que no quede una palabra huérfana.
- Las cuatro preguntas restantes en 2×2, como en el prototipo. "¿Tu duda no está? Escríbeme" → `#contacto` al cierre.
- Revisa 375: tarjetas apiladas, luego la lista en una columna.

### 3. Limpieza y registro
- Borra `src/prototypes/` y `src/pages/prototypes/` y el script `scripts/capturas-exploracion.mjs` si ya no se usa.
- Actualiza `copy.md` (rótulo de ejemplos, Antes/Ahora de Pedidos y Stock, titulares y respuestas de la FAQ) y DESIGN.md (bloque de ejemplos y FAQ).
- Ajusta los tests que dependan de la sección "Lo mismo sirve para…" o del orden/marcado de la FAQ. El test de `visual.spec.ts` para servicios ya no aplica: elimínalo o apúntalo al nuevo bloque.

## Criterios de aceptación
- `npm run build` ok y tests no visuales pasan.
- `npm run capturas`: página completa 375 y 1440, más zoom del bloque de ejemplos y de la FAQ en ambos tamaños.
- Pasar `revisor-landing` y esperar el OK de Carlos antes de `--update-snapshots`.

## Resultado
**Commit:** "Ejemplos V1 y FAQ V3" (rama `conversion-v2`, sobre `b3beda5`).

**Hecho**
1. Ejemplos V1 en `index.astro`: dentro del bloque verde del caso, tras la línea de tiempo y un filete, rótulo "Ejemplo · Así se vería en tu negocio" y tarjetas Pedidos / Stock con Antes / Ahora; un solo CTA al final. Desaparece la sección "Lo mismo sirve para…" con sus mini-UI y CSS (`.sv-*`, `.mini`, `.burbuja`, `.fila`, `.chip-est`).
2. FAQ V3: tarjetas destacadas con los titulares y respuestas de la revisión (sin repetir el titular), `text-wrap: balance` en el titular, cuatro preguntas en 2×2 y "¿Tu duda no está? Escríbeme" → `#contacto`. En 375 las tarjetas van apiladas y luego una columna.
3. Limpieza: borrados `src/prototypes/`, `src/pages/prototypes/` y `scripts/capturas-exploracion.mjs`; `scripts/capturas.mjs` ya no genera `lomismo-*` (capturas obsoletas borradas).
4. `copy.md` y `DESIGN.md` actualizados (bloque de ejemplos, FAQ, orden de secciones, CTA único). Tests ajustados (secciones, ejemplos, FAQ, iconos); se elimina el test visual `servicios` y su snapshot; el visual de FAQ apunta a la sección 5.
- Revisión de `revisor-landing` (sin bloqueantes): corregida la sangría de las etiquetas Antes/Ahora cuando el texto salta de línea y el CSS muerto de los botones del caso.

**Decisión de diseño a confirmar:** las dos tarjetas de la FAQ van lado a lado solo desde 1200px. Entre 768 y 1199px el titular de la primera ocupa dos líneas y el de la segunda una, y con alturas parejas la segunda quedaba con ~30px de aire. Por eso en ese tramo van apiladas. A 1440 quedan parejas, sin aire (el test lo mide).

**Verificado:** `npm run build` ok; 95 tests no visuales pasan. Capturas en `design/fase4/capturas/` (`pagina-*`, `caso-*` con el bloque de ejemplos, `faq-*`, `contacto-*`, 375 y 1440).

**Pendiente:** OK de Carlos a las capturas; luego `--update-snapshots` solo para `visual.spec.ts` (los snapshots `caso.png` y `faq.png` están desactualizados y los visuales de esos dos fallan hasta entonces).
