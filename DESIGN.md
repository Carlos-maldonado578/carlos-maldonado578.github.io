---
name: Carlos Maldonado · Automatización para pymes
description: Una landing que es un talonario de formulario impreso, rellenado a tinta azul con folio en rojo.
colors:
  papel: "#ffffff"
  tinta: "#16202e"
  tinta-2: "#4a5363"
  azul-imprenta: "#1f3a8a"
  azul-imprenta-hover: "#152b66"
  rojo-folio: "#b0172b"
  copia-amarilla: "#fff6d5"
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
    fontSize: "clamp(2.25rem, 1.5rem + 3.2vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Archivo, Archivo Fallback, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Archivo, Archivo Fallback, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Bitter, Bitter Fallback, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Bitter, Bitter Fallback, Georgia, serif"
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
  campo: "2px"
  sello: "50%"
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
    padding: "12px"
    height: "48px"
  talonario:
    backgroundColor: "{colors.copia-amarilla}"
    textColor: "{colors.tinta}"
    padding: "32px"
  hoja-registro:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    padding: "24px"
  aviso:
    backgroundColor: "{colors.azul-palido}"
    textColor: "{colors.tinta}"
    padding: "12px"
---

# Design System: Carlos Maldonado · Automatización para pymes

## Overview

**Creative North Star: "El Talonario"**

La página es un formulario de despacho impreso que el visitante rellena: papel blanco, tinta de imprenta, reglas finas y una copia amarilla donde se escribe. El orden y la numeración hacen el trabajo que otras webs le dejan a los efectos. Rechaza la plantilla SaaS y el arreglo por defecto de la categoría (héroe oscuro, números gigantes, zigzag).

El sistema es plano y de alto contraste. Una sola tinta comprometida (azul de imprenta) para acción y foco, un solo acento caliente (rojo de folio) reservado a la numeración y a los errores. Las secciones se leen como filas de formulario: título a la izquierda, cuerpo a la derecha, separadas por una regla.

**Key Characteristics:**
- Papel blanco puro, texto en tinta azul-negra, sin degradados ni sombras.
- Reglas (1px y 2px) en lugar de tarjetas y sombras para separar.
- Grotesca de ancho variable para rótulos y títulos, serif robusta para texto corrido.
- Números siempre tabulares; la numeración en rojo.
- Esquinas casi rectas (2px); el único círculo es el sello RECIBIDO.

## Colors

Paleta de imprenta: blanco, una tinta azul comprometida, un rojo de folio y una copia en amarillo pálido.

