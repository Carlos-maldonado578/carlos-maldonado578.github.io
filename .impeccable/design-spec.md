# Especificación de diseño: landing Carlos Maldonado

Versión 1 · 2026-10-14 · Fuente de verdad: `PRODUCT.md`, `copy.md`, `.impeccable/surfaces/src-pages-index-astro.md`.
Anti-referencia: `design/Main.dc.html` (v5 oscura, neón, mono, números fantasma, zigzag, rotaciones). Nada de esa versión se reutiliza salvo el orden de secciones.

Destino: Astro estático + CSS propio (sin Tailwind), GitHub Pages, sin subpath.

---

## 1. Crítica de la dirección "talonario / guía de despacho carbonada"

1. El concepto sirve **solo si estructura la página**. Un formulario impreso es, en esencia, una grilla de casillas rotuladas: rótulo a la izquierda, contenido a la derecha, reglas entre filas. Eso es exactamente lo que necesita un lector poco técnico: saber en qué parte está y qué dice cada parte.
2. Se vuelve **disfraz** (skin) cuando aparecen: bordes perforados en todo, texturas de papel, manchas de carbón, fuentes de máquina de escribir, letra manuscrita, timbres torcidos en cada sección, hojas rotadas. Eso es la v5 con otra ropa y sigue pareciendo plantilla.
3. Se vuelve **deshonesto** con un "Nº 000123" de folio: un dueño de pyme lo lee como "ya atendió 123 casos". Se recorta: no hay folio numérico en ninguna parte.
4. Se vuelve **ilegible** si los rótulos en mayúscula condensada se usan para texto corrido, o si las copias rosada/amarilla bajan el contraste del cuerpo.
5. **Queda:** papel blanco, tinta azul como único color de acción, rojo solo para numeración de secciones y pasos, columna de rótulos a la izquierda, reglas finas entre filas, la demo como hoja de registro real, el formulario de contacto como talonario en copia amarilla, un sello circular que aparece **una sola vez** (al enviar con éxito), fecha y hora de recepción como "folio" honesto.
6. **Se recorta:** copia rosada, folio numérico, perforaciones (salvo una línea discontinua en el borde superior del talonario de contacto), texturas, carbón, tipografía de máquina de escribir, firmas falsas, campos tipo RUT/patente decorativos, sellos decorativos.
7. Prueba de fuego para el implementador: si se borra el color y la tipografía, la página debe seguir leyéndose como un formulario ordenado. Si lo único "talonario" que queda es decoración, se hizo mal.

---

## 2. Tokens

### 2.1 Paleta (hex exactos)

| Token | Hex | Uso |
|---|---|---|
| `--papel` | `#FFFFFF` | Fondo de toda la página. Blanco puro, no crema. |
| `--tinta` | `#16202E` | Texto principal, reglas fuertes, borde inferior de campos. |
| `--tinta-2` | `#4A5363` | Texto secundario (notas, pie, ayudas de campo). |
| `--azul` | `#1F3A8A` | Botón principal, enlaces, foco, sello, encabezados de tabla. |
| `--azul-hover` | `#152B66` | Hover/activo del botón y enlaces. |
| `--rojo` | `#B0172B` | Numeración (Nº 01…, pasos 1–4), etiqueta EJEMPLO, mensajes de error. |
| `--copia-amarilla` | `#FFF6D5` | Fondo del talonario de contacto y resaltado transitorio de la fila nueva en la demo. Nada más. |
| `--azul-palido` | `#E8EDF7` | Fondo de la fila de encabezado de la tabla de la demo y del aviso. |
| `--linea-campo` | `#6B7484` | Bordes laterales/superior de inputs (componente no textual, requiere ≥3:1). |
| `--regla-suave` | `#C5CBD3` | Reglas internas entre filas de listas y tabla (decorativo, no transmite información). |
| `--error-fondo` | `#FBE4E7` | Fondo del recuadro de fallo de envío. |

Copia rosada: **eliminada**. No aporta información.

### 2.2 Pares de contraste (calculados WCAG 2.x)

