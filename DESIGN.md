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
    fontSize: "clamp(2.25rem, 1.5rem + 2.8vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Archivo, Archivo Fallback, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)"
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

**Creative North Star: "La planilla que se llena sola"**

La página muestra la planilla funcionando en vez de parecerse a un documento. La demo (mensaje, fila nueva, aviso) es la pieza central y cada sección muestra un objeto distinto (frase, tarjetas con miniatura, línea de tiempo, dos días comparados, formulario) en vez de repetir una lista con reglas. Rechaza la plantilla SaaS (degradados, sombras, íconos, números gigantes) y también el aire de CV (rótulo a la izquierda, texto a la derecha).

Una sola tinta comprometida (azul de imprenta) para acción y foco; rojo solo para numeración, sello EJEMPLO y errores; amarillo solo como destello de la fila nueva. El carácter viene de la escala, los radios de 10-12px y la planilla real, no de efectos.

**Key Characteristics:**
- Papel blanco, azul pálido y UNA banda azul noche; sin degradados, sombras ni blur.
- Títulos arriba y a ancho completo; cada sección con una composición propia.
- Archivo para todo el cuerpo y la UI; Bitter solo en frases grandes.
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
- **Azul Pálido** (#e8edf7): bandas alternas (hero, Qué puedo, Conversemos), encabezado de tabla, burbuja, aviso, miniaturas. Tinta 13.97:1, azul 8.81:1.
- **Línea de Campo** (#6b7484): borde de campos (1.5px; 4.71:1 sobre blanco) y de chips.
- **Regla Suave** (#c5cbd3): borde 1px de tarjetas, filas de tablas, cabecera y pie (decorativo).
- **Fondo de Error** (#fbe4e7): caja de fallo (rojo sobre él 5.78:1).

### Banda de marca
- **Azul Noche** (#12255a): fondo de UNA sola sección, el Caso real. Blanco 14.60:1; **Texto sobre Noche** (#c9d6f5, 10.03:1); **Regla sobre Noche** (#8fa3d6, 5.83:1).

### Named Rules
**The Una Tinta Rule.** El azul es el único color de acción; el rojo numera y avisa error. Un elemento nuevo que pida atención usa peso o escala, no un tercer color.

**The Superficie Rule.** El color extra viene de superficies: azul pálido en bandas alternas, azul noche en una sola. Ninguna otra sección se oscurece.

## Typography

**Cuerpo y UI:** Archivo variable (con Arial). **Frases grandes:** Bitter variable (con Georgia), solo en la frase del problema y la frase de cierre de Cómo trabajo.

### Hierarchy
- **Display** (700, clamp 2.25-3.5rem, 1.05, ancho 87%): solo el h1, máx. 16ch.
- **Headline** (700, clamp 2-3.25rem, 1.1, ancho 87%): h2 arriba y a ancho completo, máx. 22ch.
- **Frase** (Bitter 700, clamp 2-3.25rem, 1.15): el h2 del problema, máx. 24ch. Frase chica: clamp 1.5-2rem.
- **Title** (600, 1.25rem): h3 de tarjetas y pasos.
- **Body** (400, 1.0625rem, 1.6) y **Lead** (clamp 1.1875-1.375rem).
- **Label** (600, 0.875rem, mayúsculas, ancho 75%): solo dentro de la demo (rótulos de paso, EJEMPLO). Notas y ayudas: 0.9375rem en tinta secundaria.

### Named Rules
**The Tabular Rule.** Todo número que se lee como dato usa cifras tabulares.

**The Rótulo Rule.** Mayúsculas comprimidas solo dentro de la demo; en el resto, etiquetas y títulos en mayúscula normal.

## Layout

Una columna centrada, máx. 1200px más margen lateral (20/24/40px). Sin retícula título-izquierda/texto-derecha. Composición por sección:
- **Hero** (azul pálido): texto en columnas 1-5, demo en 6-12 (~690px a 1440) desde 1024px.
- **Problema** (blanco): una frase grande y dos párrafos.
- **Qué puedo dejar andando solo** (azul pálido): 4 tarjetas planas en 2x2 (1 columna en móvil).
- **Cómo trabajo** (blanco): línea de tiempo de 4 hitos en fila desde 1024px; vertical con línea de 2px a la izquierda en móvil.
- **Caso real** (azul noche): dos líneas de tiempo del mismo día, Antes y Ahora, con horas aproximadas.
- **Conversemos** (azul pálido): promesas en columnas 1-5, formulario en tarjeta en 6-12.

Padding vertical 48px (96px desde 1024px). Sin reglas entre secciones: cambian las superficies.

## Elevation & Depth

Plano: ningún `box-shadow`, degradado ni blur. La profundidad la dan el cambio de superficie y bordes de 1px.

## Shapes

Radio 10px en botones, campos, burbuja, aviso, chips y miniaturas; 12px en tarjetas y hoja de la demo; 6px en el sello EJEMPLO; 0 en tablas. Sin círculos. Sin `border-left/right` ≥3px.

## Components

### Buttons
- **Primario:** azul de imprenta, texto blanco, 52px (56px el de enviar, ancho completo; 44px el de la cabecera "Conversemos"), radio 10px, Archivo 600. Hover profundo, active `translateY(1px)`.
- **Texto:** azul subrayado, 44px ("Pausar/Reanudar", enlaces de cierre).
- **Foco:** contorno 3px azul con 2px de separación en todo.

### Formulario (tarjeta blanca)
Tarjeta blanca, borde 1px regla suave, radio 12px, padding 32px (20px móvil), sobre azul pálido. Orden: mensaje (textarea que crece sola con `field-sizing`, sin tirador), nombre y contacto en dos columnas desde 768px, botón "Enviar mensaje" a ancho completo y plazo de respuesta debajo. Etiquetas arriba (Archivo 600, 1rem, sin números), ayuda entre etiqueta y campo. Campos de 52px, borde 1.5px Línea de Campo, radio 10px, texto 1.0625rem. Hover: borde tinta. Foco: borde azul + contorno 3px. Inválido: borde rojo y mensaje "Falta:/Revisa:" debajo. Fallo: caja de error con correo de respaldo; el botón pasa a "Reintentar". Éxito: título personalizado y mini-planilla (Hora, Quién, Estado "Recibido") con la fila del propio mensaje y destello; valores insertados con `textContent`.

### Demo (hoja de la planilla)
Figura blanca, radio 12px, con sello EJEMPLO. Tres pasos numerados en rojo unidos por un trazo fino: burbuja de mensaje (1.25rem), tabla de 5 filas con columna Estado, aviso. En bucle de tres mensajes (cada uno suma su fila con destello de 1s y al final aparece el aviso), con botón visible Pausar/Reanudar. Con `prefers-reduced-motion` o sin JS se ve el estado final completo y estático.

### Tarjetas de "Qué puedo"
Borde 1px, radio 12px, miniatura hecha con los componentes de la demo (fila, chips, aviso, línea de detalle; todas con EJEMPLO), marca de estado, nombre y frase. Solo Registros dice "Ya funcionando en un cliente"; las otras "Lo puedo armar".

### Navigation
Cabecera sticky con borde inferior 1px: nombre a la izquierda y botón pequeño "Conversemos". Pie de una línea: nombre, correo, Volver al inicio. Botón fijo volver arriba (48px, radio 10px).

### Movimiento
Solo la demo en bucle (opacidad 250ms y destello 1s) y el botón volver arriba. No hay aparición por sección.

## Do's and Don'ts

### Do:
- **Do** dar a cada sección una composición propia y títulos arriba a ancho completo.
- **Do** reservar azul para acción y foco, rojo para numeración, EJEMPLO y error.
- **Do** rotular como EJEMPLO todo lo ilustrativo y no inventar cifras, logos ni clientes.
- **Do** mantener objetivos de 44px o más y contorno de foco de 3px; bordes de campo ≥3:1.

### Don't:
- **Don't** usar sombras, degradados, blur, íconos genéricos, emoji ni glassmorphism.
- **Don't** volver a la retícula rótulo izquierda/texto derecha ni al papel calco (copia amarilla, sello RECIBIDO, etiquetas numeradas).
- **Don't** usar rojo como relleno o acción, ni amarillo como superficie.
- **Don't** mostrar números sin cifras tabulares.
