# Crítica de diseño: landing Carlos Maldonado (rama `rediseno-talonario`)

Revisé `PRODUCT.md`, `DESIGN.md`, `src/pages/index.astro`, `src/styles/global.css`, `src/scripts/main.js` y las capturas `review/desktop.png` (1440 px) y `review/mobile.png` (390 px).

Veredicto: el cliente tiene razón en las dos quejas. El sistema está bien hecho y es accesible, pero la *composición* es la de un documento. Y la metáfora del "talonario", que era el concepto, hace que el formulario parezca un trámite impreso. Lo que hay que cambiar es la composición, no la paleta.

---

## 1. Diagnóstico

### Por qué se lee como un CV

1. **Seis de siete secciones tienen la misma plantilla.** Rótulo a la izquierda (cols 1-3) y texto a la derecha (cols 4-10), separados por una regla de 1px (`.seccion .contenedor`, `global.css` L100-106). "El problema", "Qué hago", "Cómo trabajo", "Un caso real", "Qué esperar" y "Conversemos" usan esa estructura. Es la retícula de un currículum (*Experiencia / Educación / Habilidades*). El ojo la reconoce en dos segundos y desde ahí lee "documento".
2. **No hay ritmo, solo bandas.** Para variar se alternan fondos (blanco / azul pálido / noche), pero la estructura de adentro es igual. Al ver la página completa (desktop.png) parecen hojas de un PDF apiladas.
3. **La jerarquía tipográfica es plana.** El h1 llega a 4rem. Después todo vive entre 1.125 y 2.25rem: h2 a 2.25, lead a 1.375, `.fuerte` a 1.25, cuerpo a 1.125. Entre un h2 y su texto la proporción es cerca de 2:1, y nada de la página funciona como titular. Encima, el h2 queda encogido en la columna izquierda y pesa lo mismo que un rótulo de sección de CV.
4. **El texto corre en una franja angosta y sobra espacio a la derecha.** `.cuerpo` termina en la columna 10 desde 1024px. A 1440px queda un vacío de unos 340px a la derecha en todas las secciones. Es el margen de una hoja impresa, no de una pantalla.
5. **Después del hero no hay ningún objeto visual.** El hero tiene la demo, y de ahí al formulario son cinco secciones de puro texto en listas con reglas. "Qué esperar" y "Cómo trabajo" son negrita + línea + regla, el mismo patrón que una lista de logros. "Qué hago" es una tabla de dos columnas rótulo/descripción, o sea "Habilidades".
6. **La demo, que es la única prueba, está tratada como nota al margen.** Ocupa 5 de 12 columnas (unos 470px a 1440). Su tipografía es de 0.875-0.9375rem, con mucho aire y bordes finos. En reposo (la captura) se ve casi vacía: los pasos 1 y 3 en blanco y la fila nueva sin aparecer. Corre una sola vez y no vuelve en el resto de la página. `PRODUCT.md` dice "la demo es la prueba", pero el diseño la trata como accesorio.
7. **"Un caso real" se cuenta en vez de mostrarse.** Antes/Ahora son dos párrafos de 4 líneas en columnas. Es el argumento más fuerte de la página y se lee como dos entradas de un CV ("Antes: …", "Ahora: …").
8. **Rótulos y cabecera de membrete.** "Carlos Maldonado · AUTOMATIZACIÓN PARA PYMES" en versalitas a la izquierda es literalmente el encabezado de un CV. Los rótulos en mayúsculas comprimidas por todas partes (hoja, talonario, antes/ahora, cabecera) suman a la sensación de documento administrativo.
9. **La serif (Bitter) en todo el cuerpo.** Con columnas angostas y reglas, la serif de texto es lo que remata el aspecto "documento editorial/impreso". Funciona en frases grandes, no en párrafos de servicio.

### Por qué el formulario "parece del 90"