| Texto / fondo | Ratio | Requisito | Uso |
|---|---|---|---|
| `#16202E` / `#FFFFFF` | 16.40:1 | 4.5 | cuerpo |
| `#16202E` / `#FFF6D5` | 15.15:1 | 4.5 | texto en talonario |
| `#16202E` / `#E8EDF7` | 13.97:1 | 4.5 | encabezado tabla demo |
| `#16202E` / `#FBE4E7` | 13.56:1 | 4.5 | texto en recuadro de fallo |
| `#4A5363` / `#FFFFFF` | 7.75:1 | 4.5 | secundario |
| `#4A5363` / `#FFF6D5` | 7.16:1 | 4.5 | ayudas en talonario |
| `#1F3A8A` / `#FFFFFF` | 10.34:1 | 4.5 | enlaces |
| `#1F3A8A` / `#FFF6D5` | 9.55:1 | 4.5 | enlace en talonario |
| `#1F3A8A` / `#E8EDF7` | 8.81:1 | 4.5 | aviso demo |
| `#FFFFFF` / `#1F3A8A` | 10.34:1 | 4.5 | texto del botón |
| `#FFFFFF` / `#152B66` | 13.38:1 | 4.5 | botón hover |
| `#B0172B` / `#FFFFFF` | 6.99:1 | 4.5 | numeración, error |
| `#B0172B` / `#FFF6D5` | 6.46:1 | 4.5 | error en talonario |
| `#B0172B` / `#FBE4E7` | 5.78:1 | 4.5 | título del recuadro de fallo |
| `#6B7484` / `#FFFFFF` | 4.71:1 | 3 (no textual) | borde de input |
| `#6B7484` / `#FFF6D5` | 4.35:1 | 3 (no textual) | borde de input sobre copia |

Prohibido: `#6B7484` o más claro como color de **texto** sobre `#FFF6D5` (4.35 < 4.5). `--regla-suave` nunca delimita un control.

### 2.3 Escala tipográfica

Base: `html { font-size: 100% }` (16px). Cuerpo a 18px en todos los tamaños de pantalla (lectores mayores, celular).

| Rol | Familia | Tamaño 390px → 1280px | Line-height | Peso / ancho | Otros |
|---|---|---|---|---|---|
| h1 | Archivo | `clamp(2.25rem, 1.5rem + 3.2vw, 4rem)` = 36 → 64px | 1.05 | 700 / wdth 87 | `letter-spacing: -0.01em`, `text-wrap: balance`, máx. 18ch |
| h2 | Archivo | `clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)` = 28 → 36px | 1.15 | 700 / wdth 87 | `text-wrap: balance` |
| h3 / destacado de lista | Archivo | 1.25rem = 20px | 1.3 | 600 / wdth 100 | — |
| lead (bajada, primera frase de sección) | Bitter | `clamp(1.1875rem, 1.1rem + 0.4vw, 1.375rem)` = 19 → 22px | 1.5 | 400 | máx. 52ch |
| cuerpo | Bitter | 1.125rem = 18px | 1.6 | 400 | máx. **64ch** |
| rótulo de casilla | Archivo | 0.875rem = 14px | 1.3 | 600 / wdth 75 | MAYÚSCULAS, `letter-spacing: 0.06em` |
| etiqueta de campo | Archivo | 1rem = 16px | 1.3 | 600 / wdth 100 | tipo oración, nunca mayúsculas |
| input | Bitter | 1.125rem = 18px | 1.4 | 400 | ≥16px evita zoom en iOS |
| tabla demo | Archivo | 0.9375rem = 15px | 1.4 | 500 / wdth 87 | `font-variant-numeric: tabular-nums` |
| pie / notas | Archivo | 0.875rem = 14px | 1.5 | 400 | — |

Texto mínimo absoluto: 14px. Ningún texto corrido en mayúsculas.

### 2.4 Espaciado (una sola escala, base 4px)

`--s1: 4px · --s2: 8px · --s3: 12px · --s4: 16px · --s5: 24px · --s6: 32px · --s7: 48px · --s8: 64px · --s9: 96px`

- Padding vertical de sección: `--s9` (96px) a ≥1024px, `--s7` (48px) a <768px.
- Entre h2 y primer párrafo: `--s4`. Entre párrafos: `--s4` (margin-bottom 1em ≈ 18px se acepta como equivalente).
- Filas de listas regladas: padding `--s4` arriba y abajo.
- Gutter de grilla: 24px. Margen lateral del contenedor: 40px a ≥1024px, 24px entre 768–1023, **20px a <768px**.

### 2.5 Radios, reglas, sombras

- Radios: `0` en todo. Excepción: botones e inputs `2px` (borde de imprenta, no "pastilla"). Sello: círculo.
- Reglas: `--regla-fuerte: 2px solid var(--tinta)` (solo bajo el encabezado y sobre el pie); `--regla: 1px solid var(--tinta)` (entre secciones); `--regla-fila: 1px solid var(--regla-suave)` (entre ítems de lista y filas de tabla).
- Sombras: **ninguna**. Ni en tarjetas, ni en botón, ni en demo.

---

## 3. Tipografía (2 familias, libres, autoalojadas)

