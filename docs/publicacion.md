# Lista de publicación

Pasos que hace Carlos (no Claude Code), en orden. El deploy es siempre manual: el workflow `Deploy a GitHub Pages` (`.github/workflows/deploy.yml`) solo corre con `workflow_dispatch`.

Estado actual: sin dominio propio. URL `https://carlos-maldonado578.github.io/` y correo `carlos.automatiza.tupyme@gmail.com`.

1. **n8n en Railway.** Servicio con volumen persistente, `N8N_ENCRYPTION_KEY` fija (si cambia, se pierden las credenciales guardadas) y el workflow del formulario: webhook con límite de peticiones (rate limit), honeypot (`sitio_web`; si viene con valor, se descarta), aviso a Telegram y correo. El formulario envía `{ nombre, contacto, mensaje, hp, t }` (`hp` = honeypot, `t` = milisegundos desde que se cargó la página).
2. **Respaldo nocturno** de n8n hacia tu servidor personal. Recién cuando funcione, se habilita la frase "datos con respaldo y avisos cuando algo falla" en Quién soy (el `TODO(Carlos)` en `src/pages/index.astro`) y en `copy.md`.
3. **Variable `PUBLIC_WEBHOOK_URL`** en GitHub: Settings → Secrets and variables → Actions → Variables. Es la URL HTTPS del webhook de n8n; es pública (queda dentro del JS del sitio). El workflow falla si falta.
4. **Merge de `conversion-v2` a `main`.**
5. **Ejecutar el workflow Deploy** (Actions → Deploy a GitHub Pages → Run workflow) y hacer **un envío real de prueba** en producción: debe llegar el aviso a Telegram y el correo, y el formulario debe mostrar la confirmación.
6. **Verificar la imagen para compartir** (`og.png`): depurador de compartir de Facebook y de LinkedIn (Post Inspector), y enviando el enlace por WhatsApp. Si cambias la imagen, los cachés de esas plataformas la refrescan solo desde su depurador. La plantilla es `design/og/og.html`; se regenera con `npm run og`.
7. **Google Search Console:** registrar `https://carlos-maldonado578.github.io/` y enviar `https://carlos-maldonado578.github.io/sitemap.xml`.
8. **Futuro: dominio propio.** Cambiar en un solo repaso: `site` en `astro.config.mjs`; `canonical`, `og:url`, `og:image`, `twitter:image` y el JSON-LD en `src/pages/index.astro` (constante `sitio`); `public/sitemap.xml`; `Sitemap:` en `public/robots.txt`; el correo (`correo` en `index.astro`, `copy.md`, `docs/`) y los tests de `tests/carga-seo.spec.ts` que fijan esas URLs. Después, volver a `npm run og` no hace falta (la imagen no lleva URL), pero sí repetir los pasos 6 y 7.

## Antes de cada publicación

- `npm run build` y `npx playwright test` en verde.
- Revisar que no aparezca "datos con respaldo" hasta el paso 2 (hay un test que lo comprueba).
- Auditoría de referencia: `docs/auditoria-2026-10-20.md`.
