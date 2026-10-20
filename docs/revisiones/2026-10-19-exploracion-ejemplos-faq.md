# Exploración: ejemplos y FAQ — 2026-10-19

Pedido de Carlos:
1. La zona de ejemplos (caso real verde grande + "Lo mismo sirve para…" con Pedidos y Stock) se lee como dos bloques sueltos. Explorar formas mejores de mostrarla.
2. "Antes de escribirme" se ve alejada del resto del diseño: lista plana, nada invita a leerla.

Esto es **exploración, no implementación**. No se toca `src/pages/index.astro` hasta que Carlos elija.

## Cómo
- Usa la skill `prototype` dos veces (una pieza por corrida):
  - `/prototypes/ejemplos` → zona de ejemplos completa (caso real + Pedidos + Stock).
  - `/prototypes/faq` → sección "Antes de escribirme".
- Rutas aisladas en el dev server de Astro; nada de producción las importa. Mismos tokens de DESIGN.md.
- Antes de construir, pasa `cro` y `copywriting` sobre la zona y la FAQ: si proponen cambios de texto, aplícalos dentro de las variantes (no en producción) y anótalos abajo.
- Reglas de PRODUCT.md siguen vigentes: caso real sin cifras inventadas que parezcan reales del cliente, ejemplos rotulados "Ejemplo", sin íconos genéricos, sin emoji, sin precios.
- Cada variante funciona a 375 y 1440, con `prefers-reduced-motion`.

## Variantes: ejemplos

1. **Una sola historia** (eje: estructura). Caso real y ejemplos en el mismo bloque verde. Arriba el caso real grande con su Antes/Ahora; abajo, dentro del mismo bloque y separados por un filete, Pedidos y Stock como mini Antes/Ahora de una línea cada uno ("Antes: te preguntan por WhatsApp en qué va el pedido · Ahora: lo ven en la planilla"). Rótulos distintos: "Cliente real" vs "Así se vería en tu negocio".
2. **Un escenario, tres casos** (eje: interacción). Un solo escenario con pestañas: Producción (caso real, por defecto) · Pedidos · Stock. La misma línea de tiempo Antes/Ahora cambia de contenido. Pestañas accesibles (roles ARIA, teclado). Ahorra alto de página.
3. **Lo que te llega al celular** (eje: punto de vista). Cada caso se cuenta por el mensaje que recibe el dueño: burbujas tipo Telegram dibujadas con los tokens (sin marco de teléfono ni logos). Caso real: el resumen del día; Pedidos: "Pedido 45 despachado"; Stock: "Te quedan 3 sacos de harina". Bajo cada mensaje, una línea de qué pasó por detrás. El caso real sigue destacado y con su rótulo.

## Variantes: FAQ

1. **Conversación** (eje: personalidad). Preguntas como mensajes del cliente (izquierda, `hoja`) y respuestas como respuestas de Carlos (derecha, `salvia`), en primera persona. Discreto: sin avatares, sin "visto", sin animación de escritura.
2. **Acordeón en ficha** (eje: densidad). Todo dentro de una tarjeta `hoja` con preguntas numeradas 01–06 en `label`, `<details>/<summary>` nativo, la primera abierta. Columna izquierda con una nota corta firmada ("¿Tu duda no está? Escríbeme").
3. **Respuestas que tranquilizan** (eje: jerarquía). Las dos objeciones grandes (¿Cuánto cuesta? / ¿De quién son los datos?) como tarjetas destacadas con titular corto ("Sabes el valor antes de empezar", "La planilla es tuya") y la respuesta debajo; las otras cuatro como lista compacta.

## Entrega
- Tabla de la skill (variante, eje, cuándo conviene, costo) para cada corrida.
- Capturas de cada variante a 375 y 1440 en `design/fase5/exploracion/`.
- Pasar `revisor-landing` sobre las variantes (solo bloqueantes: accesibilidad, desbordes, reglas de marca).
- Detenerse: Carlos elige (o pide mezclas) en el chat de revisión. Luego viene un archivo nuevo para implementar.

## Notas de cro / copywriting
Diagnóstico de copywriting: **B** (hay voz propia de Carlos; se conserva y solo se ajusta lo que estorba). Pasadas `cro` y `copywriting` sobre la zona de ejemplos y la FAQ. Los cambios de texto viven solo en las variantes; producción y `copy.md` no se tocan hasta que Carlos elija.

**Ejemplos (cro)**
- El caso real es la única prueba social de la página: debe quedar primero y más grande que los ejemplos. Las tres variantes lo respetan.
- Hoy el rótulo "Ejemplo" no dice qué ejemplo es. Propuesta en las variantes: **"Así se vería en tu negocio"** (responde "¿me sirve a mí?", la objeción que más pesa). En V2 se usa "Ejemplo: así se vería en tu negocio" porque el chip comparte lugar con "Cliente real, datos anonimizados".
- "Lo mismo sirve para…" cierra con puntos suspensivos y no promete nada; se reemplaza por el rótulo de arriba y las tarjetas pasan a Antes/Ahora (V1) o a mensajes (V3), que es el mismo patrón del caso real. Es lo que hace que no se lea como un bloque suelto.
- CTA: sigue uno solo, "Cuéntame tu caso", al final del bloque (regla de `copy.md`).