1. **Archivo** (Omnibus-Type, Argentina; OFL; variable con ejes `wght` y `wdth`). Grotesca diseñada para impresión de alto rendimiento y para texto en pantalla; su ancho condensado (wdth 75) es exactamente la voz de los rótulos impresos de una guía de despacho, y el ancho normal sirve para titulares sin pasar a "fuente de startup". Diacríticos del español dibujados por una fundición hispanohablante (ñ, tildes, ¿¡ correctos). Cifras tabulares disponibles.
2. **Bitter** (Huerta Tipográfica, Argentina; OFL; variable `wght`). Serif de bloque diseñada específicamente para leer en pantalla; su trazo grueso y parejo recuerda la letra impresa de formularios y documentos, es robusta en celulares de gama baja y a 18px se lee mejor que cualquier serif de transición. Cálida sin ser "editorial de revista".

Instalación: Fontsource (`@fontsource-variable/archivo`, usando el archivo que incluye el eje `wdth`; `@fontsource-variable/bitter`). Subconjunto **latin** únicamente (cubre á é í ó ú ü ñ ¿ ¡ « » “ ” Nº). `font-display: swap`. Precargar solo los 2 woff2 latin. Fallbacks con métrica ajustada (`size-adjust`/`ascent-override`): Archivo → Arial, Bitter → Georgia, para CLS ≈ 0. Presupuesto total de fuentes ≤ 150 KB.

Si el paquete de Archivo no expone `wdth`: usar Archivo ancho normal también para rótulos con `letter-spacing: 0.08em`. **No** agregar Archivo Narrow como tercera familia.

---

## 4. Layout sección por sección

### 4.0 Grilla y regla estructural

- Contenedor: ancho de contenido máx. **1200px** centrado; a 1280px de viewport quedan 40px de margen por lado.
- 12 columnas, gutter 24px (columna ≈ 78px a 1200).
- **Fila de formulario** (patrón de todas las secciones 01–05 y contacto), a ≥1024px:
  - Columnas 1–3: **casilla de rótulo**: `Nº 01` en rojo (Archivo 600, tabular, 14px, mayúsculas) y debajo el rótulo de sección en Archivo wdth 75 mayúsculas 14px tinta-2. Alineada arriba con la línea superior del h2.
  - Columnas 4–10: h2 + contenido. Texto con `max-width: 64ch`.
  - Columnas 11–12: vacías. El aire a la derecha es intencional (medida de lectura).
  - Regla `--regla` 1px tinta cruzando las 12 columnas en el borde superior de cada sección.
- A 768–1023px: rótulo columnas 1–3 de 12, contenido 4–12.
- A <768px (390px): una columna. Rótulo arriba (Nº 01 · EL PROBLEMA en una línea), h2 debajo, contenido a ancho completo (390 − 40 = 350px).
- Prohibido: zigzag, alineación alternada izquierda/derecha, márgenes escalonados, `transform: rotate`, elementos que sangren fuera del contenedor.

Nota: el h2 de cada sección es el **nombre de la sección** de `copy.md` ("El problema", "Qué hago", etc.), en grande. La casilla de rótulo lleva solo el número, para no repetir texto: `Nº 01`. A <768px el número va sobre el h2.

### 4.1 Encabezado (`<header>`)

- 1280: una fila de 64px de alto. Izquierda: "Carlos Maldonado" (Archivo 700, 18px, tinta) + a su derecha, separado por `·`, "Automatización para pymes" (rótulo 14px tinta-2). Derecha: enlace "Conversemos" (Archivo 600, 16px, azul, subrayado 1px con `text-underline-offset: 0.2em`, zona clicable 44px de alto). Debajo, `--regla-fuerte` 2px tinta a ancho de contenedor (como la cabecera impresa de un formulario).
- 390: misma fila; "Automatización para pymes" baja a una segunda línea bajo el nombre; enlace "Conversemos" a la derecha, alineado al nombre.
- **No sticky**, sin blur, sin fondo semitransparente.
- Antes del encabezado: enlace de salto "Ir al formulario de contacto", visible solo con foco.

### 4.2 Hero (sin número de sección)

- 1280: dos zonas en la grilla. Columnas 1–7: h1, bajada (lead, máx. 52ch), CTA. Columnas 8–12 (≈ 486px): demo-hoja de registro (§5). Ambas zonas alineadas arriba: la línea superior de la demo coincide con la altura de mayúsculas de la primera línea del h1. Padding superior 64px, inferior 96px.
- CTA principal: botón sólido azul "Conversemos", 52px de alto, padding horizontal 28px, Archivo 600 18px, texto blanco, radio 2px, `href="#contacto"`. Debajo o a la derecha (en la misma línea a ≥1024px), nota en tinta-2 14px: "Te respondo en uno o dos días." Es el **único** botón sólido fuera del formulario.
- 390: orden h1 → bajada → botón (ancho completo, 52px) → nota → demo. El h1 a 36px ocupa ~3 líneas; h1 + bajada + botón deben caber en el primer viewport de 390×844 (verificar). La demo queda a continuación, sin solaparse.
- `scroll-margin-top` en `#contacto` de 24px; `scroll-behavior: smooth` solo si no hay `prefers-reduced-motion`.

