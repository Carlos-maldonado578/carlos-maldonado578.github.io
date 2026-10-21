# Formulario de contacto: Google Apps Script + planilla + Telegram + correo

Costo: **US$0**. El formulario de la página (GitHub Pages) envía el contacto a un script de Google. Por cada contacto válido el script:

1. agrega una fila a la planilla **Contactos web**,
2. te manda un mensaje por **Telegram**,
3. te manda un **correo** a `carlos.automatiza.tupyme@gmail.com`.

Si Telegram o el correo fallan, la fila igual queda guardada y el error se registra en la hoja `Errores`. Si el script entero falla, la página muestra tu correo de respaldo para que el visitante te escriba directo.

Archivos de esta carpeta: `Code.gs` (el script), `appsscript.json` (permisos y zona horaria), `Code.test.mjs` (prueba que se corre en tu computador con `npm run test:gs`; no toca Google).

**El script vive dentro de la planilla** (script "vinculado"): solo puede leer y escribir **esa** planilla, no las demás de tu cuenta de Google (puede que tengas planillas de clientes). Por eso el permiso es `spreadsheets.currentonly` y no hay que copiar ningún ID.

**Importante:** el token del bot, el chat_id y el correo de aviso **no van en el código ni en GitHub**. Se cargan en el paso 4, dentro de Google.

Necesitas: tu cuenta de Google y la app de Telegram.

---

## 1. Crear la planilla

1. Entra a <https://sheets.google.com> y crea una planilla en blanco.
2. Ponle de nombre **Contactos web** (arriba a la izquierda).

No hace falta escribir nada en la planilla: el script crea las hojas `Contactos` y `Errores` con sus encabezados la primera vez. Verás además una pestaña vacía llamada **Hoja 1** (o *Sheet1*): puedes **borrarla** o **renombrarla a `Contactos`** (el script le pone los encabezados si está vacía).

**No borres ni muevas esta planilla**: el script vive dentro de ella y se iría con ella.

## 2. Crear el bot de Telegram

1. En Telegram busca **@BotFather** (el que tiene la marca de verificado) y escríbele `/newbot`.
2. Te pide un nombre (por ejemplo `Contactos web Carlos`) y un usuario que termine en `bot` (por ejemplo `carlos_contactos_bot`).
3. BotFather te entrega el **token**: una línea parecida a `123456789:AAH...`. Guárdalo en el bloc de notas. **Es una clave: no la pegues en el chat, en GitHub ni en el código.**
4. Abre tu bot (el enlace que te da BotFather) y escríbele cualquier cosa, por ejemplo `hola`. Sin este paso el bot no puede escribirte.
5. Obtén tu **chat_id**: en el navegador abre `https://api.telegram.org/bot` + tu token + `/getUpdates` (todo junto, sin espacios). Busca `"chat":{"id":` y copia el número que sigue (puede ser negativo si es un grupo). Guárdalo. Si ves `"result":[]` (vacío), es que aún no le escribiste `hola` al bot (paso 4): escríbele y recarga la página.

## 3. Crear el script dentro de la planilla

1. Abre la planilla **Contactos web** y, en el menú de arriba, pulsa **Extensiones** → **Apps Script**. Se abre el editor en una pestaña nueva (no entres a script.google.com: el script tiene que nacer desde la planilla).
2. Arriba a la izquierda pulsa el nombre "Proyecto sin título" y ponle **Formulario contacto**.
3. En el editor verás un archivo `Código.gs` con una función vacía. Borra todo su contenido. Abre `integraciones/formulario/Code.gs` de este repositorio en tu computador, selecciónalo todo (Ctrl+A), cópialo (Ctrl+C) y pégalo en el editor (Ctrl+V).
4. Ve a **Configuración del proyecto** (el engranaje, a la izquierda) y activa **Mostrar el archivo de manifiesto "appsscript.json" en el editor**.
5. Vuelve a **Editor**, abre `appsscript.json`, borra su contenido y pega el de `integraciones/formulario/appsscript.json` de este repositorio.
6. Pulsa **Guardar** (el disquete).

## 4. Cargar las claves en el script

1. En **Configuración del proyecto**, baja hasta **Propiedades de la secuencia de comandos** (en inglés: *Script properties*) y pulsa **Agregar propiedad de secuencia de comandos** tres veces. Escribe exactamente estos nombres (mayúsculas y guion bajo) y sus valores:

