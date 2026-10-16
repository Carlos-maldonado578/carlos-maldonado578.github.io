---
name: Carlos Maldonado · Automatización para pymes
description: Dirección B "Oficio": crema y oliva, Bitter 800 con cursiva oliva, bordes finos y una ilustración de línea fina en el hero. El caso real (Antes / Ahora) es la única prueba visual.
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

Una ficha de trabajo bien hecha: crema cálido, titulares serif robustos con un remate en cursiva oliva, bordes finos que ordenan como una planilla y una ilustración de línea fina en vez de capturas o demos. Calma y confianza, no lujo ni SaaS. Se descarta el azul frío y el blanco puro.

La prueba es una sola: el caso real, con su eje horario Antes / Ahora. El resto explica con texto corto y sin demos que compitan con él.

**Key Characteristics:**
- Crema `#F4EEDC` de base, crema 2 en hero y contacto y salvia suave (`#E3EAD0`) en el caso real. Sin degradados, sombras ni blur.
- Bitter 800 / 700 con la palabra remate en cursiva oliva; Archivo para cuerpo y UI; mono del sistema solo para etiquetas y datos.
- Bordes de 1px en `linea`; radio 8px (4px en sellos y chips).
- Un único CTA en toda la página: **Cuéntame tu caso**.
- El único fondo decorativo es la grilla de puntos tras la ilustración del hero.

## Colors

