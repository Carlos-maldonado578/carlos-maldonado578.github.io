---
name: Carlos Maldonado · Automatización para pymes
description: Una landing que es la planilla funcionando: la demo mensaje, fila y aviso como protagonista, composición distinta por sección y formulario en tarjeta blanca.
colors:
  papel: "#ffffff"
  tinta: "#16202e"
  tinta-2: "#4a5363"
  azul-imprenta: "#1f3a8a"
  azul-imprenta-hover: "#152b66"
  rojo-folio: "#b0172b"
  destello: "#fff6d5"
  azul-palido: "#e8edf7"
  linea-campo: "#6b7484"
  regla-suave: "#c5cbd3"
  error-fondo: "#fbe4e7"
  azul-noche: "#12255a"
  noche-texto: "#c9d6f5"
  noche-regla: "#8fa3d6"
typography:
  display:
    fontFamily: "Archivo, Archivo Fallback, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 3.4vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Archivo, Archivo Fallback, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 1.3rem + 1.8vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
  frase:
    fontFamily: "Bitter, Bitter Fallback, Georgia, serif"
    fontSize: "clamp(2rem, 1.2rem + 3vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Archivo, Archivo Fallback, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Archivo, Archivo Fallback, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Archivo, Archivo Fallback, Arial, sans-serif"
    fontSize: "clamp(1.1875rem, 1.1rem + 0.4vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, Archivo Fallback, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.06em"
rounded:
  campo: "10px"
  tarjeta: "12px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
components:
  button-primary:
    backgroundColor: "{colors.azul-imprenta}"
    textColor: "{colors.papel}"
    rounded: "{rounded.campo}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.azul-imprenta-hover}"
  button-text:
    textColor: "{colors.azul-imprenta}"
    height: "44px"
  input-campo:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.campo}"
    padding: "12px 16px"
    height: "52px"
  hoja-registro:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    padding: "24px"
  aviso:
    backgroundColor: "{colors.azul-palido}"
    textColor: "{colors.tinta}"
    padding: "12px"
  faq-pregunta:
    textColor: "{colors.tinta}"
    padding: "16px 0 0"
---

# Design System: Carlos Maldonado · Automatización para pymes

## Overview

**Creative North Star: "La planilla que se llena sola"**

La página muestra la planilla funcionando en vez de parecerse a un documento. La demo (mensaje, fila nueva, aviso) es la pieza central y cada sección muestra un objeto distinto (frase, lista de pegas con escenas, pasos con dos carriles, un eje horario del día, preguntas desplegables, formulario) en vez de repetir una lista con reglas. Rechaza la plantilla SaaS (degradados, sombras, íconos, números gigantes) y también el aire de CV (rótulo a la izquierda, texto a la derecha).

Una sola tinta comprometida (azul de imprenta) para acción y foco; rojo solo para numeración, sello EJEMPLO y errores; amarillo solo como destello de la fila nueva. El carácter viene de la escala, los radios de 10-12px y la planilla real, no de efectos.

**Key Characteristics:**
- Papel blanco, azul pálido y UNA banda azul noche; solo 3 cortes de color de arriba a abajo (tinte, blanco, noche, tinte); sin degradados, sombras ni blur.
- Títulos arriba y a ancho completo; cada sección con una composición propia.
- Archivo para todo el cuerpo y la UI; Bitter solo en la frase del problema. Sin íconos.
- Radios 10px (campos, botones, burbujas) y 12px (tarjetas); las tablas siguen rectas.
- Números siempre tabulares; la numeración en rojo.

## Colors

