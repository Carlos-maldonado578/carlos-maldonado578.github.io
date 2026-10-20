# Copy del sitio (sincronizado con la página final, Fase 6)

Fuente de verdad del texto. Todo cambio de texto en la página se refleja aquí.

Voz: Carlos en primera persona, chileno profesional, "tú" (sin voseo). Tono: claro, cercano, sobrio.
Evitar: jerga sin traducir (n8n, servidor, API), frases de plantilla, exclamaciones, cifras inventadas,
tono de agencia o de lujo. "Pega" no va en titulares, etiquetas ni botones (se usa "tarea").

Propuesta de valor: dejo andando solas las tareas repetitivas de tu pyme (registros, pedidos, avisos)
con las herramientas que ya usas, para que te enteres a tiempo sin anotar a mano.

Reglas fijas:
- CTA único en toda la página: **Cuéntame tu caso** (hero, final del caso real tras los ejemplos, formulario).
  Cabecera: el botón aparece solo cuando el CTA del hero sale de pantalla.
- Plazo de respuesta: 1 día hábil. Primera conversación: llamada agendada o videollamada, sin costo.
  No se ofrece presencial en la página.
- WhatsApp: no se ofrece como canal. Solo aparece en un ejemplo y en la FAQ.
- El caso real no dice dónde corre ni nombra herramientas (sin "n8n").
- **"Datos con respaldo" no se publica** hasta que haya un respaldo nocturno funcionando de los sistemas que dejo a
  clientes (la frase habla de esos sistemas, no del formulario de contacto, que guarda en una planilla de Google).
  Hoy no aparece en la página (solo hay un `TODO(Carlos)` en `index.astro`, en Quién soy).
- Sin cifras, precios, reseñas ni clientes inventados. El caso real tiene un `TODO(Carlos)` abierto: cuántas personas
  registran y cuánto tomaba juntar las hojas.

---

## Metadatos

- **Título:** Carlos Maldonado · Automatización para pymes en Santiago
- **Descripción (≤155):** Tu equipo manda un mensaje y el dato queda en tu planilla. Automatizo registros y avisos para pymes en Santiago. Primera conversación sin costo.
- **Open Graph / Twitter:** mismo título y descripción; `og:site_name` "Carlos Maldonado"; imagen `og.png` 1200×630 (texto alternativo: "Carlos Maldonado. Tu planilla se llena sola. Automatización para pymes en Santiago.").
- **JSON-LD** `ProfessionalService`: nombre "Carlos Maldonado · Automatización para pymes"; Santiago, Chile; fundador Carlos Maldonado, "Desarrollador"; sin teléfono, precios ni reseñas.
- **404:** "Esta página no existe." + enlace "Volver al inicio".

## 0. Cabecera

Un solo enlace al inicio (ícono mensaje-celda + **Carlos *Maldonado*** + descriptor "Automatización para pymes", este
último desde 768px) · [Cuéntame tu caso] (visible solo tras salir del hero).

## 1. Hero

# Tu planilla se llena *sola*.

Tu equipo manda un mensaje y el dato queda en la planilla. Al final del día te llega el resumen. Yo lo armo todo.

[Cuéntame tu caso]  ·  Mira cómo funciona (enlace al caso real)
Primera conversación sin costo. Te respondo dentro de 1 día hábil.

Sin etiqueta sobre el título. Ilustración: Telegram, Formulario y Correo → Planilla de Google → Resumen y Aviso
(texto alternativo: "Mensajes de Telegram, un formulario o el correo llegan a una planilla de Google, y de la planilla
salen un resumen y un aviso.").

## 2. Caso real y ejemplos

## Hoy se anota a mano. Podría anotarse solo.

Chip: `Cliente real, datos anonimizados`

Línea de tiempo 08:00–20:00.
- **Antes:** 08:00 Cada uno anota en su hoja. · Sin saber cuánto se produjo. · 17:30 Alguien junta las hojas. · 20:00 Recién ahí sabes el total.
- **Ahora:** 08:14 Juan manda “120 cajas” y la planilla se llena. · Ya está en la planilla. · 18:00 Te llega el resumen del día.

Tras un filete, rótulo `Ejemplo · Así se vería en tu negocio` (aún no corren en un cliente):
- **Pedidos** · Antes: Te preguntan por WhatsApp en qué va el pedido. · Ahora: Lo ves en la planilla, con su estado.
- **Stock** · Antes: Te enteras de que falta harina cuando ya no queda. · Ahora: Te avisan cuando quedan 3 sacos.

[Cuéntame tu caso]

## 3. Cómo trabajo

1. **Conversamos.** La primera conversación es sin costo.
2. **Elegimos qué automatizar.** Partimos por una parte chica: lo que más tiempo te quita.
3. **Lo construyo.** Lo pruebas con tus datos reales y apruebas lo importante.
4. **Queda andando.** Yo lo mantengo, por una mensualidad que conoces antes de empezar.

**Qué no hago**
- No vendo software ni licencias.
- No te pido las claves de tu banco.
- No uso sistemas que te dejen sin acceso a tus datos.

## 4. Quién soy

Soy Carlos Maldonado, desarrollador. Traigo a tu pyme el mismo cuidado que exige un sistema bancario.

Ficha: Santiago · 5 años en bancos y empresas de pagos · Trabajo solo, hablas directo conmigo.

(La frase "datos con respaldo y avisos cuando algo falla" se agrega solo cuando exista ese respaldo nocturno de los sistemas de clientes.)

## 5. Antes de escribirme

Dos tarjetas destacadas:
- **¿Cuánto cuesta?** · *Sabes el valor antes de empezar* · Un pago por armarlo y una mensualidad. Te digo los dos en la primera conversación.
- **¿De quién son los datos?** · *La planilla es tuya* · Si un día dejamos de trabajar juntos, te la quedas con todos tus datos.

Cuatro preguntas en 2×2:
- **¿Necesito saber de computación?** No. Si mandas un mensaje por el celular, basta. Al entregar te dejo todo explicado por escrito.
- **¿Y si algo falla?** Lo reviso apenas me avisas. Tus datos siguen en tu planilla.
- **¿Sirve si uso Excel o WhatsApp?** Parto de lo que usas. Si no se puede conectar, te lo digo de inmediato.
- **¿Cuánto demora?** Depende de lo que necesites. Parto por una parte chica para que veas resultados pronto.

Cierre: enlace a #contacto, "¿Tu duda no está? Escríbeme".

## 6. Contacto

## Cuéntame qué te quita tiempo

Dos líneas bastan. Te respondo en 1 día hábil.

- No tienes que preparar nada.
- Te digo con honestidad si te sirve.
- La primera conversación es sin costo.

Campos:
- **¿Qué haces hoy a mano?** (ayuda: "Por ejemplo: anoto los pedidos a mano y después los paso a una planilla.")
- **Tu nombre**
- **¿A qué correo o teléfono te respondo?**

[Cuéntame tu caso]
Uso tus datos solo para responderte.

Éxito: *Listo, {nombre}. Recibí tu mensaje.* + mini planilla (Hora · Estado: Recibido) + "Te escribo a {contacto} dentro de 1 día hábil y, si te sirve, agendamos una llamada o videollamada. ¿Te equivocaste? Escríbeme a CORREO."
Error: *No se pudo enviar.* Tu mensaje sigue en el formulario: reintenta o escríbeme a CORREO.
Sin JavaScript: "Este formulario necesita JavaScript. Escríbeme directo a CORREO."

## Pie

Carlos Maldonado · Automatización para pymes · Santiago, Chile · carlos.automatiza.tupyme@gmail.com
