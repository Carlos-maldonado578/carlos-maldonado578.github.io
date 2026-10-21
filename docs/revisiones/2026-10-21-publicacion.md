# Publicación — 2026-10-21

Estado: el formulario ya está probado de punta a punta por Carlos (script de Google publicado, PowerShell `ok: True`, página local con fila + Telegram + correo). Toca publicar.

Decisión de Carlos: **Claude Code ejecuta todo lo que pueda** (subir la rama, PR, merge a `main`, configurar GitHub, deploy y verificación) y al final le informa **qué logró y qué no**, con los pasos manuales exactos para lo que no pudo.

Datos:
- Repo: `Carlos-maldonado578/carlos-maldonado578.github.io`. Rama de trabajo `conversion-v2` (47 commits sobre `main`, **no subida** a GitHub). `origin/main` es ancestro de `conversion-v2`: el merge es fast-forward, sin conflictos.
- URL del formulario (pública, no es secreto): `https://script.google.com/macros/s/AKfycbzdwubiUQLj22gWJ2iYNVtVOL7xkW_x15bN23MkYtv8gV0RVQYk2tzF6xqIn0lzbnUbBQ/exec`
- Nota: en `.git/` puede haber un archivo `stale-maintenance-lock` movido por una revisión externa; no afecta y se puede borrar.

## Instrucciones (en orden; si un paso falla, detente en ese paso y repórtalo)

### 0. Antes de empezar
- `git status`: nada pendiente salvo carpetas de trabajo no versionadas (`.claude/`, `design/revision/`). **No** subas `.env` (ya está ignorado).
- `npm run build`, `npx playwright test` y `npm run test:gs` en verde.
- `gh auth status`: si `gh` no está instalado o no hay sesión, haz lo que se pueda con `git` y deja los pasos de GitHub como manuales en el informe.

### 1. Subir la rama y abrir el PR
- `git push -u origin conversion-v2`.
- `gh pr create --base main --head conversion-v2` con título "Rediseño de conversión, formulario con Google Sheets y SEO" y un cuerpo corto que resuma las fases (enlaza los archivos de `docs/revisiones/`). Termina el cuerpo con la línea de atribución que corresponda.

### 2. Configurar GitHub
- Variable del repositorio: `gh variable set PUBLIC_WEBHOOK_URL --body "<URL de arriba>"` (es **variable**, no secreto: el workflow la lee como `vars.PUBLIC_WEBHOOK_URL`).
- GitHub Pages con fuente **GitHub Actions**: revisa con `gh api repos/{owner}/{repo}/pages`. Si no existe o usa "deploy from a branch", cámbialo (`gh api -X POST/PUT .../pages` con `build_type=workflow`). Si la API no lo permite, déjalo como paso manual: Settings → Pages → Source: GitHub Actions.

### 3. Merge a `main`
- Merge del PR **fast-forward o merge commit**, sin squash (se conserva el historial de las fases): `gh pr merge --merge` o, si se prefiere fast-forward, `git checkout main && git merge --ff-only conversion-v2 && git push origin main`.
- Deja `conversion-v2` en el remoto (no la borres).

### 4. Deploy
- `gh workflow run deploy.yml --ref main` y sigue la ejecución (`gh run watch`).
- Si falla, copia el error exacto en el informe. No reintentes más de una vez sin entender la causa.

### 5. Verificación en producción (`https://carlos-maldonado578.github.io/`)
- La página carga con el diseño nuevo (no la versión antigua de `main`). Si aparece la antigua, espera 1-2 min y fuerza recarga.
- Responden: `/og.png`, `/apple-touch-icon.png`, `/favicon.svg`, `/robots.txt`, `/sitemap.xml`, y una URL inexistente muestra la 404 nueva.
- El JS publicado contiene la URL del formulario (`/exec`), o sea, la variable llegó al build.
- **Un envío real** con Playwright contra producción, esperando más de 3 s antes de enviar, con nombre "Prueba publicación" y contacto `publicacion-<fecha-hora>@ejemplo.cl`. Debe mostrar "Listo, Prueba publicación…". Carlos confirma después que llegaron la fila, el Telegram y el correo.
- Capturas de producción a 375 y 1440 en `design/publicacion/`.

### 6. Informe para Carlos
Completa el Resultado de este archivo, en lenguaje simple, con dos listas:
- **Logrado:** cada paso con su evidencia (URL del PR, enlace a la ejecución del workflow, URL publicada).
- **No logrado / te toca a ti:** cada paso pendiente con instrucciones exactas (dónde hacer clic o qué comando correr) y por qué no se pudo.
Y los pasos que siguen de `docs/publicacion.md` (6: probar cómo se ve el enlace al compartir; 7: Google Search Console).

## Resultado
**En una frase:** la página nueva ya está publicada en https://carlos-maldonado578.github.io/ y el formulario funcionó en producción. Falta que tú confirmes que llegaron la fila, el Telegram y el correo, y dos pasos que solo puedes hacer tú (compartir el enlace y Search Console).

