---
name: Carlos Maldonado · Automatización para pymes
description: Dirección B "Oficio": crema y oliva, Bitter 800 con cursiva oliva, fichas con borde fino, demo del hero con borde de tinta. La planilla que se llena sola sigue siendo la pieza central.
colors:
  crema: "#F4EEDC"
  crema-2: "#EDE6D3"
  hoja: "#FFFDF6"
  tinta: "#1D2316"
  tinta-2: "#4B5340"
  oliva: "#3A4A1F"
  oliva-hover: "#2B3816"
  linea: "#CFC7AE"
  linea-campo: "#80796A"
  salvia: "#E3EAD0"
  arena: "#F0E2C8"
  rosa: "#F1DDD3"
  destello: "#F4EBB8"
  error: "#9A2A1B"
  error-fondo: "#F3DCD6"
  noche: "#26301A"
  noche-texto: "#D9E1C2"
  noche-regla: "#9FB07F"
typography:
  display:
    fontFamily: "Bitter, Bitter Fallback, Georgia, serif"
    fontSize: "clamp(2.75rem, 2rem + 5vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Bitter, Bitter Fallback, Georgia, serif"
    fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.01em"
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
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.04em"
rounded:
  base: "8px"
  chico: "4px"
borders:
  fino: "1px solid {colors.linea}"
  hoja-hero: "2px solid {colors.tinta}"
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
    backgroundColor: "{colors.oliva}"
    textColor: "{colors.crema}"
    rounded: "{rounded.base}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.oliva-hover}"
  ficha:
    backgroundColor: "{colors.crema}"
    border: "{borders.fino}"
    rounded: "{rounded.base}"
  tarjeta-pastel:
    textColor: "{colors.tinta}"
    border: "{borders.fino}"
    rounded: "{rounded.base}"
    padding: "18px 20px"
  hoja-registro:
    backgroundColor: "{colors.hoja}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.base}"
    padding: "24px"
  input-campo:
    backgroundColor: "{colors.hoja}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.base}"
    padding: "12px 16px"
    height: "52px"
---

# Design System: Carlos Maldonado · Automatización para pymes

## Overview

**Creative North Star: "La planilla que se llena sola" (Oficio)**

Una ficha de trabajo bien hecha: crema cálido, titulares serif robustos con un remate en cursiva oliva, bordes finos que ordenan como una planilla y una demo real en lugar de ilustraciones. Calma y confianza, no lujo ni SaaS. Se descarta el azul frío y el blanco puro.

La demo (mensaje, fila nueva, aviso) sigue siendo la pieza central. Cada servicio se presenta como una ficha: etiqueta mono, titular causa → efecto, tres columnas ENTRA POR / QUEDA EN / TE AVISA y la demo debajo.

**Key Characteristics:**
- Crema `#F4EEDC` de base, una banda oliva oscura (Caso real) y bandas crema-2 en hero y contacto. Sin degradados, sombras ni blur.
- Bitter 800 / 700 con la palabra remate en cursiva oliva; Archivo para cuerpo y UI; mono del sistema solo para etiquetas y datos.
- Bordes de 1px en `linea` para tarjetas, ficha, tablas y hojas; **2px en tinta solo en la hoja de demo del hero**. Radio 8px (4px en sellos y chips).
- Un único CTA en toda la página: **Cuéntame tu caso**.

## Colors