| Propiedad | Valor |
|---|---|
| `TELEGRAM_TOKEN` | el token del paso 2 |
| `TELEGRAM_CHAT_ID` | el chat_id del paso 2 |
| `EMAIL_AVISO` | `carlos.automatiza.tupyme@gmail.com` |

2. Pulsa **Guardar propiedades de la secuencia de comandos**.

## 5. Probar y autorizar

1. En el **Editor**, arriba elige la función **`probar`** en el menú desplegable y pulsa **Ejecutar**.
2. Google pide permisos. Pulsa **Revisar permisos**, elige tu cuenta y, cuando diga "Google no ha verificado esta app", pulsa **Configuración avanzada** → **Ir a Formulario contacto (no seguro)** → **Permitir**. Es tu propio script: pide acceso a esta planilla (solo a esta), a enviar correos y a conectarse a Telegram, que es justo lo que hace.
3. Al terminar, en el **Registro de ejecución** debe decir `Respuesta: {"ok":true}`.
4. Comprueba las tres cosas:
   - en la planilla, hoja `Contactos`: una fila "Prueba desde el editor" con estado `Nuevo`;
   - en Telegram: un mensaje "Nuevo contacto web";
   - en tu correo: "Nuevo contacto web: Prueba desde el editor" (revisa spam la primera vez).
5. Si falta algo, mira la hoja `Errores` de la planilla (se crea sola): ahí queda registrado qué falló y por qué. Para Telegram:

| Dice en `Errores` | Significa |
|---|---|
| `HTTP 401` o `HTTP 404` | el token está mal copiado (`TELEGRAM_TOKEN`) |
| `HTTP 400` "chat not found" | el chat_id está mal (`TELEGRAM_CHAT_ID`) |
| `HTTP 403` "bot can't initiate conversation" | falta escribirle `hola` al bot (paso 2.4), o lo bloqueaste |

   Si dice "Falta la propiedad del script", revisa el paso 4 (nombres exactos).

Puedes borrar la fila de prueba.

## 6. Publicar como aplicación web

1. Arriba a la derecha: **Implementar** → **Nueva implementación**.
2. En el engranaje junto a "Seleccionar tipo", elige **Aplicación web**.
3. Configura:
   - **Descripción:** `v1`
   - **Ejecutar como:** **Yo** (tu cuenta)
   - **Quién tiene acceso:** la opción **sin** inicio de sesión: **Cualquier usuario** (en inglés *Anyone*; en algunas pantallas aparece como *Cualquier persona*). **No** elijas "Cualquier usuario con cuenta de Google" (*Anyone with Google account*): obligaría al visitante a iniciar sesión y el formulario fallaría.
4. Pulsa **Implementar**. Copia la **URL de la aplicación web**: termina en `/exec`. Esa es tu `PUBLIC_WEBHOOK_URL`. Va dentro del código público de la página, así que **no es secreta**: cualquiera podría enviarte contactos falsos, y para eso están los límites del script (ver más abajo).
5. Si abres esa URL en el navegador verás un error de Google ("No se encontró la función de secuencia de comandos: doGet"). **Es normal**: la dirección solo recibe envíos del formulario, no páginas.
6. Pruébala sin la página. Reemplaza `URL` por la tuya (entre comillas). El mensaje lleva `t` alto para que el script no lo tome por un bot.

   **En Windows (PowerShell), recomendado:**

   ```powershell
   Invoke-RestMethod -Method Post -Uri "URL" -ContentType "text/plain" -Body '{"nombre":"Prueba PowerShell","contacto":"ps@ejemplo.cl","mensaje":"Prueba desde PowerShell, si llega todo funciona.","hp":"","t":10000}'
   ```

   Debe mostrar `ok : True`. (No uses `curl` en PowerShell: ahí `curl` es otro comando. Tampoco sirve en CMD por las comillas simples.)

   **En Git Bash, macOS o Linux:**

   ```
   curl -L -X POST -H "Content-Type: text/plain" -d '{"nombre":"Prueba curl","contacto":"curl@ejemplo.cl","mensaje":"Prueba desde la terminal, si llega todo funciona.","hp":"","t":10000}' "URL"
   ```

   Debe responder `{"ok":true}`.

   En ambos casos deben llegar la fila, el Telegram y el correo. Si responde HTML o un error de Google, revisa que el acceso sea "Cualquier usuario" y que la URL termine en `/exec`. Si repites la prueba con el mismo contacto en menos de un minuto, responde `{"ok":true}` pero no guarda otra fila (es el límite por contacto): usa otro contacto en cada prueba.

## 7. Probar desde la página en tu computador