### 4.3 Nº 01 · El problema

- Patrón fila de formulario. h2 "El problema". Primer párrafo en lead (19–22px), segundo en cuerpo.
- Nada más: sin ilustración, sin íconos. Es la sección más corta y debe verse corta.

### 4.4 Nº 02 · Qué hago

- h2 "Qué hago". Párrafo de entrada: "Tomo esa parte manual y la dejo andando sola. Algunos ejemplos de lo que he armado:" (ver §9 sobre "he armado").
- Los 4 ejemplos como **lista reglada** (`<ul>`), una fila por ejemplo, regla `--regla-fila` entre filas y sobre la primera:
  - A ≥768px, dentro de columnas 4–10: sub-rótulo a la izquierda (ancho fijo 160px, Archivo 600 16px tinta) + descripción en Bitter 18px. Sub-rótulos (ajuste de copy permitido, §9): **Registros**, **Pedidos**, **Avisos**, **Boletas y facturas**.
  - A 390: sub-rótulo arriba, descripción abajo.
- Cierre en tinta-2 cuerpo: "Trabajo con n8n y con las herramientas que ya conoces: Telegram, planillas, correo. Nada de sistemas nuevos que aprender."
- Sin tarjetas, sin íconos, sin flechas.

### 4.5 Nº 03 · Cómo trabajo

- h2 "Cómo trabajo".
- `<ol>` de 4 pasos, vertical, una fila reglada por paso. Columna izquierda de 48px con el número del paso en rojo (Archivo 700, 28px, tabular); a la derecha la frase inicial en negrita Archivo 600 20px (h3 visual, puede ser `<strong>` dentro de `<p>`; no usar h3 si rompe la jerarquía) y el resto en Bitter 18px en la línea siguiente.
- Pasos en columna, nunca en fila horizontal de 4 tarjetas, también a 1280.
- Debajo: "Cada parte toma semanas, no meses. Vas viendo resultados antes de gastar todo." en lead tinta.
- **CTA repetido, tranquilo:** enlace de texto azul subrayado "El paso 1 es conversar. Escríbeme aquí." → `#contacto`. Sin botón.

### 4.6 Nº 04 · Un caso real

- h2 "Un caso real". Rótulo adicional junto al número: `CASO ANÓNIMO` (rótulo tinta-2).
- Tabla comparativa de dos columnas tipo guía: dentro de columnas 4–10, dos columnas iguales separadas por una regla vertical 1px tinta, con encabezados rotulados **ANTES** (tinta-2) y **AHORA** (azul), ambos en rótulo 14px. Mismo baseline arriba, mismo fondo blanco, sin rotaciones, sin inversión de color.
  - Antes: "Cada persona anotaba en una hoja, alguien juntaba todo en la tarde, y recién ahí el dueño sabía el total del día, cuando le llegaba el papel."
  - Ahora: "Cada persona manda un mensaje de Telegram con dos datos. La planilla se llena sola y el dueño recibe el resumen del día sin pedirlo."
- 390: las dos columnas se apilan (Antes arriba, Ahora abajo) con regla horizontal entre ellas.
- Cierre a ancho del contenido, lead: "Cero cuadernos, cero doble tipeo, el número está al minuto."
- **Sin capturas ni placeholders** "[captura]" hasta que existan capturas reales anonimizadas. Cuando existan: fila de hasta 3 imágenes con borde 1px tinta y pie de foto real; nunca mockups de teléfono.

### 4.7 Nº 05 · Qué esperar

- h2 "Qué esperar".
- Lista reglada de 4 condiciones (como las condiciones impresas al reverso de un documento): cada fila con la frase en negrita Archivo 600 20px y la explicación en Bitter 18px debajo. Una columna, también a 1280. Sin grilla 2×2.
- CTA repetido: enlace de texto "¿Te hace sentido? Conversemos." → `#contacto`.

### 4.8 Contacto · `id="contacto"`

- Fila de formulario con `Nº 06`. h2 "Conversemos". Intro en lead: "Cuéntame qué parte de tu trabajo te gustaría sacarte de encima. Te respondo en uno o dos días."
- El talonario (§6) ocupa columnas 4–9 a 1280 (≈ 570px; más ancho que eso empeora la lectura de los campos). 390: ancho completo.

### 4.9 Pie (`<footer>`)

- `--regla-fuerte` 2px arriba. Una línea a 1280 (Archivo 14px tinta-2), separadores `·`: "Carlos Maldonado · Automatización para pymes" — enlace mailto `carlos.automatiza.tupyme@gmail.com` (azul) — "Hecho en Chile · 2026".
- 390: tres líneas apiladas. El enlace de correo con zona de toque ≥44px de alto.