1. **Biselado tipo Windows 95.** Los campos llevan borde de 1px gris en tres lados y 2px negro abajo (`.campo input`, L190). Se lee como campo hundido de los 90, no como "línea de escribir".
2. **Etiquetas numeradas en rojo (1, 2, 3).** Es el código del formulario de trámite (SII, municipalidad). Para un dueño de pyme eso significa burocracia, justo lo contrario de "conversemos".
3. **Bloque amarillo crema con borde superior punteado.** Es papel calco: nostalgia de oficina. Además, los campos blancos sobre crema parecen recortes pegados.
4. **Cabecera "SOLICITUD DE CONTACTO / PARA: CARLOS MALDONADO".** Lenguaje de ventanilla. A nadie le dan ganas de "solicitar contacto".
5. **Textarea fija de 5 filas con el tirador de resize visible**, como caja de los 90. Las ayudas grises de 0.875rem van *debajo* de cada campo y se leen tarde.
6. **El botón "Enviar" es chico** (200px, alineado a la izquierda) y queda abajo de una tarjeta de 570px en una columna desplazada. El formulario queda flotando a la izquierda con un vacío enorme a la derecha (desktop.png, y≈1560-1850).
7. **El éxito es un sello circular "RECIBIDO".** Es disfraz: sigue jugando a la oficina en vez de confirmar algo humano ("te escribo a tal correo").
8. **No le da contexto al momento de escribir.** Junto al formulario no aparecen las promesas que bajan el riesgo (sin costo, respondo en 1-2 días, todo queda en tus cuentas). Están tres secciones más arriba, en "Qué esperar".

---

## 2. Puntaje Nielsen (0-4)

| # | Heurística | Nota | Comentario |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | El envío muestra "Enviando…", fallo y éxito. La demo no indica si está corriendo o ya terminó. |
| 2 | Coincidencia con el mundo real | 2 | El lenguaje del copy es excelente y cercano. La metáfora visual (talonario, folio, sello) es de una oficina que el usuario no asocia con algo moderno. |
| 3 | Control y libertad | 3 | Están "Ver de nuevo", el salto al formulario y "volver arriba". La demo no se puede pausar. |
| 4 | Consistencia y estándares | 3 | El sistema es muy consistente. Los campos se salen de las convenciones web actuales. |
| 5 | Prevención de errores | 3 | Validación clara y `maxlength`. No avisa de antemano que los tres campos son obligatorios. |
| 6 | Reconocer antes que recordar | 3 | Las ayudas existen pero llegan tarde (debajo del campo). Las promesas no están junto al formulario. |
| 7 | Flexibilidad y eficiencia | n/a | Landing de un solo objetivo. |
| 8 | Estética y minimalismo | 2 | Está limpia pero sin foco. Todo pesa lo mismo, no hay un punto donde mirar después del hero, y hay 7 secciones donde caben 5. |
| 9 | Recuperación de errores | 4 | Mensajes específicos y en tono humano, foco en el primer error y correo de respaldo si falla el envío. |
| 10 | Ayuda y documentación | n/a | No aplica más allá del microcopy, que está bien. |

### Tres fortalezas que hay que conservar

1. **El copy.** Primera persona, chileno, concreto, sin frases de plantilla ("Si no lo puedes usar sin mí, algo hice mal."). Es lo mejor de la página.
2. **El contenido de la demo** (mensaje → fila → aviso, con sello EJEMPLO y datos inventados declarados). La idea es la correcta; lo que falla es la escala y el lugar que ocupa.
3. **La base técnica y de accesibilidad.** Contrastes medidos, foco de 3px, objetivos táctiles de 44-52px, `prefers-reduced-motion`, contenido final en el HTML, fuentes locales con fallback métrico, JS mínimo. No se toca.

---

## 3. Dirección de mejora: "La planilla que se llena sola"

**Idea:** la página deja de ser un formulario impreso y pasa a ser **la planilla funcionando**. La demo es la pieza central y el hilo narrativo, y cada sección muestra un objeto (mensaje, fila, aviso, línea de tiempo) en vez de una lista. Se conservan el azul de imprenta, el rojo y la tipografía Archivo. Se abandonan la metáfora del papel calco y la retícula rótulo-izquierda.

### Reglas de composición