1. En la carpeta del proyecto crea un archivo llamado `.env` (ya está ignorado por git) con una línea:

   ```
   PUBLIC_WEBHOOK_URL=https://script.google.com/macros/s/....../exec
   ```

2. Ejecuta `npm run dev` y abre <http://localhost:4321>.
3. Llena el formulario **esperando unos segundos** (el script descarta envíos hechos en menos de 3 segundos, como haría un bot) y pulsa **Cuéntame tu caso**.
4. Debe aparecer "Listo, …" en la página y llegar la fila, el mensaje de Telegram y el correo.
5. Prueba también el caso malo: pon una URL falsa en `.env`, reinicia `npm run dev` y envía: la página debe mostrar "No se pudo enviar" con tu correo de respaldo y conservar lo escrito.

La primera respuesta después de un rato sin uso puede tardar unos segundos (el script "despierta"); la página espera hasta 15.

## 8. Cambiar el script después (sin cambiar la URL)

Guardar el código **no** actualiza lo publicado: hay que publicar una versión nueva.

1. Edita y guarda en el editor.
2. **Implementar** → **Administrar implementaciones**.
3. Pulsa el lápiz de la implementación activa → en **Versión** elige **Nueva versión** → **Implementar**.

La URL `/exec` sigue siendo la misma. **No** uses "Nueva implementación" para cambios: eso crea otra URL.

---

## Si algo falla

- Primero mira la hoja `Errores` de la planilla y, en el editor de Apps Script, **Ejecuciones** (menú de la izquierda).
- **Se filtró el token del bot:** en Telegram escríbele a @BotFather `/revoke`, elige el bot, y copia el token nuevo en la propiedad `TELEGRAM_TOKEN` (paso 4). Las propiedades se leen en cada envío: no hace falta publicar de nuevo.
- **Te llega por Telegram "Tope de 30 contactos por hora alcanzado":** alguien está enviando muchos formularios (posible abuso). Mientras dura esa hora, los envíos siguientes **no se guardan** y quien los hace ve "No se pudo enviar" con tu correo de respaldo, así que un visitante real puede escribirte directo. Revisa la hoja `Contactos` para ver si los envíos son reales y, si hace falta, espera a la hora siguiente (el contador se reinicia solo).

## Qué hace el script con cada envío

| Caso | Respuesta | ¿Se guarda / avisa? |
|---|---|---|
| Campo trampa (`sitio_web`) con texto, o enviado en menos de 3 s | `{"ok":true}` | No (el bot no se entera) |
| Datos inválidos (mismas reglas que la página; nombre ≤100, contacto ≤150, mensaje ≤2000) | `{"ok":false}` | No |
| Más de 1 envío por minuto, o más de 5 por hora, del **mismo contacto** (mismo correo aunque cambien mayúsculas o `+etiqueta`; mismo teléfono aunque cambie el formato): es la misma persona reenviando y su primer mensaje ya quedó guardado | `{"ok":true}` | No |
| Más de **30 por hora en total** (tope global) | `{"ok":false}`: la página muestra "No se pudo enviar" con tu correo de respaldo | No. Avisa **una vez por hora** por Telegram y en la hoja `Errores` |
| Válido | `{"ok":true}` | Fila + Telegram + correo |

Las celdas se guardan como texto: un valor que empiece con `=`, `+`, `-` o `@` queda con un apóstrofo delante, para que nadie pueda meter fórmulas en tu planilla.

## Límites que conviene saber

- **Correo:** una cuenta gratuita de Google puede enviar unos 100 correos al día desde Apps Script. Con el tope de 30 contactos por hora no debería importar; si se acaba, la fila y el Telegram igual funcionan.
- **Límites de envío:** usan la memoria temporal de Google (mejor esfuerzo): frenan el abuso normal, pero no son una garantía absoluta.
- **Planilla = tu base de datos:** haz una copia de vez en cuando (Archivo → Hacer una copia). La copia automática hacia tu servidor personal queda como idea futura en `docs/publicacion.md`.
- **Si cambias de cuenta de Google o de planilla:** repite los pasos 1 a 6, porque el script vive dentro de la planilla y la planilla pertenece a la cuenta. Si copias la planilla (Archivo → Hacer una copia) el script se copia con ella, pero hay que cargar de nuevo las propiedades (paso 4) y publicarlo otra vez (paso 6): sale una URL `/exec` nueva que debes poner en `PUBLIC_WEBHOOK_URL`.
- **Pruebas del script en tu computador:** `npm run test:gs` (simula los servicios de Google; no toca tu planilla ni Telegram).