### 4.10 Cómo aparece el concepto (inventario cerrado)

| Elemento | Dónde | Función |
|---|---|---|
| Regla fuerte 2px | bajo encabezado, sobre pie | Cabecera y cierre del documento |
| Casilla de rótulo `Nº 0X` en rojo | izquierda de cada sección | Navegación y orden de lectura |
| Filas regladas | listas de 02, 03, 05 | Escaneo rápido, una idea por fila |
| Hoja de registro | demo del hero | Prueba de qué hace Carlos |
| Copia amarilla + línea discontinua superior | talonario de contacto | Señala "esto lo llenas tú" |
| Sello circular azul "RECIBIDO" + fecha/hora | solo en éxito de envío | Confirmación inequívoca |

Cualquier otro elemento "de papel" queda fuera.

---

## 5. Demo "mensaje → fila → aviso"

### 5.1 Estructura (estática, contenido final en el HTML)

`<figure>` con borde 1px tinta, fondo blanco, padding 24px (16px a 390), sin sombra, sin rotación.

1. **Cabecera de la hoja:** a la izquierda rótulo "HOJA DE REGISTRO · PRODUCCIÓN"; a la derecha etiqueta **EJEMPLO** en rojo, rótulo 14px dentro de un recuadro 1px rojo, horizontal. Debajo, regla 1px tinta.
2. **Paso 1 · Llega el mensaje** (sub-rótulo con "1" en rojo). Línea pequeña tinta-2: "Telegram · Juan · 08:14". Debajo, el mensaje en un recuadro con borde izquierdo 3px azul y fondo `--azul-palido`: "Producción: 120 cajas". Sin avatar, sin burbuja redondeada, sin íconos de app.
3. **Paso 2 · Se anota en la planilla.** Tabla real (`<table>`) con encabezado sobre `--azul-palido`: Hora | Quién | Cajas (cantidad alineada a la derecha, tabular). Filas: 07:52 Pedro 95 · 08:03 Ana 110 · **08:14 Juan 120** (fila nueva). Regla `--regla-fila` entre filas.
4. **Paso 3 · Te llega el aviso.** Recuadro `--azul-palido`, borde 1px azul: "Aviso · 18:00 — Total del día: 1.240 cajas" (tinta, cifra en Archivo 600 tabular).
5. `<figcaption>` visible bajo la hoja, tinta-2 14px: "Ejemplo ilustrativo con datos inventados: un trabajador manda un mensaje, la planilla se llena sola y al final del día te llega el total."

Datos inventados y genéricos ("cajas"): no reutilizar la unidad ni el rubro del caso real para no hacerlo identificable.

### 5.2 Secuencia animada (solo con JS y sin reduced-motion)

Disparo: `IntersectionObserver` al 50% visible, **una sola vez**. Se anima solo la presentación (opacidad/recorte), **nunca** se cambia el texto del DOM; el contenido final está siempre en el HTML.

| t | Qué pasa | Duración |
|---|---|---|
| 0.0 s | Estado inicial: mensaje del paso 1, fila 08:14 y aviso ocultos (opacidad 0); filas previas visibles. Aparece el mensaje (opacidad 0→1) | 250 ms |
| 0.8 s | Fila 08:14 se "escribe": celdas Hora, Quién, Cajas aparecen una tras otra | 3 × 200 ms |
| 0.8 s | Fondo de la fila nueva en `--copia-amarilla`, se desvanece a blanco | 1.5 s |
| 2.4 s | Aparece el aviso del paso 3 | 250 ms |
| 3.0 s | Fin. Aparece botón de texto "Ver de nuevo" (azul, 44px de alto) bajo la hoja | — |

Easing: `ease-out`. Sin rebotes, sin escritura carácter por carácter, sin cursor parpadeante, sin bucle infinito, sin contador que sube.

### 5.3 Reduced motion y sin JS

- `prefers-reduced-motion: reduce` o JS desactivado: la hoja se ve en su estado final, completa, fila nueva sin resaltado; no aparece "Ver de nuevo".
- Lector de pantalla: la `figure` lee figcaption + tabla real; nada animado tiene `aria-live`. El botón "Ver de nuevo" es `<button type="button">`.

---

## 6. Formulario de contacto = talonario

### 6.1 Apariencia

- Contenedor fondo `--copia-amarilla`, borde 1px tinta en los lados e inferior; borde superior **2px discontinuo** `--linea-campo` (la única perforación de la página). Padding 32px (20px a 390).
- Cabecera interna: rótulo "SOLICITUD DE CONTACTO" a la izquierda; a la derecha rótulo "Para: Carlos Maldonado". Regla 1px tinta debajo.
- Campos numerados como un formulario: cada etiqueta lleva delante su número en rojo ("1", "2", "3") en Archivo 600; el número es `aria-hidden`.

### 6.2 Campos