- **Muere la fila "h2 izquierda + cuerpo derecha".** El h2 va **arriba**, a todo el ancho del contenedor, a `clamp(2rem, 1.2rem + 3vw, 3.25rem)` y con hasta 22ch. Así la proporción h2/cuerpo pasa de 2:1 a cerca de 3:1.
- **Cada sección tiene una composición distinta y un solo recurso fuerte.** Ninguna repite la retícula de la anterior.
- **El contenido usa todo el ancho**, 1200px. Solo los párrafos de texto corrido se limitan a 60ch, dentro de composiciones más anchas.
- **Bitter solo para frases grandes** (la frase del problema, los textos del caso). El cuerpo y la UI van en Archivo a ancho 100 y 1.0625rem. Así la página deja de ser un "documento serif".
- **Radios: de 2px a 10px** en campos, botones, tarjetas y burbujas. Las tablas siguen rectas, porque la planilla *es* recta. Con eso basta para quitar el aire de imprenta sin caer en SaaS.
- **Se eliminan:** la copia amarilla como superficie, el borde punteado, el sello RECIBIDO, los numerales rojos en los campos y los rótulos en versalitas fuera de la demo. El rojo queda para el sello EJEMPLO, los números de paso y los errores.
- **Cabecera:** "Carlos Maldonado" a la izquierda y el botón sólido pequeño "Escríbeme" a la derecha. Sin la línea en versalitas.

### Sección por sección (recurso fuerte → composición)

1. **Hero: la demo como protagonista.** A ≥1024px la retícula pasa a 5/7: texto en cols 1-5 y demo en cols 6-12, con unos 680px. La demo tiene tres piezas *legibles* en horizontal (en móvil se apilan):
   - una burbuja de chat (radio 10px, con nombre y hora);
   - la planilla, con tipografía de 1rem, 5-6 filas y una columna "Estado";
   - el aviso.
   Las tres se conectan con dos trazos SVG finos (líneas, no íconos). La animación **da vueltas**: entran 3 mensajes seguidos, cada uno suma su fila (destello amarillo de 1s, el único uso que le queda al amarillo) y el total del aviso sube. Lleva un botón visible **Pausar / Reanudar** (WCAG 2.2.2, porque se mueve más de 5 s). Se conserva el sello EJEMPLO y la leyenda. En reposo y con reduced-motion se muestra el estado final completo. Nunca un estado vacío: la captura actual demuestra que hoy en reposo se ve a medias.
2. **El problema: una frase grande, sin columna.** Una sola frase en Bitter a `clamp(1.75rem, 1.2rem + 2vw, 2.75rem)`, ancho 24ch, sobre fondo papel: "Hay una tarea que en tu pyme se hace a mano todos los días." Debajo, la segunda frase a tamaño de lectura. No lleva h2 visible: el h2 queda para lectores de pantalla (`.sr-only`) o se usa la frase misma como h2. Es la pausa tipográfica que hoy no existe.
3. **Qué hago: retícula 2×2 de "piezas"** (1 columna en móvil). Cada tarjeta, con borde de 1px y radio 10px, tiene arriba una **miniatura viva hecha con los mismos componentes de la demo**:
   - Registros: una fila de planilla.
   - Pedidos: tres chips de estado "pendiente / listo / despachado", hechos de texto y borde, no íconos.
   - Avisos: una línea de aviso.
   - Boletas: una línea de detalle con monto.
   Debajo van el nombre y una frase. **Honestidad:** "Registros" lleva una marca de texto "Ya funcionando en un cliente"; las otras tres llevan "Lo puedo armar". Esa diferencia es una ventaja de confianza, no una debilidad.
4. **Cómo trabajo: línea de tiempo horizontal** a ≥1024px. Cuatro hitos sobre una regla de 2px, con números rojos de 2.5rem, título y una línea por hito. En móvil es una línea vertical a la izquierda. Bajo la línea, a la derecha: "Cada parte toma semanas, no meses." Es un único recurso (la línea) y reemplaza la lista con reglas.
5. **Un caso real: comparación visual de un mismo día, a doble columna sobre azul noche.** Son dos líneas de tiempo con horas en cifras tabulares, de igual altura, para comparar al vistazo:
   - **Antes:** 08:00 cada uno anota en su hoja · 17:30 alguien junta las hojas · 20:00 el dueño recién sabe el total.
   - **Ahora:** 08:14 Juan manda "120 cajas" · 08:14 queda en la planilla · 18:00 el dueño recibe el total.
   La columna "Ahora" termina antes y con menos pasos, y la diferencia se *ve*. Es anónimo, no hay cifras de resultado y las horas son ilustrativas: se rotula "Horas aproximadas, cliente anónimo". El enlace "¿Te suena? Cuéntame tu caso." queda al final.