**Ejemplos (copywriting)**
- Pedidos Antes/Ahora: "Te preguntan por WhatsApp en qué va el pedido." → "Lo ves en la planilla, con su estado." Una imagen concreta, falsable, sin adjetivos.
- Stock: "Te enteras de que falta harina cuando ya no queda." → "Te avisan cuando quedan 3 sacos." Las cifras (3 sacos, pedido 45, 2 sacos) son de ejemplo y van bajo el rótulo; el caso real no suma cifras nuevas (se reusa "120 cajas", que ya estaba).
- V3: cada mensaje lleva "Aviso automático" y, debajo, "Por detrás: …" en una línea. Sin marco de teléfono ni logos.
- Sin tics de IA: sin "no X, no Y", sin revelaciones con dos puntos, sin signos de exclamación.

**FAQ (cro)**
- El orden aprobado (precio y datos primero) ya sigue la jerarquía de objeciones: se mantiene. V3 las vuelve tarjetas porque son las dos que bloquean el contacto.
- Cierre de la FAQ con el enlace "¿Tu duda no está? Escríbeme" → `#contacto` en las tres variantes (en V2 va firmado, con plazo de 1 día hábil).

**FAQ (copywriting)**
- Respuestas intactas (ya están en primera persona y cortas). Único texto nuevo: los titulares de V3, **"Sabes el valor antes de empezar"** y **"La planilla es tuya"**, que dicen el beneficio en vez de repetir la pregunta. En esas tarjetas la respuesta repite parte del titular; si Carlos elige V3, conviene acortar la respuesta a lo que el titular no dice.
- V2 firma la nota con "Carlos" (en `translate="no"`).

## Resultado
**Commit:** "Exploración Fase 5: variantes de ejemplos y FAQ" (rama `conversion-v2`). Es exploración: `src/pages/index.astro` y `global.css` sin cambios.

**Dónde verlas** (dev server `npm run dev`, selector flotante abajo; teclas 1-3, flechas, R): `/prototypes/ejemplos` y `/prototypes/faq`. Código en `src/prototypes/` y `src/pages/prototypes/`; nada de producción lo importa y en el build esas rutas salen como 404. Capturas a 375 y 1440 en `design/fase5/exploracion/` (`npm`: `node scripts/capturas-exploracion.mjs`, también revisa consola y desborde: sin errores).

**Ejemplos**

| # | Variante | Eje | Cuándo conviene | Costo |
|---|---|---|---|---|
| 1 | Una sola historia | Estructura | Se quiere que todo se lea como un solo argumento, sin interacción | Bloque verde más alto; los ejemplos quedan como texto, sin la línea de tiempo |
| 2 | Un escenario, tres casos | Interacción | Se quiere ahorrar alto de página y mostrar el mismo patrón en tres casos | Los ejemplos quedan tras un clic; en móvil las pestañas son un control más |
| 3 | Lo que te llega al celular | Punto de vista | Se quiere que el visitante se imagine recibiendo el aviso | Pierde la línea de tiempo en los ejemplos; la burbuja del caso real es más chica que el título |

**FAQ**

| # | Variante | Eje | Cuándo conviene | Costo |
|---|---|---|---|---|
| 1 | Conversación | Personalidad | Dar cercanía y diferenciarse de una FAQ de plantilla | Ocupa más alto; tono informal que hay que sostener |
| 2 | Acordeón en ficha | Densidad | Sección compacta, con nota firmada | Las respuestas quedan cerradas; la más importante solo se ve si se abre |
| 3 | Respuestas que tranquilizan | Jerarquía | Las dos objeciones que bloquean el contacto (precio, datos) deben leerse sí o sí | Titular y respuesta se repiten en las tarjetas; la segunda tarjeta queda con aire |

**Revisión (`revisor-landing`, solo bloqueantes):** sin desbordes (320/375/768/1440), contraste ≥ 6:1, pestañas y `details` con teclado, encabezados sin saltos. Corregido: frase nueva atribuida al caso real en V3, rótulo "Ejemplo" en V1 y V3, `tabindex` en los paneles de V2, transición bajo `prefers-reduced-motion`.

**Pendiente:** Carlos elige (o pide mezclas) en el chat; luego un archivo nuevo para implementar. Al elegir se borra `src/prototypes/` y `src/pages/prototypes/`. Cualquier texto nuevo (rótulo "Ejemplo · así se vería en tu negocio", titulares de FAQ V3) pasa a `copy.md` solo al implementar. Resultado de `2026-10-19-cabecera.md` ya iba en el commit `0e14f9d`.