| # | Etiqueta visible | `name` | Control | Validación | Ayuda (tinta-2 14px, `aria-describedby`) |
|---|---|---|---|---|---|
| 1 | Nombre | `nombre` | `input type="text"`, `autocomplete="name"` | requerido, 2–100 caracteres | — |
| 2 | Correo o teléfono | `contacto` | `input type="text"`, `autocomplete="email"`, `inputmode="email"` | requerido; válido si contiene `@` con dominio, o si tiene ≥8 dígitos (se ignoran espacios, `+`, `-`, `( )`); máx. 120 | "Donde prefieras que te responda." |
| 3 | ¿Qué te gustaría automatizar? | `mensaje` | `textarea`, 5 filas, redimensionable vertical | requerido, 10–2000 caracteres | "Ej.: anotamos los pedidos a mano y después los paso a una planilla." |
| — | honeypot | `sitio_web` | `input type="text"`, `tabindex="-1"`, `autocomplete="off"`, contenedor `aria-hidden="true"` fuera de pantalla (posición absoluta, no `display:none`), etiqueta "No llenar" | debe ir vacío | — |

- Etiquetas siempre visibles, encima del campo. **Sin placeholders** (la ayuda va como texto de ayuda, no dentro del campo).
- Input: fondo `#FFFFFF`, borde 1px `--linea-campo` en tres lados y **2px tinta abajo** (la "línea del campo" del talonario), radio 2px, alto mínimo 48px, padding 12px.
- Botón "Enviar": sólido azul, 52px de alto, ancho completo a 390, ancho automático (mín. 200px) a ≥768px. Al lado (≥768px) o debajo: "Te respondo en uno o dos días."
- Bajo el botón, tinta-2 14px: "Uso tus datos solo para responderte." (requiere confirmación de Carlos, §9).

### 6.3 Estados

| Estado | Visual | Comportamiento |
|---|---|---|
| Vacío | Como arriba | Botón habilitado siempre (no se deshabilita por campos vacíos). |
| Foco | Outline 3px `--azul`, offset 2px, en input y botón; borde inferior pasa a azul | Solo `:focus-visible` en botones; en inputs también con mouse. |
| Error (validación al enviar) | Borde inferior 2px `--rojo`; mensaje bajo el campo en rojo 16px precedido de "Falta:" o "Revisa:" (texto, no ícono) | Validación al pulsar Enviar, no mientras se escribe. `aria-invalid="true"`, mensaje enlazado por `aria-describedby`, foco al primer campo con error. El error se limpia al corregir ese campo. Mensajes: "Falta tu nombre." / "Falta un correo o teléfono para responderte." / "Revisa el correo o teléfono: no parece completo." / "Cuéntame un poco más (al menos una frase)." |
| Enviando | Botón muestra "Enviando…", `aria-busy="true"`, campos `readonly` | Se ignoran clics repetidos. Timeout 10 s → Fallo. |
| Éxito | El contenido del talonario se reemplaza por: sello circular azul (96px, borde 3px azul, texto "RECIBIDO" en rótulo azul, **sin rotación**) + "Listo. Te escribo pronto." (Archivo 700 28px tinta) + línea tinta-2: "Solicitud recibida el 14-10-2026 a las 18:42." (fecha/hora local del navegador) | Contenedor con `role="status"`; foco movido al titular de éxito (`tabindex="-1"`). Sin confeti, sin animación del sello. |
| Fallo (red, timeout, respuesta no 2xx) | Recuadro `--error-fondo`, borde izquierdo 3px rojo, sobre el botón: título rojo "No se pudo enviar." + "Escríbeme directo a carlos.automatiza.tupyme@gmail.com" (enlace mailto azul, con asunto "Contacto desde la web") | `role="alert"`. **Los datos escritos se conservan**. Botón pasa a "Reintentar". |

### 6.4 Contrato del POST

- Método `POST` a `PUBLIC_FORM_ENDPOINT` (variable de entorno de build de Astro; URL HTTPS pública del webhook de n8n).
- Cabecera `Content-Type: application/json`. Sin cookies, sin credenciales.
- Cuerpo:

```json
{
  "nombre":   "string, recortado, 2–100",
  "contacto": "string, recortado, ≤120",
  "mensaje":  "string, recortado, 10–2000",
  "hp":       "string, valor del honeypot; debe ser \"\"",
  "t":        "entero, milisegundos entre la carga de la página y el envío"
}
```

- Servidor (n8n) **revalida todo** (largos, requeridos). Si `hp !== ""` o `t < 3000`: responder 200 igual y descartar en silencio (no enseñar al bot).
- Éxito = cualquier 2xx. Cuerpo de respuesta ignorado por el cliente.
- CORS: el webhook debe permitir el origen exacto `https://carlos-maldonado578.github.io` (incluye preflight OPTIONS por `application/json`).
- El endpoint **debe** ser HTTPS (la página es HTTPS; un `http://` a prodesk se bloquea por contenido mixto).