6. **Conversemos (fusiona "Qué esperar"): composición 5/7 sobre azul pálido.** Izquierda: h2 grande "Cuéntame qué te quita tiempo", y debajo las 4 promesas de "Qué esperar" en versión corta, una línea en negrita y otra normal cada una, sin reglas. Derecha: el formulario en tarjeta blanca (ver §4). Así la página queda en 6 secciones y las garantías aparecen justo cuando el visitante decide.

### Lo que se evita (para no caer en plantilla IA ni en disfraz)

Nada de degradados, glow, glassmorphism, mockups de iPhone, íconos de línea genéricos, contadores de "+100 clientes", tarjetas con sombra flotante ni héroe oscuro. La modernidad viene de la escala, de los radios de 10px, del ancho completo y de que el objeto real (la planilla) sea el protagonista. No viene de efectos. Tampoco más papel, sellos o folios: la metáfora de imprenta se queda solo en la precisión (reglas, cifras tabulares).

---

## 4. Formulario moderno y confiable

**Ubicación:** columna derecha de la sección Conversemos (cols 6-12 a ≥1024px, ancho completo en móvil), en una tarjeta blanca con borde de 1px `#c5cbd3`, radio 12px y padding 32px (20px en móvil), sobre la banda azul pálido. Sin sombra.

**Estructura y orden** (mensaje primero: es la conversación, y lo personal va después):

1. **¿Qué te gustaría sacarte de encima?** Textarea de 4 filas que crece sola (`field-sizing: content`, con `min-height` de respaldo), sin tirador visible y `resize: none` donde haya auto-crecimiento. La ayuda va **encima** del campo, entre la etiqueta y el input, en tinta-2 a 0.9375rem: "Por ejemplo: anotamos los pedidos a mano y después los paso a una planilla."
2. **Tu nombre** y **Correo o teléfono**: dos columnas a ≥768px y apiladas en móvil. La ayuda de contacto, también arriba: "Donde prefieras que te responda."
3. **Botón** a todo el ancho de la tarjeta, 56px de alto, radio 10px, azul de imprenta, texto "Enviar mensaje". Hover en azul profundo y active con `translateY(1px)`.
4. **Microcopy bajo el botón**, en 0.9375rem tinta-2: "Te respondo en uno o dos días, por el medio que me dejes. Uso tus datos solo para eso."
5. Arriba del primer campo, una sola línea: "Son tres datos, todos necesarios." Sin asteriscos.

**Etiquetas:** arriba, limpias, en Archivo 600 1rem color tinta, sin números ni mayúsculas. **No se usa etiqueta flotante**: cuesta más en accesibilidad, rompe con zoom y autocompletado y no aporta nada en 3 campos.

**Campos:** fondo blanco, borde de 1.5px `#6b7484` en los 4 lados (4.8:1 sobre blanco, supera el 3:1 que pide un componente de UI), radio 10px, alto 52px, padding 14px 16px, texto 1.0625rem (≥16px, para que iOS no haga zoom).

**Estados:**
- **Hover:** borde tinta.
- **Foco:** borde de 2px azul + `outline` de 3px azul con offset de 2px. Se mantiene la regla de foco actual. Sin `box-shadow`.
- **Inválido:** borde de 2px rojo y mensaje rojo de 0.9375rem justo debajo con el prefijo de texto "Falta:" o "Revisa:" (sin ícono), además de `aria-invalid` y `aria-describedby` como hoy.
- **Enviando:** botón con `aria-busy`, texto "Enviando…" y opacidad 0.8; los campos en `readOnly` como hoy.
- **Fallo:** la caja actual (fondo de error + mailto), pero con radio 10px y el título "No se pudo enviar. Escríbeme directo a …". Botón en "Reintentar".

