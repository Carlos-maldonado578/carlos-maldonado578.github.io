# Segunda crítica: landing Carlos Maldonado (rama `rediseno-talonario`)

Leí `PRODUCT.md`, `DESIGN.md`, `src/pages/index.astro`, `src/styles/global.css`, `src/scripts/main.js`, las capturas `review/desktop.png` (1440) y `review/mobile.png` (390) y la primera crítica (`critique-opus.md`). Lo que ya se resolvió no lo vuelvo a pedir: se fue la retícula de CV, el talonario, el papel calco y el sello; la demo protagoniza el hero; el formulario es moderno y el éxito con la mini-planilla cierra bien la historia.

> Nota de captura: el blanco de unos 1500px bajo el pie en `desktop.png` es un artefacto del modo dev (la barra de Astro aparece abajo). No es un defecto, pero hay que confirmarlo con `astro build && astro preview`.

---

## 1. Veredicto

**La página ya no se lee como CV ni como plantilla.** Ahora se lee como **un buen producto sin dueño**. La primera mitad tiene carácter: la planilla del hero y los nombres que se estiran en "Elige tu pega". La segunda mitad (Cómo trabajo, Caso, Conversemos) vuelve a componentes correctos pero sin personalidad. Y en toda la página falta la única cosa que una persona sola no puede dejar de mostrar: **quién es Carlos**. Sin foto y sin testimonios, la confianza tiene que salir de la voz y de las reglas claras, y hoy hay poco de eso fuera de las cuatro promesas.

**Lo que todavía se lee genérico, plano o inseguro**

1. **"Cómo trabajo" es el bloque "4 pasos numerados" de cualquier landing.** Tiene número rojo, título, una línea y regla arriba. Está bien hecho, pero en desktop es lo más intercambiable de la página.
2. **El caso real es la sección con más fondo y menos contenido.** Una banda azul noche de unos 600px lleva dos columnas de tres líneas a 1rem (captura c2). Las dos columnas tienen el mismo largo y el mismo ritmo, así que la diferencia entre "Antes" y "Ahora" no se *ve*: hay que leer las horas y restar. Es el argumento más fuerte de la página y hoy pesa menos que la lista de pegas.
3. **La jerarquía tipográfica se aplanó de nuevo, pero hacia arriba.** A 1440, el h1 queda en 56px (tope de su clamp), los h2 en 52px, la frase del problema en 52px y los nombres de pega en 48px. El h1 ya no manda: el titular del problema y "Qué puedo dejar andando solo" pesan prácticamente lo mismo que la promesa principal.
4. **Las bandas forman una cebra.** El orden es tinte / blanco / tinte / blanco / noche / tinte. La alternancia es mecánica, y cada corte de color reinicia la lectura aunque el contenido continúe (el problema es el planteamiento de "Elige tu pega" y está separado de ella por un cambio de fondo).
5. **"Lo puedo armar" aparece tres veces seguidas en tinta secundaria.** Es honesto, pero visualmente dice "3 de 4 no existen". Falta el dato que convierte esa honestidad en seguridad: con qué se arma y cuánto toma.
6. **No hay ni una línea sobre Carlos.** No se dice quién es, desde dónde trabaja ni por qué hace esto. El posicionamiento dice "una persona, no una agencia", y la página no muestra a esa persona.

**Qué se recuerda hoy tras una visita:** la planilla que se llena sola (fila con destello) y la lista "Registros / Pedidos / Avisos / Boletas" que se estira. Eso es bueno: dos imágenes propias. **Lo que no se recuerda:** el caso, el proceso y a Carlos. Lo ideal es que se recuerden tres cosas: la planilla, el día comparado y "es una persona que me dice si me sirve o no".

---

## 2. Nielsen (0-4)