---

## 7. Accesibilidad y rendimiento

- `lang="es-CL"`. Landmarks: `header`, `main`, `footer`; cada `section` con `aria-labelledby` a su h2. Sin `<nav>` (hay un solo enlace).
- **Un solo h1** (hero). h2 por sección. Sin saltos de nivel.
- Orden de tab: salto "Ir al formulario" → Conversemos (encabezado) → Conversemos (hero) → Ver de nuevo (si existe) → enlaces de 03 y 05 → Nombre → Correo o teléfono → mensaje → Enviar → correo del pie. El honeypot no recibe foco.
- Foco visible en todo elemento interactivo: outline 3px `--azul`, offset 2px. Nunca `outline: none` sin reemplazo.
- Objetivos táctiles ≥44×44px (enlaces de texto: padding vertical para llegar a 44px de alto).
- Enlaces en texto siempre subrayados (no solo color).
- Contraste: ver §2.2; ningún par de texto bajo 4.5:1.
- `prefers-reduced-motion`: sin animación de demo, sin `scroll-behavior: smooth`.
- JS: un único script inline o módulo ≤ 3 KB minificado (formulario + disparo de demo). Sin framework de cliente, sin islas hidratadas, sin dependencias npm en runtime.
- Sin analítica, sin píxeles, sin fuentes ni recursos de terceros en runtime (todo autoalojado). Sin embeds.
- Metas: Lighthouse móvil Performance ≥95, Accessibility 100, Best Practices 100; LCP <1.8 s, CLS <0.05; peso total de la página <250 KB transferidos.
- `<meta name="description">` y Open Graph en español con el h1 y la bajada; sin imagen OG generada por IA (si se hace, texto sobre fondo blanco con la tipografía del sitio).

---

## 8. Anti-IA

### No hacer (10)

1. Degradados, brillos, neón, `text-shadow` de color, fondos oscuros "tech".
2. Glassmorphism, `backdrop-filter`, encabezado sticky semitransparente.
3. Números fantasma gigantes, texto con contorno, cifras decorativas de 100px+.
4. Filas de 3–4 tarjetas iguales (ícono + título + texto), grillas 2×2 de beneficios.
5. Íconos genéricos (Lucide, Heroicons, check en círculo, cohetes, rayos), emoji, ilustraciones isométricas o 3D, fotos de stock.
6. Rotaciones, inclinaciones, zigzag, márgenes escalonados, elementos que se salen del contenedor.
7. Chat falso con avatares redondos, insignias "en vivo", comentarios `// así` en monoespaciada simulando código.
8. Hero centrado con dos botones (primario + fantasma) y eyebrow en mayúsculas espaciadas sobre cada titular.
9. Prueba social inventada: logos, testimonios, estrellas, "+50 pymes", contadores animados, folios numéricos.
10. Animaciones de aparición al hacer scroll en cada sección, sombras difusas, botones en pastilla, radios grandes.

### Sí hacer: oficio (5)

1. Cifras tabulares (`tabular-nums`) en tabla, horas, pasos y fecha de recepción; cantidades alineadas a la derecha; separador de miles con punto (1.240).
2. Tipografía española correcta: ¿…?, ¡…!, comillas “ ” o « », espacio fino o duro en "Nº 01", "1.240 cajas", "uno o dos días"; `text-wrap: balance` en h1/h2 y `pretty` en párrafos para evitar viudas; sin guionado automático.
3. Alineación a una sola línea vertical: rótulos de casilla, h2, listas y talonario arrancan en los mismos bordes de columna (3|4); revisar con una guía a 1280 y a 390.
4. Subrayados finos y deliberados: `text-decoration-thickness: 1px`, `text-underline-offset: 0.2em`, 2px en hover.
5. Texto real en todo momento: ningún lorem, ningún "[captura]", ninguna etiqueta genérica tipo "Feature 1"; el ejemplo de la demo es plausible y rotulado.

---

## 9. Ajustes de copy permitidos (solo claridad)

Permitidos:
- **h1:** se mantiene el de `copy.md`, "Automatizo la pega repetitiva de tu pyme." Gana sobre el del contrato ("La pega que haces a mano, andando sola.") porque contiene el verbo que dice qué hace Carlos y está aprobado. La frase del contrato no se usa.
- Bajada del hero: se puede acortar a 2 líneas a 1280 manteniendo las ideas de `copy.md`: "Registros que se llenan solos y avisos que llegan sin que los pidas. Con herramientas simples y sin que cambies cómo trabajas."
- CTA del hero: "Conversemos" sin flecha.
- Sub-rótulos de la lista 02: Registros / Pedidos / Avisos / Boletas y facturas.
- Enlaces de repetición: "El paso 1 es conversar. Escríbeme aquí." y "¿Te hace sentido? Conversemos."
- Reemplazar rayas (—) incisas por comas o dos puntos (el exceso de rayas es una marca de texto generado). Se permite una como máximo en toda la página.
- Rótulos funcionales: EJEMPLO, CASO ANÓNIMO, SOLICITUD DE CONTACTO, ANTES/AHORA, RECIBIDO.
- Ayudas y mensajes de error del formulario de §6.
- Pie: reemplazar "CORREO" por la dirección real.