**Éxito (cierra el hilo narrativo):** el contenido de la tarjeta se reemplaza por:

> **Listo, {nombre}. Te escribo a {contacto} en uno o dos días.**
> Así quedó tu mensaje en mi planilla:
> | Hora | Quién | Estado |
> | 14:32 | {nombre} | Recibido |

Es la misma tabla de la demo, con la fila entrando con el destello amarillo. Esto es **verdadero**: n8n lo guarda de verdad en Postgres. Cierra la historia de la página (tú también acabas de mandar un mensaje que se registró solo) y reemplaza al sello RECIBIDO. El foco va al título (`tabindex="-1"`, como hoy). Los valores del usuario se insertan con `textContent`, nunca con `innerHTML`.

**Una sola línea con expansión: no.** Con 3 campos, esconderlos agrega un clic y estados ARIA (`aria-expanded`) sin bajar la fricción real. Además, que el formulario se vea completo comunica que es corto.

**Se mantiene igual (contrato con n8n):** POST JSON `{nombre, contacto, mensaje, hp, t}`, con `hp` leído del honeypot `name="sitio_web"` (fuera de pantalla, `tabindex="-1"`, `aria-hidden`, `autocomplete="off"`), `t` = ms desde la carga, `credentials: 'omit'`, timeout de 10 s, validación actual, `<noscript>` con el correo. Cambiar el orden visual de los campos no toca el payload. `autocomplete`: `name` en nombre y `email` en contacto (aceptable; el teléfono igual se puede escribir).

---

## 5. Lista priorizada de cambios

### P0 (resuelven las dos quejas)

| # | Archivo / sección | Cambio | Verificación |
|---|---|---|---|
| P0-1 | `global.css` `.seccion`, `.cuerpo`; `index.astro` todas las secciones | Eliminar la retícula h2 cols 1-3 / cuerpo cols 4-10. h2 arriba, a ancho completo, `clamp(2rem,1.2rem+3vw,3.25rem)`. | A 1440px ningún h2 comparte fila con su cuerpo. Ninguna sección deja más de 120px vacíos a la derecha (salvo la frase del problema). |
| P0-2 | `index.astro` / `global.css` contacto | Reescribir el formulario según §4: tarjeta blanca de radio 12px, etiquetas arriba sin números, campos de radio 10px y borde de 1.5px en 4 lados, mensaje primero, botón a todo el ancho "Enviar mensaje", microcopy bajo el botón. Borrar `.talonario`, `.tal-cab`, `.campo label .n`, `.sello` y la copia amarilla como superficie. | No hay `dashed`, ni `#fff6d5` como fondo de contenedor, ni numerales en las etiquetas. Tab recorre mensaje → nombre → contacto → botón. El POST sigue enviando las 5 claves (revisarlo en Network). |
| P0-3 | `index.astro` contacto + borrar sección "Qué esperar" | Fusionar "Qué esperar" en la columna izquierda de Conversemos (5/7 a ≥1024px). | Hay 6 `<section>`. Las 4 promesas se ven en el mismo viewport que el botón Enviar a 1440×900. |
| P0-4 | Hero `index.astro` / `global.css` `.hero-grid`, `.hoja` | Demo en cols 6-12, tres piezas (burbuja, planilla, aviso) con tipografía ≥1rem, planilla de 5-6 filas. Estado final en el HTML. | A 1440px la demo mide ≥640px de ancho. Con JS apagado se ven las tres piezas completas. |
| P0-5 | `main.js` demo | Bucle de 3 mensajes que suman filas y total, botón Pausar/Reanudar (`aria-pressed`), sin bucle con reduced-motion. | La demo se detiene con el botón. Con `prefers-reduced-motion: reduce` no hay ninguna transición y se ve el estado final. |

### P1 (dejan de leerse como documento)