### Primary
- **Oliva** (#3A4A1F): botón primario, enlaces, foco, cursiva del titular, estado "Funcionando", numerales. Crema sobre oliva 8.54:1. Hover **Oliva profundo** (#2B3816, 11.08:1).

### Neutral
- **Crema** (#F4EEDC) fondo; **Crema 2** (#EDE6D3) bandas de hero y contacto y encabezados de tabla; **Hoja** (#FFFDF6) superficie de demo, tarjetas y campos.
- **Tinta** (#1D2316; 13.89:1 sobre crema), **Tinta secundaria** (#4B5340; 6.94:1 sobre crema, 6.46:1 sobre crema 2, 6.49:1 sobre salvia).
- **Línea** (#CFC7AE): bordes de 1px (decorativos). **Línea de campo** (#80796A): borde de campos (4.24:1 sobre hoja, ≥3:1 requerido para controles).

### Pasteles (tarjetas de problema y burbuja)
- **Salvia** (#E3EAD0), **Arena** (#F0E2C8), **Rosa** (#F1DDD3). Tinta sobre ellos ≥12:1.

### Estado
- **Destello** (#F4EBB8): solo el destello de la fila nueva y del campo que se llena. No es superficie.
- **Error** (#9A2A1B; 7.58:1 sobre hoja, 5.89:1 sobre error-fondo) y **Fondo de error** (#F3DCD6).

### Banda de marca
- **Noche** (#26301A): fondo de UNA sola sección, el Caso real. Blanco 13.81:1; **Texto sobre noche** (#D9E1C2, 10.2:1); **Regla sobre noche** (#9FB07F, 5.91:1).

### Named Rules
**The Una Tinta Rule.** El oliva es el único color de acción y énfasis; el error es solo error. Un elemento nuevo que pida atención usa peso o escala, no un tercer color.

**The Superficie Rule.** El color extra viene de superficies (crema 2, noche, pasteles), nunca de acentos nuevos.

## Typography

**Titulares:** Bitter variable (con Georgia), 800 en el h1 y 700 en los h2, cursiva oliva en la palabra remate (*sola*). **Cuerpo y UI:** Archivo variable (con Arial). **Etiquetas y datos:** mono del sistema (`ui-monospace`, sin fuente descargada).

### Hierarchy
- **Display** (Bitter 800, clamp 2.75-5rem, 1.02): solo el h1, máx. 16ch (80px a 1440).
- **Headline** (Bitter 700, clamp 2-3.25rem, 1.08): h2 de sección.
- **Title** (Archivo 600, 1.25rem): h3 de pasos y bloques.
- **Body** (400, 1.0625rem, 1.6) y **Lead** (clamp 1.1875-1.375rem).
- **Label** (mono 500, 0.8125rem, mayúsculas, 0.04em): `01 · REGISTROS`, ENTRA POR / QUEDA EN / TE AVISA, rótulos de paso de la demo, EJEMPLO. Solo para datos y fichas; los títulos y botones van en mayúscula normal.

### Named Rules
**The Tabular Rule.** Todo número que se lee como dato usa cifras tabulares.

**The Remate Rule.** Una sola palabra en cursiva oliva por titular y solo donde cierra la idea (*sola*). No se usa en h3.

## Layout

Una columna centrada, máx. 1200px más margen lateral (20/24/40px). Orden de la página:
1. **Hero** (crema 2, hero partido): etiqueta mono, h1, subtítulo, CTA y "Mira cómo funciona" a la izquierda (columnas 1-6); ilustración de línea fina a la derecha (7-12), con grilla de puntos muy tenue detrás (solo ahí). En 375 la ilustración va en vertical, debajo del CTA.
2. **Problema**: la frase y tres tarjetas pastel (salvia, arena, rosa).
3. **Qué dejo andando solo**: pestañas 01-04 con estado y panel con ficha, escena y nota de honestidad. La única demo concreta (tabla) vive en 01 · Registros.
4. **Caso real** (noche): eje horario Antes / Ahora, con espacio reservado para un dato (TODO).
5. **Principios**: tres columnas con regla superior de 1px.
6. **Cómo trabajo + Qué no hago**: cuatro pasos Yo hago / Tú haces.
7. **Quién soy**: texto y cuatro datos en fila, sin foto.
8. **Preguntas**: seis, siempre visibles.
9. **Contacto** (crema 2): texto y formulario en tarjeta hoja.

Padding vertical 48px (96px desde 1024px).

## Elevation & Depth

Plano: ningún `box-shadow`, degradado ni blur. La profundidad la dan la superficie y los bordes.

## Shapes

Radio 8px en botones, campos, tarjetas, hojas y fichas; 4px en sellos EJEMPLO y chips; 0 en tablas. Sin círculos. Sin `border-left/right` ≥3px.

## Components

### Buttons
- **Primario:** oliva, texto crema, 52px (56px el de enviar, ancho completo), radio 8px, Archivo 600. Hover oliva profundo, active `translateY(1px)`. El texto es siempre "Cuéntame tu caso".
- **Primario claro:** crema con texto noche, solo sobre la banda noche.
- **Texto:** oliva subrayado, 44px ("Mira cómo funciona", "Pausar/Reanudar").
- **Foco:** contorno 3px oliva con 2px de separación en todo.
- **Cabecera:** el botón aparece solo cuando el CTA del hero sale de pantalla.

### Ficha de servicio
Caja con borde 1px línea y radio 8px, tres columnas desde 768px separadas por reglas de 1px (ENTRA POR / QUEDA EN / TE AVISA); apiladas en móvil. Etiqueta mono arriba, dato en Archivo 500 abajo.

### Tarjetas pastel
Tres tarjetas (salvia, arena, rosa) con borde 1px línea y texto de 1.0625rem 500. Una columna en móvil, tres desde 768px.

### Formulario
Tarjeta hoja, borde 1px línea, radio 8px, sobre crema 2. Etiquetas arriba (Archivo 600), campos de 52px con borde 1.5px línea de campo y radio 8px; hover borde tinta; foco borde oliva más contorno 3px; inválido borde error con mensaje debajo. Fallo: caja error con el correo de respaldo; el mensaje escrito no se borra. Éxito: título personalizado, mini-planilla con la fila "Recibido" y los tres pasos siguientes. Valores insertados siempre con `textContent`.

### Demo (hoja de la planilla)
Hoja `#FFFDF6` con borde 1px línea, solo en las escenas de servicios (01 · Registros es la demo concreta). Rótulos mono, burbuja salvia, tabla de máximo 3 filas con un solo dato destacado, aviso con borde oliva. Rotulada EJEMPLO; la nota de datos inventados va una vez por sección.

### Ilustración del hero
SVG propio de línea fina en una sola tinta (oliva, trazo 1.75px, conexiones punteadas): Telegram, WhatsApp y Correo (cajas salvia, arena y rosa, con el nombre debajo) llegan a la planilla de Google (hoja, borde 2.25px, una celda resaltada) y de ahí a Resumen y Aviso. Íconos genéricos de trazo, no logos de marca a color; n8n no aparece en el hero. Horizontal desde 768px, vertical en móvil. Los nombres llevan un contorno del color del fondo para no chocar con los puntos.

### Grilla de puntos
Solo CSS (`radial-gradient`, puntos de oliva al 16%, paso de 22px), solo detrás de la ilustración del hero y difuminada en los bordes con una máscara. Texto secundario sobre el punto más oscuro: 5.2:1. El resto de la página no lleva fondo decorativo.

### Movimiento
Se mantiene: demo del hero en bucle (arranca en el estado final), servicios en rotación con barra de 9 s, reloj del Caso real (`DUR_CASO`, `ESPERA_CASO`) y botón volver arriba. Todo se pausa o queda estático con `prefers-reduced-motion`. La Fase 5 revisa cuáles se quedan.

## Do's and Don'ts

### Do:
- **Do** un solo CTA ("Cuéntame tu caso") y un solo remate en cursiva por titular.
- **Do** rotular como EJEMPLO todo lo ilustrativo y no inventar cifras, logos ni clientes.
- **Do** mantener objetivos de 44px y contorno de foco de 3px; bordes de campo ≥3:1.

### Don't:
- **Don't** usar sombras, degradados, blur, emoji ni glassmorphism; el único fondo decorativo es la grilla de puntos del hero.
- **Don't** usar azul frío ni blanco puro.
- **Don't** usar el color de error como relleno o acción.
- **Don't** mostrar números sin cifras tabulares.
- **Don't** usar "pega" en titulares, etiquetas ni botones.