Requieren confirmación de Carlos antes de publicar (no inventar):
- "Algunos ejemplos de lo que **he armado**": si boletas/facturas o pedidos aún no están construidos para un cliente, cambiar a "Algunos ejemplos de lo que armo" o quitar el ítem.
- "Uso tus datos solo para responderte."
- "Te respondo en uno o dos días."

Prohibido: precios, plazos concretos más allá de "semanas, no meses", nombres o rubros de clientes, cifras de resultados, voseo, "potencia/transforma/soluciones a tu medida".

---

## 10. Riesgos y qué verificar en el resultado final

Riesgos:
1. **Kitsch por acumulación:** el implementador agrega "detalles de papel" extra. Verificar contra el inventario cerrado de §4.10; todo lo que no esté ahí se elimina.
2. **Endpoint:** prodesk detrás de HTTPS + CORS correcto. Sin eso el formulario falla siempre. Probar desde la URL publicada, no desde localhost.
3. **Formulario caído:** con prodesk apagado debe verse el fallo con el correo de respaldo y conservar lo escrito.
4. **Rótulos ilegibles:** mayúsculas condensadas a 14px en celulares de gama baja. Si se ve apretado, subir a 15px o a wdth 87.
5. **El caso puede identificar al cliente** si se mezcla con la demo. Demo con "cajas" y nombres genéricos; caso sin unidad ni rubro.
6. **Spam:** honeypot + `t` frenan bots simples; si llega spam, agregar límite por IP en n8n antes que un CAPTCHA.

Checklist de revisión:
- [ ] A 390×844: h1, bajada y botón "Conversemos" visibles sin scroll; sin scroll horizontal.
- [ ] A 1280: rótulos en columnas 1–3, contenido en 4–10, todo alineado al mismo borde; demo arriba a la derecha sin solaparse.
- [ ] Un solo h1; h2 por sección; landmarks correctos (revisar con el árbol de accesibilidad).
- [ ] Navegación completa con teclado, foco visible siempre, honeypot fuera del orden de tab.
- [ ] Contraste de todos los pares de texto ≥4.5:1 (re-medir lo implementado, no confiar en la tabla).
- [ ] Con `prefers-reduced-motion`: demo estática completa, sin "Ver de nuevo".
- [ ] Con JS desactivado: demo completa; el formulario hace algo razonable (mostrar el correo de respaldo con `<noscript>`).
- [ ] Formulario: los 6 estados probados (vacío, foco, error, enviando, éxito, fallo) y el JSON exacto de §6.4 recibido en n8n.
- [ ] Fuentes autoalojadas, solo subset latin, ñ y tildes bien en titulares; cero peticiones a terceros (pestaña Red).
- [ ] Lighthouse móvil según metas de §7.
- [ ] Prueba de los 5 segundos con alguien no técnico: debe poder decir qué hace Carlos y dónde se le escribe.
- [ ] Ninguno de los 10 "no hacer" de §8 presente.
- [ ] Ningún texto no aprobado: comparar contra `copy.md` + §9.

---

## 11. Autocrítica de esta especificación (aplicada antes de entregar)

- **Folio numérico** del contrato original: lo eliminé por deshonesto; lo reemplacé por fecha/hora real de recepción.
- **Copia rosada:** no tenía función; eliminada. Amarilla queda solo en el talonario y como resaltado de 1.5 s en la demo.
- **h1 en conflicto** entre contrato y copy: decidido a favor de `copy.md` con razón explícita.
- **Placeholders "[captura]"** heredados de v5: prohibidos; se muestran capturas solo cuando existan.
- **Demo que reescribe el DOM:** riesgo para lectores de pantalla; especificada como animación solo de presentación sobre contenido final.
- **Rótulo + h2 duplicados** ("EL PROBLEMA" + "El problema"): la casilla lleva solo el número.
- **Bordes solo inferiores en inputs** (más "talonario"): descartado; un dueño poco técnico necesita ver la caja completa. Se conserva el borde inferior más grueso como guiño.
- **Pendiente honesto:** la elección Archivo + Bitter no tiene raíz chilena (ambas argentinas); se eligió por legibilidad y oficio latinoamericano en español, no por patriotismo tipográfico.
