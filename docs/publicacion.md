# Lista de publicación

Pasos que hace Carlos (no Claude Code), en orden. El deploy es siempre manual: el workflow `Deploy a GitHub Pages` (`.github/workflows/deploy.yml`) solo corre con `workflow_dispatch`.

Estado actual: sin dominio propio. URL `https://carlos-maldonado578.github.io/` y correo `carlos.automatiza.tupyme@gmail.com`. El formulario cuesta US$0: Google Apps Script + planilla de Google + Telegram + correo (ya no se usa n8n en Railway para esto).

1. **Formulario: planilla, bot y script de Google.** Sigue la guía `integraciones/formulario/README.md`, pasos 1 a 6: crear la planilla "Contactos web", crear el bot de Telegram con @BotFather, abrir Apps Script **desde la planilla** (Extensiones → Apps Script: el script queda vinculado y solo puede tocar esa planilla), pegar `Code.gs` y `appsscript.json`, cargar las tres propiedades (`TELEGRAM_TOKEN`, `TELEGRAM_CHAT_ID`, `EMAIL_AVISO`), ejecutar `probar()` y publicar como aplicación web (ejecutar como "Yo", acceso "Cualquier usuario"). Al terminar tienes una URL que termina en `/exec`. Prueba la URL sin la página con el comando de PowerShell del paso 6 de la guía.
2. **Probar el formulario en local** (paso 7 de la guía): `PUBLIC_WEBHOOK_URL` en un `.env`, `npm run dev`, un envío de prueba (debe llegar fila, Telegram y correo) y una prueba con URL falsa (debe mostrar el correo de respaldo).
3. **Variable `PUBLIC_WEBHOOK_URL`** en GitHub: Settings → Secrets and variables → Actions → Variables. Valor: la URL `/exec` del paso 1. Es pública (queda dentro del JS del sitio). El workflow falla si falta. Los secretos del bot **no** van a GitHub: viven solo en las propiedades del script de Google.
4. **Merge de `conversion-v2` a `main`.**
5. **Ejecutar el workflow Deploy** (Actions → Deploy a GitHub Pages → Run workflow) y hacer **un envío real de prueba** en producción: debe llegar la fila a la planilla, el aviso a Telegram y el correo, y el formulario debe mostrar la confirmación. Después borra la fila de prueba.
6. **Verificar la imagen para compartir** (`og.png`): depurador de compartir de Facebook y de LinkedIn (Post Inspector), y enviando el enlace por WhatsApp. Si cambias la imagen, los cachés de esas plataformas la refrescan solo desde su depurador. La plantilla es `design/og/og.html`; se regenera con `npm run og`.
7. **Google Search Console:** registrar `https://carlos-maldonado578.github.io/` y enviar `https://carlos-maldonado578.github.io/sitemap.xml`.
8. **Futuro: dominio propio.** Cambiar en un solo repaso: `site` en `astro.config.mjs`; `canonical`, `og:url`, `og:image`, `twitter:image` y el JSON-LD en `src/pages/index.astro` (constante `sitio`); `public/sitemap.xml`; `Sitemap:` en `public/robots.txt`; el correo (`correo` en `index.astro`, `copy.md`, `docs/`, el `EMAIL_AVISO` del script) y los tests de `tests/carga-seo.spec.ts` que fijan esas URLs. Después repetir los pasos 6 y 7.

## Ideas futuras

- **Copia nocturna de la planilla "Contactos web" al servidor personal.** No se hace por ahora (decisión de Carlos). Mientras tanto, haz una copia manual de vez en cuando (Archivo → Hacer una copia).
- **Frase "datos con respaldo y avisos cuando algo falla"** en Quién soy: se publica solo cuando exista un respaldo nocturno funcionando de los sistemas que dejas a clientes (no depende del formulario). Hay un test que comprueba que hoy no aparece.

## Antes de cada publicación

- `npm run build`, `npx playwright test` y `npm run test:gs` (prueba del script de Google, sin tocar Google) en verde.
- Si cambias `Code.gs`: publicar una **nueva versión** de la implementación en Apps Script (guía, paso 8); guardar el código no basta.
- Auditoría de referencia: `docs/auditoria-2026-10-20.md`.
