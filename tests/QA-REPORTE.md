# QA-REPORTE: landing (rama `rediseno-talonario`)

Fecha: 2026-10-15 (segunda ronda, tras aplicar P0 y P1 de la crítica `critique-opus-2.md`). Navegador: Microsoft Edge (`channel: 'msedge'`), Playwright en Windows 11. Build de producción servido en :4173.

## Resultado

**119 pasaron, 0 fallaron, 9 omitidos** (128 casos: desktop y móvil; los omitidos aplican a un solo proyecto, por ejemplo eje horizontal solo en desktop, eje vertical solo en móvil, 44px solo en móvil). Dos corridas completas seguidas idénticas, sin tests inestables, con las capturas base nuevas. Ya no hay ningún `test.fail()`.

Primera ronda (antes de los cambios): 94 pasaron, 0 fallaron, 6 omitidos, con 1 `test.fail()` (B1).

Detalle por área (todo en verde):

- Carga/SEO: un solo h1, `lang="es-CL"`, title/description, consola limpia, solo localhost, fuentes cargadas.
- Sin scroll horizontal a 390, 768, 1024, 1280 y 1440.
- axe wcag2a/2aa/21aa: 0 violaciones en estado inicial, con errores de formulario y en cada pestaña (estado final).
- Teclado: "saltar" funciona, Tab alcanza todo lo interactivo (incluidas las 4 preguntas), outline ≥2px.
- Elige tu pega: roles ARIA, flechas/Inicio/Fin, clic, **el hover ya no cambia de pestaña**, **Pausar queda bajo la lista (≤24px de la última regla)**, herramientas reales bajo cada pega, Pausar/Reanudar, una sola vuelta, alto estable, nombre en una línea.
- Nuevo (`mejoras.spec.ts`): FAQ con `<details>` (Enter/Espacio abren y cierran, sin cifras de precio); bloque "Quién soy" (3 líneas, sin `<img>` en la página); eje del caso (posiciones proporcionales a ±2px, orden de lectura, Antes vacío hasta ~79%, Ahora desde ≤3%, sin textos superpuestos; vertical y sin scroll horizontal en móvil); las 5 horas en orden para lector de pantalla; "Qué pasa después de enviar" (3 pasos bajo el botón, `mailto`, precio última promesa); carriles Yo hago/Tú haces y 4 límites en "Qué no hago"; 3 cortes de fondo; la tabla de la demo nunca carga vacía; volver arriba sin transición con `prefers-reduced-motion`.
- Formulario: validación, JSON exacto `{nombre, contacto, mensaje, hp, t}`, XSS neutralizado, 500 y timeout con respaldo, variable vacía falla sin POST y sin éxito (contrato intacto).
- Regresión visual: 20 capturas base (10 por proyecto), regeneradas tras revisar cada cambio visual. Nuevas: Cómo trabajo, preguntas y Quién soy.

## Bugs cerrados

- **B1 (media), cerrado.** El hover pisaba al teclado en "Elige tu pega". Se quitó la selección por hover (solo clic o teclado). El test `test.fail()` pasó a dos tests normales: el hover no cambia la pestaña y el teclado ya no es pisado.
- **B2 (baja), cerrado.** Volver arriba se desvanecía 250 ms con movimiento reducido: ahora `transition: none` bajo `prefers-reduced-motion: reduce`, con test.
- Hallazgo nuevo corregido en el sitio: con "Pausar" bajo la lista, en móvil la sección "Elige tu pega" (≈1650px) quedaba por debajo del 40% de visibilidad al pulsar el botón y la animación no se reanudaba (`pausado` pegado). El observador ahora acepta "al menos un tercio de la pantalla" cuando la sección es más alta que la pantalla.

## Pendiente / observaciones

- B3 (info, falso positivo de axe en plena animación de "Pedidos" y "Registros"): sin cambios; en estado final hay 0 violaciones.
- Contraste: no se añadieron colores nuevos. Los pares usados son los medidos: tinta sobre blanco, azul (#1f3a8a) sobre azul pálido 8.81:1, blanco 14.60:1 y texto sobre noche 10.03:1, regla sobre noche 5.83:1.
- Los textos nuevos (quién soy, plazos, duraciones, respuestas de la FAQ, límites de "Qué no hago", herramientas) son redacción provisional con `TODO(Carlos)`: los tests solo verifican estructura, no la verdad del texto.
- No cubierto: otros navegadores, dispositivos reales, lector de pantalla real (conviene probar las preguntas y las pestañas con NVDA/VoiceOver), webhook real de n8n, rendimiento.

## Recomendaciones
1. Que Carlos confirme o ajuste los `TODO(Carlos)` antes de publicar.
2. Correr `npm run test:e2e` antes de cada merge; regenerar capturas con `npm run test:e2e:update` solo tras revisar los cambios visuales. Tarda ~2 minutos.
3. Probar el webhook real de n8n en staging (hp y t del lado servidor).
4. En CI, instalar el navegador con `npx playwright install --with-deps chromium` y regenerar las capturas en ese mismo entorno (las actuales son de Edge/Windows).