### Logrado

1. **Verificaciones previas.** Build, `npm run test:gs` (19) y los tests de Playwright pasan (120 pasan y 8 omitidos; en una primera corrida salieron 119 sin ningún fallo listado y no pude reproducirlo). No había secretos en lo que se subió (revisé las 47 confirmaciones: solo el token falso de las pruebas). `gh` estaba instalado y con sesión.
2. **Rama subida y PR abierto:** https://github.com/Carlos-maldonado578/carlos-maldonado578.github.io/pull/1 (queda cerrado como "merged" al hacerse el merge).
3. **Configuración de GitHub.**
   - Variable `PUBLIC_WEBHOOK_URL` creada en el repositorio con la URL `/exec` (variable, no secreto).
   - GitHub Pages estaba en "deploy from a branch" (`main`); lo cambié a **GitHub Actions** (`build_type=workflow`).
4. **Merge a `main`:** fast-forward, sin squash, historial de las fases intacto (`main` pasó de `a0beab3` a `4dd8f17`). La rama `conversion-v2` sigue en GitHub.
5. **Deploy.** El primer intento **falló**: el workflow usaba Node 20 y Astro 7 exige Node 22.12 o superior ([ejecución fallida](https://github.com/Carlos-maldonado578/carlos-maldonado578.github.io/actions/runs/39618079270)). Corregí `deploy.yml` (`node-version: 22`, commit `e56f2c0` directo en `main`) y el segundo intento salió bien ([ejecución exitosa](https://github.com/Carlos-maldonado578/carlos-maldonado578.github.io/actions/runs/39618308684)).
6. **Verificación en producción** (https://carlos-maldonado578.github.io/):
   - Carga el diseño nuevo (título "Carlos Maldonado · Automatización para pymes en Santiago", ícono nuevo, ejemplos dentro del caso, FAQ con tarjetas).
   - Responden con 200: `/og.png`, `/apple-touch-icon.png`, `/favicon.svg`, `/robots.txt` y `/sitemap.xml`. Una dirección inexistente muestra la 404 nueva ("Esta página no existe.") con `noindex`.
   - El JavaScript publicado contiene la URL del formulario (`script.google.com/.../exec`): la variable sí llegó al build.
   - **Envío real** desde producción con Playwright (esperando 4 s antes de enviar): nombre "Prueba publicación", contacto `publicacion-202610211439@ejemplo.cl`. La página mostró **"Listo, Prueba publicación. Recibí tu mensaje."**, sin errores de consola. La petición `POST` a Google respondió con redirección (302) y la página la siguió bien hasta la respuesta 200: la redirección de Apps Script funciona.
   - Capturas de producción en `design/publicacion/` (`produccion-375.png`, `produccion-1440.png`, `envio-1440.png`).

### No logrado / te toca a ti

1. **Confirmar el envío de prueba.** No tengo acceso a tu planilla, tu Telegram ni tu correo, así que no puedo ver que haya llegado. Revisa: en la planilla "Contactos web", hoja `Contactos`, una fila "Prueba publicación" con estado `Nuevo`; en Telegram, un mensaje "Nuevo contacto web"; y en tu correo, "Nuevo contacto web: Prueba publicación". **Ojo:** mi primer intento de verificación se cortó por un error de mi propio script justo al recibir la respuesta, así que probablemente hay **dos filas de prueba** (con contactos `publicacion-2026102114…@ejemplo.cl`). Bórralas cuando las veas. Si no llegó nada o la hoja `Errores` tiene filas, avísame con lo que diga.
2. **Probar cómo se ve el enlace al compartir** (paso 6 de `docs/publicacion.md`):
   - Entra a https://developers.facebook.com/tools/debug/ , pega `https://carlos-maldonado578.github.io/` y pulsa "Depurar" (luego "Volver a extraer" si muestra algo viejo). Debe verse la imagen de "Tu planilla se llena sola." (1200×630).
   - Haz lo mismo en https://www.linkedin.com/post-inspector/ .
   - Envíate el enlace por WhatsApp (a ti mismo) y mira la vista previa. WhatsApp guarda la imagen en caché: si ves otra, pruébalo con `?v=1` al final del enlace.
   No pude hacerlo: son herramientas con tu inicio de sesión y WhatsApp no tiene API para eso.
3. **Google Search Console** (paso 7): en https://search.google.com/search-console elige "Prefijo de URL", escribe `https://carlos-maldonado578.github.io/`, verifica con la opción de etiqueta HTML o de archivo (me dices cuál y la preparo), y en "Sitemaps" envía `sitemap.xml`. Requiere tu cuenta de Google.
4. **Decisiones/avisos menores:**
   - El archivo `.git/stale-maintenance-lock` de la nota existía y no afectó; no lo borré.
   - La rama local `rediseno-talonario` existe desde antes; no la toqué.
   - GitHub avisa que `actions/checkout@v4` y otros usan Node 20 (obsoleto): es solo un aviso, el deploy funciona.
