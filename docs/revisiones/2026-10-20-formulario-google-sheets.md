# Formulario de contacto con Google Sheets — 2026-10-20

## Decisiones de Carlos (tomadas en el chat de revisión)
- El formulario **solo recibe contactos**, al **menor costo posible**: US$0.
- **Se descarta n8n en Railway** para esto, y también el servidor personal (prodesk): si se cae se pierden contactos, habría que exponerlo a internet y ahí corre el sistema del cliente real.
- Receptor: **Google Apps Script** publicado como aplicación web. La "base de datos" es una **planilla de Google**.
- Por cada contacto válido: **fila en la planilla + aviso a Telegram + correo** a `carlos.automatiza.tupyme@gmail.com`.
- La página sigue en **GitHub Pages** (US$0). Sin dominio propio por ahora.
- Copia de la planilla al servidor personal: **no** por ahora (queda como idea futura en `docs/publicacion.md`).

Claude Code escribe el código y la documentación. **Carlos** crea la planilla, el bot de Telegram y publica el script con su cuenta de Google (Claude Code no tiene acceso a esa cuenta). Nada se publica en GitHub Pages en esta revisión.

## Instrucciones

### 1. Script de Google (`integraciones/formulario/`)
- `Code.gs` con `doPost(e)`:
  - Lee el cuerpo como JSON (`e.postData.contents`) con los campos que ya envía la página: `nombre`, `contacto`, `mensaje`, `hp`, `t`.
  - **Spam:** si `hp` (campo trampa `sitio_web`) viene con texto, o `t` < 3000 ms, responde `{ok:true}` **sin guardar ni avisar** (que el bot no sepa que fue descartado).
  - **Validación:** mismas reglas que `validar()` de `main.js` y largos máximos (nombre 100, contacto 150, mensaje 2000). Si no cumple, `{ok:false}`.
  - **Límite de envíos repetidos:** `CacheService` con clave por contacto normalizado: máximo 1 envío cada 60 s y 5 por hora por contacto; más un tope global de 30 por hora. Si se excede, `{ok:true}` sin guardar (mismo criterio que spam).
  - **Inyección de fórmulas en Sheets:** todo valor que empiece con `= + - @` o tabulación se guarda con un apóstrofo delante.
  - Guarda la fila: fecha y hora (zona `America/Santiago`), nombre, contacto, mensaje, estado "Nuevo". Encabezados en la primera fila; usa `LockService` para no pisar filas.
  - Aviso a Telegram (`UrlFetchApp` → `sendMessage`) y correo (`MailApp.sendEmail`) con nombre, contacto y mensaje en texto plano. Si Telegram o el correo fallan, **la fila igual queda guardada** y se registra el error en una hoja `Errores`.
  - Respuesta con `ContentService` en JSON.
- **Secretos fuera del código:** token del bot, chat_id, ID de la planilla y correo de aviso se leen de `PropertiesService.getScriptProperties()`. El repo no lleva ningún token.
- Función `probar()` que simula un envío para que Carlos lo pruebe desde el editor.
- `appsscript.json` con zona horaria `America/Santiago` y solo los permisos necesarios.

### 2. Guía para Carlos (`integraciones/formulario/README.md`)
Pasos numerados y cortos, en español, sin asumir conocimiento de Apps Script:
1. Crear la planilla "Contactos web" y copiar su ID.
2. Crear el bot con @BotFather, obtener el token y el chat_id.
3. Crear el proyecto de Apps Script, pegar `Code.gs` y `appsscript.json`.
4. Cargar las propiedades del script (token, chat_id, ID de planilla, correo).
5. Ejecutar `probar()` y autorizar los permisos.
6. Implementar como **aplicación web**: ejecutar como "Yo", acceso "Cualquier usuario". Copiar la URL `/exec`.
7. Probar desde la página local con `PUBLIC_WEBHOOK_URL` en `.env`.
8. Cómo publicar una nueva versión del script sin cambiar la URL.

### 3. Página
- En `main.js`, el `fetch` envía `Content-Type: text/plain;charset=utf-8` (Apps Script no responde la verificación previa de CORS que dispara `application/json`). El cuerpo sigue siendo el mismo JSON.
- Considera éxito solo si la respuesta es `{ok:true}`. Si no, muestra el error con el correo de respaldo, como hoy.
- Revisa que el `fetch` siga la redirección de Apps Script (`redirect: 'follow'`, que es el valor por defecto) y que el corte de 10 s alcance. Si en las pruebas Apps Script tarda más, súbelo a 15 s.
- Ajusta los tests del formulario (tipo de contenido y respuesta `{ok:false}`).