### Primary
- **Azul de Imprenta** (#1f3a8a): botón principal, enlaces, foco, marca "Ya funcionando", estado Recibido. Hover: **Profundo** (#152b66).

### Secondary
- **Rojo de Folio** (#b0172b): numerales de pasos (blanco 6.99:1, azul pálido 5.96:1), sello EJEMPLO, errores y borde de campo inválido. Nunca relleno ni acción.

### Tertiary
- **Destello** (#fff6d5): solo el destello de 1s de la fila nueva (demo y confirmación del formulario). No es superficie.

### Neutral
- **Papel** (#ffffff), **Tinta** (#16202e), **Tinta Secundaria** (#4a5363; 7.75:1 sobre blanco, 6.60:1 sobre azul pálido).
- **Azul Pálido** (#e8edf7): bandas (hero y Conversemos), encabezado de tabla, burbuja, aviso, miniaturas. Tinta 13.97:1, azul 8.81:1.
- **Línea de Campo** (#6b7484): borde de campos (1.5px; 4.71:1 sobre blanco) y de chips.
- **Regla Suave** (#c5cbd3): borde 1px de tarjetas, filas de tablas, cabecera y pie (decorativo).
- **Fondo de Error** (#fbe4e7): caja de fallo (rojo sobre él 5.78:1).

### Banda de marca
- **Azul Noche** (#12255a): fondo de UNA sola sección, el Caso real. Blanco 14.60:1; **Texto sobre Noche** (#c9d6f5, 10.03:1); **Regla sobre Noche** (#8fa3d6, 5.83:1).

### Named Rules
**The Una Tinta Rule.** El azul es el único color de acción; el rojo numera y avisa error. Un elemento nuevo que pida atención usa peso o escala, no un tercer color.

**The Superficie Rule.** El color extra viene de superficies: azul pálido en bandas alternas, azul noche en una sola. Ninguna otra sección se oscurece.

## Typography

**Cuerpo y UI:** Archivo variable (con Arial). **Frases grandes:** Bitter variable (con Georgia), solo en la frase del problema.

### Hierarchy
- **Display** (700, clamp 2.5-4.25rem, 1.05, ancho 87%): solo el h1, máx. 16ch (68px a 1440).
- **Headline** (700, clamp 1.875-2.5rem, 1.15, ancho 87%): h2 arriba y a ancho completo, máx. 22ch (40px a 1440). Queda por debajo de los nombres de pega (48px).
- **Frase** (Bitter 700, clamp 2-3.25rem, 1.15): el h2 del problema, máx. 24ch; es la única pausa grande fuera del h1.
- **Title** (600, 1.25rem): h3 de pasos y bloques. Texto de hitos del eje del caso: 1.25rem.
- **Body** (400, 1.0625rem, 1.6) y **Lead** (clamp 1.1875-1.375rem).
- **Label** (600, 0.875rem, mayúsculas, ancho 75%): solo dentro de la demo (rótulos de paso, EJEMPLO). Notas y ayudas: 0.9375rem en tinta secundaria.

### Named Rules
**The Tabular Rule.** Todo número que se lee como dato usa cifras tabulares.

**The Ancho Rule.** El eje `wdth` de Archivo marca el ítem activo: 75% inactivo, 100% activo. Se usa solo en la lista de "Elige tu pega"; no se simula con `transform: scaleX` ni se atenúa con `opacity` (el contraste se baja con color).

**The Rótulo Rule.** Mayúsculas comprimidas solo dentro de la demo; en el resto, etiquetas y títulos en mayúscula normal.

## Layout

Una columna centrada, máx. 1200px más margen lateral (20/24/40px). Sin retícula título-izquierda/texto-derecha. Composición por sección:
- **Hero** (azul pálido): texto en columnas 1-6, demo en 7-12 alineada a la derecha con ancho máximo 520px (antes ~690px) desde 1024px.
- **Problema + Qué puedo dejar andando solo** (blanco, separados por una regla de 1px y más espacio): la frase grande plantea y "Elige tu pega" responde. Desde 1024px, lista de 4 nombres grandes en columnas 1-6, con Pausar y el botón de contorno "¿Tienes otra pega repetitiva? Cuéntamela" justo bajo la lista, y panel con la hoja en 7-12 (ancho máx. 560px, padding 24px); en móvil, lista, Pausar y panel apilados. Sin JS, los 4 paneles apilados. Bajo cada pega, "Cómo está armado / Con qué lo armaría" con herramientas reales.
- **Cómo trabajo + Qué no hago** (blanco, separado solo por espacio): 4 pasos en fila desde 1024px, cada uno con dos carriles alineados por subgrid, "Yo hago" y "Tú haces" (sin recuadro, ambos en texto plano; "Tú haces" con rótulo en tinta secundaria), cada paso con regla superior de 1px, textos cortos (una o dos líneas por carril), una línea punteada que separa "Yo hago" de "Tú haces" y una flecha azul → entre pasos (solo en fila, desde 1024px). Cierra con una frase en `.lead` y una lista de 2 límites ("Qué no hago", h3 estándar) con regla de 1px; sin botón ni íconos.
- **Caso real** (azul noche): UN eje horario 08:00 a 20:00 con dos carriles, Antes (línea fina y vacía hasta las 17:30) y Ahora (pista blanca gruesa desde las 08:14 hasta las 18:00). Cada hito se ubica en `left: (hora - 8) / 12 * 100%` con una variable `--h`; los de la derecha se anclan por su borde derecho. Bajo 900px el eje se vuelve vertical con Antes y Ahora lado a lado. Reloj del día: un cursor vertical fino (en móvil, horizontal) de Texto sobre Noche recorre el eje con la hora en vivo en Archivo 700 tabular, en la columna izquierda de la fila de la escala (en móvil, columna de horas); el cursor pasa por detrás de los textos (fondo Noche) y nunca los pisa.
- **Preguntas** (blanco) **y Conversemos** (azul pálido, banda propia que cierra la página y lleva al formulario): cuatro preguntas con su respuesta siempre visible, en 2 columnas desde 768px y una regla de 1px sobre cada una, y Conversemos con dos frases sobre el formulario (quién soy, trabajo solo y sin agencia; cada proyecto se cotiza aparte) y el formulario en tarjeta (texto en 1-5, tarjeta en 6-12). No hay sección "Quién soy" aparte, ni foto.

Padding vertical 48px (96px desde 1024px). Sin reglas entre secciones: cambian las superficies.

## Elevation & Depth

Plano: ningún `box-shadow`, degradado ni blur. La profundidad la dan el cambio de superficie y bordes de 1px.

## Shapes

Radio 10px en botones, campos, burbuja, aviso, chips y miniaturas; 12px en tarjetas y hoja de la demo; 6px en el sello EJEMPLO; 0 en tablas. Sin círculos. Sin `border-left/right` ≥3px.

## Components

### Buttons
- **Primario:** azul de imprenta, texto blanco, 52px (56px el de enviar, ancho completo; 44px el de la cabecera "Conversemos"), radio 10px, Archivo 600. Hover profundo, active `translateY(1px)`.
- **Primario claro:** blanco con texto azul noche, solo sobre la banda noche (hover: texto de noche). Foco: contorno blanco.
- **Texto:** azul subrayado, 44px ("Pausar/Reanudar", enlaces de cierre).
- **Pregunta:** bloque con regla de 1px arriba, pregunta en Archivo 600 1.125rem y respuesta de 2-3 líneas debajo (máx. 44ch). Sin acordeón: todo se lee sin clics.
- **Foco:** contorno 3px azul con 2px de separación en todo.

### Formulario (tarjeta blanca)
En móvil (bajo 1024px) el orden es título, línea de prueba ("Mira el caso"), tarjeta y después las promesas. Tarjeta blanca, borde 1px regla suave, radio 12px, padding 32px (20px móvil), sobre azul pálido. Orden: mensaje (textarea que crece sola con `field-sizing`, sin tirador), nombre y contacto en dos columnas desde 768px, botón "Enviar mensaje" a ancho completo y la nota "Uso tus datos solo para responderte" (el correo queda en el pie y en la caja de fallo). Formulario mínimo: sin bloque "Qué pasa después de enviar" ni línea sobre el número de datos; solo el campo de mensaje lleva ayuda. El precio ("se cotiza aparte") va en la segunda frase del texto de contacto. Etiquetas arriba (Archivo 600, 1rem, sin números). Campos de 52px, borde 1.5px Línea de Campo, radio 10px, texto 1.0625rem. Hover: borde tinta. Foco: borde azul + contorno 3px. Inválido: borde rojo y mensaje "Falta:/Revisa:" debajo. Fallo: caja de error con correo de respaldo; el botón pasa a "Reintentar". Éxito: título personalizado que avisa que lo contactarás a la brevedad posible, y mini-planilla (Hora, Quién, Estado "Recibido") con la fila del propio mensaje y destello; valores insertados con `textContent`.

### Demo (hoja de la planilla)
Figura blanca, radio 12px, con sello EJEMPLO. Tres pasos numerados en rojo unidos por un trazo fino: burbuja de mensaje (1.125rem), tabla de 5 filas (1rem), todo compacto (ancho máx. 520px, ~540px de alto a 1440; la compactación va con `#demo` y no toca las escenas de "Elige tu pega") con columna Estado, aviso. En bucle de tres mensajes (cada uno suma su fila con destello de 1s y al final aparece el aviso), con botón visible Pausar/Reanudar. Con `prefers-reduced-motion` o sin JS se ve el estado final completo y estático.

### Elige tu pega
Lista de 4 pestañas verticales (Archivo 700, clamp 1.5-2rem) con número rojo y estado escrito debajo ("Ya funcionando en un cliente" en azul 600; "Lo puedo armar" en tinta secundaria). El nombre activo se estira de ancho 75% a 100% y pasa a tinta; debajo, barra azul de 3px. Rota sola como carrusel (ver Movimiento); también se elige con clic o teclado (no con hover). A la derecha, un panel `.hoja` con sello EJEMPLO, frase, escena hecha con los componentes de la demo (burbuja, tabla con fila nueva, tablero de pedidos, nivel de stock, boleta, aviso) y nota de honestidad. Los 4 paneles comparten celda: el alto no cambia al elegir. Solo Registros dice "Ya funcionando en un cliente".

### Navigation
Cabecera sticky con borde inferior 1px: nombre a la izquierda y botón pequeño "Conversemos". Pie de una línea: nombre, correo, Volver al inicio. Botón fijo volver arriba (48px, radio 10px), oculto bajo 768px porque tapa texto.

### Movimiento
La demo del hero en bucle (arranca desde el estado final y espera 5 s antes del primer ciclo; opacidad 250ms y destello 1s), el botón volver arriba (sin transición con `prefers-reduced-motion`) y "Elige tu pega": carrusel en rotación continua. Cada pega se muestra 9 s (constante `DUR_PEGA` en `main.js`; la escena se arma con el motor `bucle` del hero y el último paso se alarga hasta completar el tiempo), pasa a la siguiente y tras Boletas y facturas vuelve a Registros, en bucle, solo mientras la sección es visible (IntersectionObserver; fuera de pantalla o con la pestaña oculta se pausa y al volver sigue). La barra de 3px bajo el nombre activo se llena en esos 9 s. Pausar/Reanudar siempre visible con su estado; cualquier clic o tecla en una pega corta el auto-avance y lo deja pausado hasta pulsar Reanudar (la escena elegida se reproduce una vez). La transición de `font-stretch` dura 300ms. Con `prefers-reduced-motion` no hay auto-avance ni Pausar y cada panel muestra su estado final; sin JS, los 4 paneles apilados. No hay aparición por sección. **Caso real**: al entrar en pantalla (IntersectionObserver, una sola vez) un reloj recorre 08:00-20:00 en 9,5 s más 0,5 s quieto al inicio (constantes `DUR_CASO` y `ESPERA_CASO` en `main.js`; bucle con requestAnimationFrame, no con `bucle`, porque necesita avance continuo). El cursor es `transform` (medido en px, sin animar layout); la pista blanca de Ahora se rellena con `scaleX` (`scaleY` en móvil) desde 08:14 hasta 18:00; los hitos y "Ya está en la planilla." aparecen (opacidad + 8px, 300ms) al ser alcanzados; en 08:14 un anillo blanco pulsa una vez (900ms); en 20:00 el total de Antes entra con un destello 1s (`destello-noche`: amarillo con texto noche, solo ahí); la línea de Antes queda a 50% de opacidad hasta el final. Botón de 44px solo con símbolo (pausa, play, repetir; trazo 2px, contorno Regla sobre Noche) con nombre accesible "Pausar"/"Reanudar"/"Ver de nuevo", sin la nota "Cliente anónimo…" bajo el eje (el cursor y la hora se desvanecen y queda el estado final de siempre). Con `prefers-reduced-motion` o sin JS no hay reloj ni botón: estado final estático en el HTML.

## Do's and Don'ts

### Do:
- **Do** dar a cada sección una composición propia y títulos arriba a ancho completo.
- **Do** reservar azul para acción y foco, rojo para numeración de pasos, EJEMPLO y error (en el formulario, solo error).
- **Do** rotular como EJEMPLO todo lo ilustrativo y no inventar cifras, logos ni clientes.
- **Do** mantener objetivos de 44px o más y contorno de foco de 3px; bordes de campo ≥3:1.

### Don't:
- **Don't** usar sombras, degradados, blur, íconos de cualquier tipo, emoji ni glassmorphism.
- **Don't** volver a la retícula rótulo izquierda/texto derecha ni al papel calco (copia amarilla, sello RECIBIDO, etiquetas numeradas).
- **Don't** usar rojo como relleno o acción, ni amarillo como superficie.
- **Don't** mostrar números sin cifras tabulares.
