# Lista de publicación

Registro de la publicación. El deploy es siempre manual: el workflow `Deploy a GitHub Pages` (`.github/workflows/deploy.yml`) solo corre con `workflow_dispatch`.

Estado actual: sin dominio propio. URL `https://carlos-maldonado578.github.io/` y correo `carlos.automatiza.tupyme@gmail.com`. El formulario cuesta US$0: Google Apps Script + planilla de Google + Telegram + correo (ya no se usa n8n en Railway para esto).

## Hecho (2026-10-21)

1. **Formulario: planilla, bot y script de Google.** Hecho: planilla "Contactos web" con el script vinculado, bot de Telegram y aplicación web publicada. Guía: `integraciones/formulario/README.md`.
2. **Probar el formulario en local.** Hecho: fila, Telegram y correo confirmados por Carlos.
3. **Variable `PUBLIC_WEBHOOK_URL`** en GitHub (variable del repositorio con la URL `/exec`). Hecho.
4. **Merge de `conversion-v2` a `main`.** Hecho (PR #1, fast-forward). Las ramas `conversion-v2` y `rediseno-talonario` se borraron al cerrar el proyecto.
5. **Deploy y envío real de prueba en producción.** Hecho: el workflow `Deploy a GitHub Pages` corre en verde (acciones en Node 24, build con Node 22) y el envío de prueba llegó a la planilla, a Telegram y al correo.
6. **Imagen para compartir (`og.png`).** Hecho: Carlos confirmó cómo se ve el enlace en WhatsApp y en LinkedIn (Post Inspector). Facebook no se usa, así que no se revisa. La plantilla es `design/og/og.html`; se regenera con `npm run og`. Si la cambias, las plataformas guardan la anterior en caché: en LinkedIn se refresca con el Post Inspector y en WhatsApp añadiendo `?v=1` al enlace.
7. **Google Search Console.** Hecho: propiedad "Prefijo de la URL" `https://carlos-maldonado578.github.io/`, verificada con el archivo HTML `public/google4f9eab580a5fb8ee.html` (**no borrar nunca**: Google lo revisa; un test del repo lo comprueba) y `sitemap.xml` enviado. Falta solo mirar en unos días que el estado del sitemap pase a "Correcto".

## Ideas futuras

- **Dominio propio.** No por ahora (sin clientes aún). Cuando se haga, cambiar en un solo repaso: `site` en `astro.config.mjs`; `canonical`, `og:url`, `og:image`, `twitter:image` y el JSON-LD en `src/pages/index.astro` (constante `sitio`); `public/sitemap.xml`; `Sitemap:` en `public/robots.txt`; el correo (`correo` en `index.astro`, `copy.md`, `docs/`, y `EMAIL_AVISO` del script de Google); los tests de `tests/carga-seo.spec.ts` que fijan esas URLs. Después, verificar de nuevo la propiedad en Search Console y repetir el depurador de compartir.
- **Copia nocturna de la planilla "Contactos web" al servidor personal.** No se hace por ahora. Mientras tanto, copia manual de vez en cuando (Archivo → Hacer una copia).
- **Frase "datos con respaldo y avisos cuando algo falla"** en Quién soy: se publica solo cuando exista un respaldo nocturno funcionando de los sistemas que dejas a clientes (no depende del formulario). Hay un test que comprueba que hoy no aparece y un `TODO(Carlos)` en `index.astro`.

## Antes de cada publicación

- `npm run build`, `npx playwright test` y `npm run test:gs` (prueba del script de Google, sin tocar Google) en verde.
- Si cambias `Code.gs`: publicar una **nueva versión** de la implementación en Apps Script (guía, paso 8); guardar el código no basta.
- Auditoría de referencia: `docs/auditoria-2026-10-20.md`.