### 4. Documentación
- **PRODUCT.md:** reemplaza lo de n8n en Railway para el formulario por esta decisión (Apps Script + planilla + Telegram + correo, US$0). El caso real sigue en prodesk; "Cómo trabajo" no cambia.
- **`docs/publicacion.md`:** reescribe los pasos 1 a 3 según la guía nueva. El paso del respaldo nocturno ya no aplica al formulario. Agrega como idea futura la copia nocturna de la planilla al servidor personal.
- **`deploy.yml`:** actualiza el comentario (la URL es la de Apps Script, no Railway).
- **`copy.md` / página:** la frase "datos con respaldo" sigue sin publicarse (se refiere a los sistemas de clientes, no al formulario).

## Criterios de aceptación
- `npm run build` ok; tests pasan.
- `Code.gs` revisado por `revisor-landing` o por una revisión de seguridad propia: sin secretos en el repo, inyección de fórmulas cubierta, spam y límites cubiertos.
- La guía se puede seguir de punta a punta sin conocimiento previo.
- Commit completando el Resultado. Carlos hace los pasos de la guía después.

## Resultado
**Commit:** "Formulario: Google Apps Script + planilla + Telegram + correo" (rama `conversion-v2`, sobre `15006da`). No se publicó nada ni se tocó la cuenta de Google.

**Hecho**
1. `integraciones/formulario/Code.gs` (`doPost`): spam (`hp` o `t` < 3 s → `{ok:true}` sin guardar ni avisar), validación igual a `validar()` de `main.js` más largos máximos (100/150/2000) y solo entradas de tipo texto, límites con `CacheService` (1 por 60 s y 5 por hora por contacto normalizado; 30 por hora global; excedido → `{ok:true}` sin guardar), `LockService`, fórmulas neutralizadas (apóstrofo + formato texto), fila con fecha en `America/Santiago` y estado "Nuevo", aviso a Telegram (texto plano) y correo, errores a la hoja `Errores` sin escribir el token, `probar()` para el editor. Secretos solo en Propiedades del script; el repo no lleva ninguno. `appsscript.json` con los tres permisos necesarios y acceso `ANYONE_ANONYMOUS`.
2. `integraciones/formulario/README.md`: guía de 8 pasos para alguien sin conocimiento previo (planilla, bot, proyecto, propiedades, `probar()`, publicar, prueba con `curl` y desde la página local, nueva versión sin cambiar la URL), tabla de errores de Telegram y qué hacer si se filtra el token.
3. `src/scripts/main.js`: `Content-Type: text/plain;charset=utf-8`, éxito solo con `{ok:true}` (otra cosa es fallo con el correo de respaldo), corte subido a 15 s por el arranque en frío de Apps Script. `.env.example` creado.
4. Pruebas: `npm run test:gs` (15 pruebas del script en Node con simulacros de Google) y tests de formulario ajustados (tipo de contenido, `{ok:false}`, JSON ajeno, texto, HTML).
5. Documentación: `PRODUCT.md` (decisión Apps Script, US$0, se descartan n8n en Railway y el servidor personal), `docs/publicacion.md` (pasos 1 a 3 reescritos; copia nocturna de la planilla como idea futura), comentario de `deploy.yml`, `README.md`, `copy.md` y `tests/` sin menciones a n8n/Railway para el formulario. "Datos con respaldo" sigue sin publicarse (ahora ligado a los sistemas de clientes).

**Revisión de seguridad (`revisor-landing`) y qué se corrigió:** un fallo al guardar ya no consume el cupo (los contadores se suben después de guardar); alerta única por Telegram y en `Errores` al llegar al tope global; normalización de contactos (`+etiqueta`, mayúsculas, formatos de teléfono, caracteres invisibles); entradas que no son texto se rechazan; encabezados también en una hoja vacía ya existente; cerrojo de 8 s; causa del error de Telegram en `Errores`; guía con la "Hoja 1" vacía, el acceso "sin inicio de sesión", la URL `/exec` pública y la prueba con `curl`.

**Verificado:** `npm run build` ok; suite completa de Playwright y `npm run test:gs` pasan. **No verificado:** la redirección 302 de Apps Script y el comportamiento real con Google/Telegram (solo se pueden probar con tu cuenta, guía paso 6 y 7).

**Para decidir**
- Con el tope de 30 por hora (y el de 5 por hora por contacto) la página dice "Listo, recibí tu mensaje" aunque no se guardó, como pedía esta revisión. Alguien que conozca la URL pública podría agotar el tope y hacer que contactos reales se pierdan sin que el visitante lo note (solo te llega la alerta única). La alternativa es responder `{ok:false}` en esos dos topes, para que el visitante vea tu correo de respaldo. Es un cambio de una línea en `Code.gs`.
- Opcional: crear el script dentro de la planilla (Extensiones → Apps Script) reduce el permiso a esa sola planilla; es un cambio de diseño.

**Pendiente (de Carlos):** seguir la guía (pasos 1 a 7) con su cuenta de Google y Telegram.