| # | Heurística | Nota | Comentario |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | La demo y las pegas muestran avance (barra de 3px) y tienen pausa, y el formulario tiene todos sus estados. Falta decir qué pasa *después* de enviar, más allá del plazo. |
| 2 | Coincidencia con el mundo real | 4 | El copy chileno y los objetos (planilla, boleta, pedido #214) son reales para un dueño de pyme. |
| 3 | Control y libertad | 3 | Las pegas cambian solas, cambian también con *hover* (200 ms) y además hay dos botones "Pausar" en lugares distintos. Al pasar el mouse por la lista mientras se hace scroll, el panel cambia sin que el usuario lo pida. |
| 4 | Consistencia y estándares | 3 | "Pausar" va bajo la figura en el hero y bajo el panel, alineado a la derecha y lejos de la lista, en las pegas. h1 y h2 casi del mismo tamaño. |
| 5 | Prevención de errores | 3 | Validación buena; se avisa que son tres datos. Correcto. |
| 6 | Reconocer antes que recordar | 3 | Las promesas ya están junto al formulario. "Cada proyecto se cotiza aparte" abre la lista y pone el dinero primero. |
| 7 | Flexibilidad y eficiencia | n/a | Landing de un solo objetivo. |
| 8 | Estética y minimalismo | 3 | Limpia y con foco arriba. Abajo pierde intensidad: el caso tiene poco contenido para el fondo que ocupa y el proceso es genérico. |
| 9 | Recuperación de errores | 4 | Mensajes humanos, correo de respaldo y "Reintentar". |
| 10 | Ayuda y documentación | 2 | Para un dueño poco técnico, las dudas que frenan el contacto ("¿tengo que saber de computación?", "¿qué pasa si se cae?", "¿qué te tengo que pasar?") no tienen respuesta en ninguna parte. |

### Tres fortalezas que hay que conservar

1. **La demo del hero a escala real.** Tiene tabla legible, columna Estado, bucle con pausa y el estado final en el HTML. Es la prueba, y ahora se ve como prueba.
2. **"Elige tu pega" con el eje `wdth` y la etiqueta de honestidad.** Es el único recurso de la página que no se ve en otras landings, y la diferencia "Ya funcionando / Lo puedo armar" genera confianza. No tocar el mecanismo.
3. **El cierre del formulario con la mini-planilla "Recibido".** El visitante termina siendo una fila más de la planilla. Es verdad (Postgres) y es memorable.

---

## 3. Por sección

### Hero
- **Funciona:** composición 5/7, demo de unos 690px, CTA claro, plazo de respuesta junto al botón.
- **Falla:** el h1 queda en 56px en una columna de 5/12 y la demo lo eclipsa. Al cargar, la demo borra las filas que ya estaban en el HTML (`pasos[0]` quita `.on`): el visitante ve la tabla llena y un instante después vacía, lo que se lee como un fallo y no como animación. La nota "Te respondo en uno o dos días" en 0.9375rem gris casi no se ve en desktop.
- **Ajuste:**
  - Subir el tope del h1 a `clamp(2.5rem, 1.5rem + 3.4vw, 4.25rem)`. A 1440 son 68px y el título sigue en 3 líneas dentro de 5 columnas (16ch).
  - Que el primer paso del bucle **no reinicie**: arrancar desde el estado final, esperar unos 4 s y recién ahí empezar el ciclo vaciando la tabla.
  - Agregar una línea de identidad bajo el CTA (ver §5): "Soy Carlos. Trabajo solo, desde {ciudad}."

### El problema
- **Funciona:** es una pausa tipográfica real, y la lista de tareas del lead anticipa exactamente las pegas.
- **Falla:** al pesar lo mismo que los h2 deja de ser la excepción. Queda aislada en su banda blanca y en desktop le sobra un vacío a la derecha que, sin nada que la contraste, se nota.
- **Ajuste:** dejar la frase en 3.25rem como **único** texto de ese tamaño fuera del h1 (bajar los h2, ver §4). Unirla visualmente con "Elige tu pega": mismo fondo y padding superior reducido en la sección siguiente, de modo que "Hay una tarea…" funcione como el planteamiento y la lista como la respuesta.

### Elige tu pega
- **Funciona:** el mecanismo, la escena por pega, los paneles de alto fijo, la honestidad y el pedido #214 que cruza los carriles.
- **Falla:**
  - (a) La guía "Elige una pega y mira cómo quedaría andando" va en 0.9375rem gris *arriba* de la lista y no se ve.
  - (b) "Pausar" y "Ejemplos ilustrativos…" quedan bajo el panel, unos 200px por debajo del último nombre, desconectados de la barra de avance que controlan.
  - (c) El enlace de cierre flota con unos 120px de vacío encima.
  - (d) En móvil, la lista de 4 ítems de 72px más el h2 y el lead empujan el panel fuera del primer pantallazo de la sección.
  - (e) La escena de Registros repite casi literal la demo del hero (mensaje, tabla, nombres).
  - (f) El cambio por *hover* hace que el panel cambie solo al cruzar la lista con el mouse.
- **Ajuste:**
  - Mover "Pausar" bajo la lista (cols 1-6), junto a la última regla, que es donde está la barra que controla.
  - Subir la guía a 1.0625rem en tinta.
  - Acercar el enlace de cierre a la lista con `margin-top: var(--s5)` en cols 1-6.
  - En móvil, nombres a `clamp(1.5rem…)` y `min-height` de 56px.
  - Quitar la selección por hover y dejar solo clic/teclado; la vuelta automática ya cumple la función de "mostrar".
  - En Registros, mostrar el paso que el hero no muestra (el dato separado en columnas, que ya está insinuado con "Rechazo") y acortar la parte del mensaje.
  - Bajo "Lo puedo armar", una línea concreta por pega con la herramienta que usaría. Por ejemplo "Formulario o WhatsApp → planilla → aviso por correo". Es verificable, no promete clientes y transforma "no existe" en "sé cómo hacerlo".

### Cómo trabajo
- **Funciona:** el contenido ("Te digo con honestidad si te sirve o no") y la frase de cierre en Bitter.
- **Falla:** es el patrón genérico de 4 columnas, con texto a 1.0625rem en columnas de unos 260px. No dice qué hace el cliente en cada paso ni cuánto toma, que es lo que un dueño quiere saber.
- **Ajuste:** convertirlo en una línea de tiempo con **dos carriles**: arriba "Yo hago", abajo "Tú haces / me pasas". Paso 1: "Me cuentas cómo lo hacen hoy (30-45 min, por llamada o en tu local)". Paso 3: "Me prestas 10 minutos para probar con datos reales". Las duraciones las confirma Carlos (TODO). Es honesto, concreto y propio, y elimina el aire de plantilla porque nadie más muestra el trabajo del cliente.

### Caso (azul noche)
- **Funciona:** la banda única, el rótulo de anonimato y que retome a "Juan, 120 cajas" de la demo.
- **Falla:** poco contenido, a tamaño de cuerpo, en una banda grande. Las dos columnas son simétricas, así que la diferencia no se ve. El h2 ocupa la mitad izquierda y la derecha queda vacía (captura c2).
- **Ajuste: un solo eje horario compartido 08:00 → 20:00, con dos carriles.**
  - **Antes:** un tramo vacío (solo regla en `--noche-regla`) hasta las 17:30, rotulado "No sabes cuánto se produjo", y luego marcas en 17:30 y 20:00.
  - **Ahora:** una marca a las 08:14 y una pista sólida blanca desde ahí, rotulada "Ya está en la planilla", más una marca a las 18:00.

  Las posiciones deben ser proporcionales a la hora (`left: calc((h - 8) / 12 * 100%)`) y el texto debe subir a 1.25rem. En móvil, el eje va vertical con los dos carriles lado a lado. Es el momento memorable que falta, y no requiere inventar ninguna cifra. Abajo, una línea honesta "Qué hubo que armar: un bot de Telegram y una planilla de Google" (que Carlos confirme las herramientas reales).

### Conversemos
- **Funciona:** composición 5/7, tarjeta limpia, textarea que crece, ayudas arriba, botón ancho, éxito con mini-planilla.
- **Falla:** la primera promesa es el precio ("se cotiza aparte"), así que lo primero que se lee junto al formulario es dinero. No dice qué pasa después de enviar. El textarea vacío de 128px es la zona más grande y más muda de la tarjeta.
- **Ajuste:** reordenar las promesas como Empiezo por lo que duele → Lo dejo simple → Todo queda en tus cuentas → Se cotiza aparte. Bajo el botón, reemplazar la nota por "Qué pasa después" en 3 líneas numeradas en rojo: "1. Leo tu mensaje. 2. Te escribo con 2-3 preguntas, en uno o dos días. 3. Si tiene sentido, conversamos 30 minutos, sin costo." Agregar al pie de la tarjeta: "¿Prefieres correo? {correo}".

### Pie
- **Funciona:** una línea, sin ruido.
- **Falla:** no aporta identidad ni ubicación.
- **Ajuste:** "Carlos Maldonado · Automatización para pymes · {ciudad}, Chile · correo · Volver al inicio". Mostrar el lugar desde donde trabaja es una señal de confianza honesta y gratuita.

---

## 4. Ritmo global

- **Escala tipográfica:** hoy las medidas a 1440 son h1 56, h2 52, frase 52, pega 48 y frase-chica 32, demasiado comprimidas arriba. Propuesta: **h1 68 / frase 52 / h2 40 (`clamp(1.875rem, 1.3rem + 1.8vw, 2.5rem)`) / pega 48 / h3 20**. Así el h1 vuelve a ser el titular, la frase del problema es la única pausa grande, y los nombres de pega quedan por encima de los h2, que es lo correcto porque son el objeto de la sección.
- **Color y bandas:** la secuencia actual es tinte/blanco/tinte/blanco/noche/tinte. Propuesta: **tinte (hero) → blanco (problema + pegas, sin corte) → blanco (cómo trabajo, separado solo por espacio) → noche (caso) → tinte (contacto)**. Son 3 cortes en vez de 5, y el azul noche gana fuerza porque llega después de un tramo blanco largo. Las hojas de pega sobre blanco ya tienen borde de 1px, así que funcionan.
- **Transiciones:** todos los cortes son a sangre y con el mismo padding de 96px. Entre problema y pegas no debe haber corte. Entre caso y contacto, el corte noche → tinte es fuerte y está bien porque marca "ahora te toca a ti".
- **Densidad y longitud:** unos 4.650px en desktop con 6 secciones es una longitud correcta, así que no hay que acortar. Lo que sobra es aire *vacío* en el caso y en el pie de las pegas, no contenido.
- **Dónde se pierde la atención:** al pasar de "Elige tu pega" (interactiva, rica) a "Cómo trabajo" (estática, chica). La caída de intensidad es brusca. Los dos carriles Yo/Tú y el eje del caso corrigen ese bajón.
- **Primer pantallazo en móvil (390×844):** muestra cabecera, h1 en 3 líneas, lead en 5 líneas, botón ancho y la nota, y la demo asoma solo con su rótulo y el mensaje. Funciona. Mejora: acortar el lead en móvil (es la frase más larga del pantallazo) para que asome la primera fila de la tabla, que es lo que hace entender todo. Bajo 768px se puede ocultar la segunda oración del lead ("Con herramientas simples…") porque se repite en "Qué puedo".
- **Pausar ×2:** son dos controles con la misma etiqueta y posiciones distintas. Hay que unificar el lugar: siempre pegado al objeto que se mueve, a la izquierda.

---

## 5. Credibilidad sin pruebas falsas

Señales honestas que faltan, en orden de impacto:

1. **Quién soy (3 líneas, primera persona, sin foto).** Qué hace hoy, desde dónde, por qué empezó y con qué herramientas trabaja (n8n, Telegram, Google Sheets). Va como bloque breve antes del contacto o como línea en el hero. **Es la ausencia más grave:** el posicionamiento es "una persona" y la página no tiene ninguna.
2. **Qué NO hago.** Una lista corta con el mismo peso visual que las promesas: "No vendo software ni licencias. No te amarro a un plan mensual. No toco tu contabilidad ni tus claves bancarias. No hago páginas web ni redes sociales." Los límites dan confianza porque nadie los inventa para vender.
3. **Qué necesito de ti** (en los carriles de Cómo trabajo): tiempo, accesos que *tú* creas y *tú* controlas, datos de prueba.
4. **Qué pasa tras enviar** (en la tarjeta del formulario, ver §3).
5. **FAQ corta de 4 preguntas** en `<details>` nativos, entre el caso y el contacto o bajo las promesas:
   - ¿Tengo que saber de computación? → No; si sabes mandar un mensaje, basta.
   - ¿Qué pasa si algo deja de funcionar? → Te aviso yo o me avisas; la planilla sigue siendo tuya.
   - ¿Dónde quedan mis datos? → En tus cuentas de Google/Telegram, no en las mías.
   - ¿Cuánto cuesta? → Depende del tamaño. Te doy un valor cerrado antes de empezar, sin sorpresas. *Sin cifras.*

   Carlos debe confirmar cada respuesta (TODO).
6. **Herramientas nombradas.** "Uso n8n, Telegram y Google Sheets" es verificable y le da al dueño algo que buscar. Hoy solo dice "herramientas que ya conoces".
7. **Fecha del caso**, si es cierta: "Funcionando desde {mes año}". Así "real" pasa a ser verificable en el tiempo sin identificar al cliente.

Nada de esto requiere foto, logos, testimonios ni cifras.

---

## 6. Lista priorizada

### P0 (lo que más mueve confianza y memoria)

| # | Archivo / sección | Cambio | Verificación | Riesgo |
|---|---|---|---|---|
| P0-1 | `global.css` h1, h2 | h1 `clamp(2.5rem,1.5rem+3.4vw,4.25rem)`; h2 `clamp(1.875rem,1.3rem+1.8vw,2.5rem)`; `.frase` sin cambios. | A 1440, h1 ≥ 64px, h2 ≤ 40px, frase 52px. A 390 el h1 no pasa de 4 líneas. | Bajo. Revisar que "Qué puedo dejar andando solo" no quede en 1 línea demasiado larga (22ch lo contiene). |
| P0-2 | `index.astro` + `global.css` caso | Eje horario 08-20 compartido con dos carriles (Antes con tramo vacío hasta 17:30, Ahora con pista sólida desde 08:14), posiciones proporcionales, texto 1.25rem. En móvil, eje vertical. Lista `<ol>` semántica debajo o como texto accesible. | A 1440 la pista "Ahora" empieza a ≤ 3% del ancho y la de "Antes" en ~79%. Un lector de pantalla lee las 6 horas en orden. | Medio: posicionamiento absoluto en móvil y contraste de las reglas sobre noche (`--noche-regla` 5.83:1 ya medido). Las horas siguen rotuladas como aproximadas. |
| P0-3 | `index.astro` nuevo bloque "Quién soy" | 3 líneas en primera persona + herramientas + ciudad, sin foto, antes de Conversemos (o como columna izquierda de Cómo trabajo). Contenido escrito/confirmado por Carlos. | Existe un párrafo con "Soy Carlos" y la ciudad. Sin `TODO(Carlos)` pendiente al publicar. | Bajo en diseño. Riesgo de honestidad si se redacta sin Carlos: **no inventar trayectoria**. |
| P0-4 | `index.astro` contacto | "Qué pasa después" en 3 pasos bajo el botón; promesas reordenadas (precio al final); línea "¿Prefieres correo?". | El botón Enviar y los 3 pasos caben en 1440×900. "Se cotiza aparte" es la última promesa. | Bajo. Los plazos ("30 minutos", "uno o dos días") los confirma Carlos. |
| P0-5 | `main.js` demo | El bucle arranca desde el estado final y espera unos 4 s antes de vaciar la tabla. | Al cargar, la tabla nunca se ve vacía antes de 3 s. Con reduced-motion no hay cambios. | Bajo. Respetar WCAG 2.2.2 (la pausa ya existe). |

### P1 (quitar lo genérico de la segunda mitad)

| # | Archivo / sección | Cambio | Verificación | Riesgo |
|---|---|---|---|---|
| P1-1 | Cómo trabajo | Dos carriles "Yo hago / Tú haces" por paso, con duración aproximada en los pasos 1 y 3. En móvil, una línea vertical con la tarea del cliente en un recuadro azul pálido. | Cada paso tiene 2 líneas etiquetadas. No hay texto de más de 2 líneas por celda a 1440. | Medio. Más contenido: vigilar que no se convierta en tabla densa. Las duraciones deben ser verdaderas. |
| P1-2 | Nuevo bloque "Qué no hago" | 4 líneas cortas, mismo estilo que las promesas, junto a ellas o en Cómo trabajo. | Existen 4 ítems en negativo, sin íconos. | Bajo. Cuidar que no suene defensivo: frases cortas y en tono llano. |
| P1-3 | FAQ | 4 `<details>` nativos (sin JS), radio 10px y borde 1px, entre el caso y el contacto. | Funciona con teclado y sin JS. Ninguna respuesta incluye cifras de precio. | Bajo. Suma una sección, así que la longitud sube unos 300px. Aceptable. |
| P1-4 | Bandas (`index.astro` clases) | Quitar `banda-tinte` de "Qué puedo" y fusionar visualmente con el problema (padding-top reducido). Secuencia tinte/blanco/blanco/noche/tinte. | Entre hero y caso hay un solo cambio de fondo. | Bajo. Comprobar que `.carril-t` y `.aviso` (azul pálido) siguen leyéndose sobre la hoja blanca. Sí, porque la hoja es blanca de todos modos. |
| P1-5 | Elige tu pega | "Pausar" y la nota bajo la lista (cols 1-6); guía en 1.0625rem tinta; cierre más cerca; quitar selección por hover. | A 1440, "Pausar" queda a ≤ 24px de la última regla de la lista. El panel no cambia al pasar el mouse. | Bajo. Quitar hover reduce la "magia" en desktop, pero la vuelta automática la conserva. |
| P1-6 | Pegas "Lo puedo armar" | Una línea de "cómo lo armaría" con las herramientas reales bajo cada estado o en `.pega-honesto`. | Las 3 pegas no construidas nombran herramientas concretas. | Bajo. No prometer integraciones que Carlos no domina (p. ej. facturación: elegir el proveedor real o decir "con tu sistema de facturación"). |

### P2 (pulido)

| # | Archivo / sección | Cambio | Verificación | Riesgo |
|---|---|---|---|---|
| P2-1 | Hero móvil | Ocultar la segunda oración del lead bajo 768px para que asome la primera fila de la tabla. | A 390×844 se ve al menos una fila de datos de la demo. | Bajo. Contenido duplicado en "Qué puedo", no se pierde información. |
| P2-2 | Elige tu pega móvil | Nombres `clamp(1.5rem, …)` y `min-height` de 56px por debajo de 768px. | A 390, el panel activo empieza a ≤ 1 pantalla del h2 de la sección. | Bajo. Mantener objetivos ≥ 44px. |
| P2-3 | Escena Registros | Distinguirla del hero: destacar la separación de datos en columnas y acortar la parte del mensaje. | Ningún nombre ni hora se repite entre el hero y la escena. | Bajo. |
| P2-4 | Pie | Agregar ciudad y la línea "Automatización para pymes". | El pie sigue en ≤ 2 líneas a 390. | Bajo. |
| P2-5 | Cabecera | Ocultar el "Conversemos" de la cabecera mientras el CTA del hero está visible (IntersectionObserver ya disponible) o dejarlo como enlace de texto. | En el primer pantallazo hay un solo botón azul sólido. | Bajo. No esconderlo con `display:none` para el teclado sin lógica de foco: usar `visibility` + `aria-hidden` sincronizados, o simplemente cambiarlo a enlace de texto (más simple). |
| P2-6 | `DESIGN.md` | Quitar los tokens muertos (`talonario`, `copia-amarilla`, `sello`, `rounded.campo: 2px`, cuerpo en Bitter en el frontmatter) y registrar la nueva escala y los cortes de banda. | El frontmatter coincide con `global.css`. | Nulo. |
| P2-7 | Verificación | Capturar con `astro build && astro preview` para descartar el blanco bajo el pie (barra de dev). | La página termina en el pie. | Nulo. |

### Lo que no hay que hacer
Nada de tarjetas con sombra para la FAQ, íconos de check en "Qué no hago", contadores de horas ahorradas ni foto o avatar de iniciales. La confianza nueva sale de **texto llano en primera persona y reglas claras**; la memoria nueva sale del **eje horario del caso**. Todo lo demás se queda como está.