### Primary
- **Oliva** (#3A4A1F): botón primario, enlaces, foco, cursiva del titular, estado "Funcionando", numerales. Crema sobre oliva 8.54:1. Hover **Oliva profundo** (#2B3816, 11.08:1).

### Neutral
- **Crema** (#F4EEDC) fondo; **Crema 2** (#EDE6D3) bandas de hero y contacto y encabezados de tabla; **Hoja** (#FFFDF6) superficie de demo, tarjetas y campos.
- **Tinta** (#1D2316; 13.89:1 sobre crema), **Tinta secundaria** (#4B5340; 6.94:1 sobre crema, 6.46:1 sobre crema 2, 6.49:1 sobre salvia).
- **Línea** (#CFC7AE): bordes de 1px (decorativos). **Línea de campo** (#80796A): borde de campos (4.24:1 sobre hoja, ≥3:1 requerido para controles).

### Pasteles (cajas de la ilustración)
- **Salvia**, **Arena** (#F0E2C8) y **Rosa** (#F1DDD3). Tinta sobre ellos ≥12:1.

### Estado
- **Destello** (#F4EBB8): solo el destello de la fila de confirmación del formulario y el aviso del caso. No es superficie.
- **Error** (#9A2A1B; 7.58:1 sobre hoja, 5.89:1 sobre error-fondo) y **Fondo de error** (#F3DCD6).

### Superficie del caso real
- **Salvia** (#E3EAD0): fondo de UNA sección, el Caso real. Tinta 12.99:1, tinta secundaria 6.49:1, oliva 7.78:1. Antes va en gris delgado (`#80796A`, 3.49:1 para gráficos) y Ahora en oliva grueso.

### Named Rules
**The Una Tinta Rule.** El oliva es el único color de acción y énfasis; el error es solo error. Un elemento nuevo que pida atención usa peso o escala, no un tercer color.

**The Superficie Rule.** El color extra viene de superficies (crema 2, salvia, pasteles), nunca de acentos nuevos.

## Typography

**Titulares:** Bitter variable (con Georgia), 800 en el h1 y 700 en los h2, cursiva oliva en la palabra remate (*sola*). **Cuerpo y UI:** Archivo variable (con Arial). **Etiquetas y datos:** mono del sistema (`ui-monospace`, sin fuente descargada).

### Hierarchy
- **Display** (Bitter 800, clamp 2.75-5rem, 1.02): solo el h1, máx. 16ch (80px a 1440).
- **Headline** (Bitter 700, clamp 2-3.25rem, 1.08): h2 de sección.
- **Title** (Archivo 600, 1.25rem): h3 de pasos y bloques.
- **Body** (400, 1.0625rem, 1.6) y **Lead** (clamp 1.1875-1.375rem).
- **Label** (mono 500, 0.8125rem, mayúsculas, 0.04em): etiqueta del hero, números y estados de las filas de servicio y chips. Solo para datos; los títulos y botones van en mayúscula normal.

### Named Rules
**The Tabular Rule.** Todo número que se lee como dato usa cifras tabulares.

**The Remate Rule.** Una sola palabra en cursiva oliva por titular y solo donde cierra la idea (*sola*). No se usa en h3.

## Layout

Una columna centrada, máx. 1200px más margen lateral (20/24/40px). Orden de la página:
1. **Hero** (crema 2, hero partido): etiqueta mono, h1, subtítulo, CTA y "Mira cómo funciona" (baja al caso) a la izquierda; ilustración de línea fina a la derecha con grilla de puntos tenue detrás. En 375 la ilustración va en vertical, debajo del CTA.
2. **Problema**: la frase y una línea de ejemplos, sin tarjetas.
3. **Caso real** (salvia, con el chip "Cliente real, datos anonimizados"): eje horario 08:00-20:00 con Antes (línea gris delgada) y Ahora (barra oliva gruesa); en móvil, dos listas apiladas con la hora a la izquierda. Bajo el eje, la línea "Armado con…" que traduce n8n. Espacio reservado para un dato real (`.caso-datos`).
4. **Servicios**: "Lo mismo, para tus pedidos, avisos y boletas": tres filas (Pedidos, Avisos, Boletas y facturas) con estado "Lo construyo para ti" y una nota de honestidad. Sin demos.
5. **Cómo trabajo + Qué no hago**: cuatro pasos Yo hago / Tú haces (paso 3 incluye "Tú decides: apruebas lo importante, como las boletas"; paso 4, la mensualidad).
6. **Quién soy**: párrafo, sin foto ni cajas.
7. **Preguntas**: cinco, siempre visibles.
8. **Contacto** (crema 2): texto y formulario en tarjeta.

Padding vertical 40px arriba y 48px abajo (80px y 96px desde 1024px).

## Elevation & Depth

Plano: ningún `box-shadow`, degradado ni blur. La profundidad la dan la superficie y los bordes.

## Shapes

Radio 8px en botones, campos y tarjetas; 4px en chips; 0 en tablas. Sin círculos. Sin `border-left/right` ≥3px.

## Components

### Buttons
- **Primario:** oliva, texto crema, 52px (56px el de enviar, ancho completo), radio 8px, Archivo 600. Hover oliva profundo, active `translateY(1px)`. El texto es siempre "Cuéntame tu caso".
- **Sin variante clara: el botón del caso es el primario.
- **Texto:** oliva subrayado, 44px ("Mira cómo funciona", "Pausar/Reanudar").
- **Foco:** contorno 3px oliva con 2px de separación en todo.
- **Cabecera:** el botón aparece solo cuando el CTA del hero sale de pantalla.

### Filas de servicio
Lista con regla superior e inferior de 1px por fila: número mono, nombre (Archivo 700), una línea de resultado y el estado en mono ("Lo construyo para ti"). En 375, una columna; desde 768px, cuatro columnas alineadas por la línea base.

### Formulario
Tarjeta hoja (`#FFFDF6`), borde 1px línea, radio 8px, sobre crema 2. Etiquetas arriba (Archivo 600), campos de 52px con borde 1.5px línea de campo y radio 8px; hover borde tinta; foco borde oliva más contorno 3px; inválido borde error con mensaje debajo. Fallo: caja error con el correo de respaldo; el mensaje escrito no se borra. Éxito: título personalizado, mini-planilla con la fila "Recibido" y los tres pasos siguientes. Valores insertados siempre con `textContent`.

### Ilustración del hero
SVG propio de línea fina en una sola tinta (oliva, trazo 1.75px, conexiones punteadas): Telegram, Formulario y Correo (cajas salvia, arena y rosa, con el nombre debajo) llegan a la planilla de Google (hoja, borde 2.25px, una celda resaltada) y de ahí a Resumen y Aviso. Íconos genéricos de trazo, no logos de marca a color; n8n no aparece en el hero. Horizontal desde 768px, vertical en móvil. Los nombres llevan un contorno del color del fondo para no chocar con los puntos.

### Grilla de puntos
Solo CSS (`radial-gradient`, puntos de oliva al 16%, paso de 22px), solo detrás de la ilustración del hero y difuminada en los bordes con una máscara. Texto secundario sobre el punto más oscuro: 5.2:1. El resto de la página no lleva fondo decorativo.

### Movimiento
Solo el reloj del Caso real en escritorio (`DUR_CASO`, `ESPERA_CASO` en `main.js`): al entrar en pantalla recorre 08:00-20:00 una vez; los hitos aparecen al ser alcanzados, hay botón de pausa de 44px y, con `prefers-reduced-motion`, sin JS o en móvil, queda el estado final estático. La cabecera muestra su botón al salir del CTA del hero. Nada más se mueve solo. La Fase 5 revisa si algo suma.

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