### Primary
- **Azul de Imprenta** (#1f3a8a): botón principal, enlaces, foco, rótulo "Ahora", sello RECIBIDO. Hover: **Azul de Imprenta Profundo** (#152b66).

### Secondary
- **Rojo de Folio** (#b0172b): numerales de pasos y de campos, sello EJEMPLO, mensajes de error y borde inferior de campo inválido. Nunca como relleno ni para acciones.

### Tertiary
- **Copia Amarilla** (#fff6d5): superficie del talonario de contacto y destello de la fila nueva en la demo.

### Neutral
- **Papel** (#ffffff): fondo de página y de campos.
- **Tinta** (#16202e): texto y reglas fuertes.
- **Tinta Secundaria** (#4a5363): notas, rótulos, texto de cierre.
- **Azul Pálido** (#e8edf7): encabezado de tabla, burbuja de mensaje, aviso y superficie de las bandas alternas (hero, Qué hago, Qué esperar). Contraste: tinta 13.97:1, tinta secundaria 6.60:1, azul 8.81:1, rojo 5.96:1.
- **Línea de Campo** (#6b7484): borde de campos y de la burbuja, perforación del talonario.
- **Regla Suave** (#c5cbd3): separadores de filas en listas y tablas.
- **Fondo de Error** (#fbe4e7): caja de fallo de envío.

### Banda de marca
- **Azul Noche** (#12255a): fondo a sangre completa de UNA sola sección, el Caso real. Texto blanco 14.60:1; rótulos en **Texto sobre Noche** (#c9d6f5, 10.03:1); reglas en **Regla sobre Noche** (#8fa3d6, 5.83:1). Enlaces e inversión de acción: blanco sobre Noche, foco blanco.

### Named Rules
**The Una Tinta Rule.** El azul de imprenta es el único color de acción; el rojo solo numera y avisa error. Si un elemento nuevo necesita llamar la atención, usa regla o peso, no un tercer color.

**The Superficie Rule.** El color extra viene de superficies, no de acentos: Azul Pálido como banda alterna, Azul Noche como única banda oscura (60% neutros, 30% azul de marca, 10% acción). Ninguna otra sección se tiñe de oscuro.

**The Folio Rule.** El rojo marca numeración (pasos 1-3 de la demo, lista "Cómo trabajo", números de campo del talonario). No se usa como decoración.

## Typography

**Display Font:** Archivo, variable con eje de ancho (con Arial)
**Body Font:** Bitter, variable (con Georgia)

**Character:** Grotesca sobria de imprenta, comprimida en rótulos (font-stretch 75-87%), contra una serif de texto robusta y cálida. Las fuentes se sirven locales con fallbacks de métrica ajustada.

### Hierarchy
- **Display** (700, clamp 2.25-4rem, 1.05, ancho 87%, -0.01em): solo el h1, máx. 18ch.
- **Headline** (700, clamp 1.75-2.25rem, 1.15, ancho 87%): h2 de sección, en la columna izquierda de la fila.
- **Title** (600, 1.25rem, 1.3, Archivo): frase fuerte al inicio de cada fila de lista; subtítulos de ejemplos a 1rem.
- **Body** (400, 1.125rem, 1.6, Bitter): texto corrido, máx. 64ch.
- **Lead** (400, clamp 1.1875-1.375rem, 1.5, Bitter): bajada y párrafo de apertura, máx. 52ch.
- **Label** (600, 0.875rem, 0.06em, mayúsculas, ancho 75%, Archivo): rótulos de campo y de paso dentro de la hoja y del talonario. Notas y ayudas: 400, 0.875rem, 1.5, en tinta secundaria.

### Named Rules
**The Tabular Rule.** Todo número que se lee como dato (tabla, aviso, pasos, folio) usa `font-variant-numeric: tabular-nums`.

**The Rótulo Rule.** El rótulo en mayúsculas es un rótulo de campo dentro de un contenedor de formulario (hoja, talonario, antes/ahora). No va suelto encima de un título.

## Layout

Una columna centrada, máx. 1200px de contenido más margen lateral (20px móvil, 24px desde 768px, 40px desde 1024px). Rejilla de 12 columnas con 24px de gap desde 768px.

Cada sección es una "fila de formulario" (fondo papel, Azul Pálido o Azul Noche a sangre completa según ritmo): regla de 1px arriba, padding vertical 48px (96px desde 1024px), título en columnas 1-3 y cuerpo en 4-12 (4-10 desde 1024px). En móvil se apilan. El hero pasa a dos columnas (texto 1-7, demo 8-12) desde 1024px. Ritmo de espaciado en escala 4/8/12/16/24/32/48/64/96px. Objetivos táctiles mínimos de 44px (botones 52px, campos 48px).

## Elevation & Depth

Plano por completo: no hay sombras en el CSS. La profundidad la dan las reglas (1px tinta, 2px tinta en cabecera y pie, 1px regla suave entre filas), el cambio de superficie (blanco / azul pálido / copia amarilla) y el borde superior perforado (2px dashed) del talonario.

### Named Rules
**The Sin Sombra Rule.** Ningún `box-shadow`, degradado ni blur. Separar con regla o con cambio de superficie.

## Shapes

Recto y de papel: radio de 2px en botones y campos, 0 en hojas, tablas, avisos y talonario. Bordes de 1px en tinta o línea de campo. Campos con borde inferior de 2px (la "línea de escribir"): tinta en reposo, azul en foco, rojo si es inválido. Único círculo: el sello RECIBIDO (96px, borde de 3px azul).

## Components

### Buttons
- **Shape:** casi recto (2px), alto 52px, padding horizontal 28px.
- **Primary:** relleno Azul de Imprenta, texto blanco, Archivo 600 1.125rem; hover Azul Profundo. Ancho completo en móvil, automático desde 768px.
- **Sobre Azul Noche:** el enlace de texto se invierte a blanco subrayado.
- **Texto:** enlace-botón azul subrayado (1px, 2px en hover), alto 44px; sirve para "Ver de nuevo" y enlaces de cierre de sección.
- **Foco:** contorno de 3px azul con 2px de separación en todo elemento interactivo.

### Inputs / Fields
- **Style:** fondo blanco, borde 1px línea de campo y 2px tinta abajo, radio 2px, alto mínimo 48px, padding 12px, texto en Bitter 1.125rem.
- **Etiqueta:** Archivo 600 1rem con numeral rojo delante (1, 2, 3).
- **Focus:** borde inferior pasa a azul, más el contorno de foco.
- **Error:** borde inferior rojo, mensaje en rojo 1rem bajo el campo; caja de fallo con Fondo de Error, borde rojo y título en negrita roja.

### Talonario de contacto (firma)
Contenedor en Copia Amarilla, borde 1px tinta y borde superior 2px perforado, máx. 570px, padding 32px. Cabecera con dos rótulos separados por regla. Al enviar se reemplaza por el sello RECIBIDO, un título y la fecha de recepción.

### Hoja de registro (demo)
Figura con borde 1px tinta, padding 16-24px, cabecera con rótulo y sello EJEMPLO (rojo, borde 1px). Tres pasos numerados en rojo: burbuja de mensaje (azul pálido), tabla de datos (encabezado azul pálido, filas con regla suave, última columna a la derecha) y aviso (azul pálido con borde azul). La animación (opacidad 200-250ms, destello de Copia Amarilla de 1.5s en la fila nueva) la arma solo el script y se omite con `prefers-reduced-motion`; el contenido final está siempre en el HTML.

### Listas regladas
Filas separadas por regla suave de 1px, padding vertical 16px. Variante de ejemplos (160px de rótulo + texto desde 768px) y variante numerada (numeral rojo 1.75rem en columna de 48px).

### Antes / Ahora
Dos celdas separadas por regla de 1px (vertical desde 768px); el rótulo "Ahora" va en azul.

### Navigation
Cabecera pegajosa (sticky) con regla inferior de 2px (suave arriba, tinta al hacer scroll): nombre a la izquierda, enlace "Conversemos" a la derecha (alto 44px, Archivo 600). Un solo destino (#contacto), con solo cuatro apariciones: cabecera, botón del hero, un enlace tras el caso real y el formulario. Pie con regla superior de 2px, texto pequeño, separadores "·" desde 1024px y enlace estático "Volver al inicio ↑". Salto al contenido visible al enfocar.

### Volver al inicio
Botón fijo abajo a la derecha (48x48, azul de imprenta, flecha SVG de trazo 2.5), `aria-label="Volver al inicio"`, ancla a `#inicio`. Aparece con opacidad y 8px de desplazamiento al pasar el primer viewport; en móvil se oculta mientras el botón Enviar está en la franja inferior para no taparlo.

### Movimiento
Reveal por sección (opacidad y 12px, 400ms, una vez), número de paso que pasa de gris a rojo al entrar. Lo arma el script; sin JS o con `prefers-reduced-motion` todo es visible desde el inicio.

## Do's and Don'ts

### Do:
- **Do** separar con reglas (1px tinta, 2px en cabecera/pie, 1px suave entre filas) y con cambios de superficie.
- **Do** reservar el azul (#1f3a8a) para acción, enlace y foco, y el rojo (#b0172b) para numeración y error.
- **Do** usar Archivo para todo lo que se rellena o se rotula y Bitter para lo que se lee.
- **Do** mantener objetivos de 44px o más y el contorno de foco de 3px azul.
- **Do** rotular como ejemplo todo contenido ilustrativo (sello EJEMPLO) y respetar `prefers-reduced-motion`.

### Don't:
- **Don't** usar sombras, degradados, blur, íconos genéricos, fotos de stock ni emoji.
- **Don't** redondear más de 2px, salvo el sello circular.
- **Don't** usar el rojo como relleno, botón o decoración.
- **Don't** poner un rótulo en mayúsculas suelto sobre un título como antetítulo.
- **Don't** mostrar números sin cifras tabulares.