| # | Archivo / sección | Cambio | Verificación |
|---|---|---|---|
| P1-1 | "Un caso real" | Reemplazar los dos párrafos por dos líneas de tiempo con horas tabulares (Antes / Ahora), de igual altura y con la nota "horas aproximadas". | Cada columna tiene 3 hitos con hora. No queda ningún párrafo de más de 2 líneas. |
| P1-2 | "Qué hago" | Retícula 2×2 de tarjetas con miniatura hecha de los componentes de la demo y una marca de honestidad ("Ya funcionando en un cliente" solo en Registros; "Lo puedo armar" en las otras). | Exactamente 1 tarjeta dice "funcionando". No hay SVG de íconos. |
| P1-3 | "Cómo trabajo" | Línea de tiempo horizontal a ≥1024px y vertical en móvil. | A 1440 los 4 pasos están en una fila. A 390, una columna con línea a la izquierda. |
| P1-4 | "El problema" | Frase grande en Bitter, 24ch, sin columna izquierda. | Es el texto más grande de la página después del h1. |
| P1-5 | `global.css` tipografía | Cuerpo en Archivo 1.0625rem; Bitter solo en el problema y el caso. Rótulos en versalitas solo dentro de la demo. | `grep "text-transform: uppercase"` solo aparece en selectores `.hoja`. |
| P1-6 | Éxito del formulario | Mensaje personalizado + fila "Recibido" en mini-planilla. Valores insertados con `textContent`. | Al enviar con el nombre `<b>x</b>` se ve el texto literal. El foco queda en el título. |
| P1-7 | Cabecera | Quitar la línea en versalitas y usar un botón sólido pequeño "Escríbeme". | Cabecera de ≤64px con 2 elementos. |

### P2 (pulido)

| # | Archivo / sección | Cambio | Verificación |
|---|---|---|---|
| P2-1 | `main.js` reveal `.rv` | Borrar el reveal por sección (la captura móvil muestra secciones en blanco; es riesgo en capturas, dispositivos lentos y vistas previas). Basta con el movimiento de la demo. | La captura de página completa a 390px se ve sin zonas lavadas. |
| P2-2 | `DESIGN.md` | Actualizar el North Star ("La planilla que se llena sola"), los radios (10/12px), quitar Talonario, Sello y Copia Amarilla como superficie, y quitar la regla "2px máx.". | DESIGN.md coincide con el CSS. |
| P2-3 | Pie | Una sola línea: nombre · correo · Volver arriba. | Pie de ≤2 líneas a 390px. |
| P2-4 | `index.astro` TODOs | Que Carlos confirme "uno o dos días" y la frase de datos antes de publicar. | No quedan `TODO(Carlos)`. |

---

## 6. Riesgos: qué no romper

- **Honestidad del contenido.** Nada de cifras, logos, testimonios ni "+N clientes". Las miniaturas de "Qué hago" y la demo llevan EJEMPLO. Solo Registros dice "funcionando". Las horas del caso se rotulan como aproximadas. La fila de éxito refleja algo que sí pasa (registro en Postgres): si un día el flujo deja de guardar, hay que cambiar ese texto.
- **Contraste.** Borde de campo ≥3:1 (`#6b7484` = 4.8:1), texto ≥4.5:1, chips de estado con texto en tinta (no en color), foco de 3px azul, y blanco sobre la banda noche. Volver a medir cualquier token nuevo.
- **Movimiento.** Una demo en bucle exige el botón de pausa (WCAG 2.2.2), se desactiva con `prefers-reduced-motion` y el contenido final va en el HTML (sin JS se ve completa). Solo transiciones de `opacity`/`transform`.
- **Rendimiento.** Sigue siendo Astro estático, con CSS propio y sin librerías. Los trazos de la demo son SVG inline (<2 KB). No se suman fuentes: Archivo y Bitter ya están cargadas. Si Bitter queda solo para 2 frases, se puede dejar de precargar.
- **Contrato del formulario.** El payload `{nombre, contacto, mensaje, hp, t}`, el honeypot `sitio_web`, el timeout, el mailto de respaldo y el `<noscript>` no cambian. Reordenar los campos en el HTML no altera el JSON.
- **Seguridad en el éxito.** Los valores del usuario se insertan solo con `textContent`.
- **No sobrecorregir.** Si al quitar el papel aparece la tentación de tarjetas con sombra, degradado o íconos, eso es justo la v5 descartada. El carácter tiene que venir de la planilla real, no de efectos.
