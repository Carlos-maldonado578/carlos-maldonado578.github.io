# carlos-maldonado578.github.io

Sitio de **Carlos Maldonado**: automatización de procesos para pymes en Santiago.

Landing de una página, estática ([Astro](https://astro.build)), publicada en <https://carlos-maldonado578.github.io/> con GitHub Pages.

## Estado

**Publicada** el 2026-10-21 (rama `main`). Search Console verificado (archivo `public/google4f9eab580a5fb8ee.html`: no borrar) y `sitemap.xml` enviado.

- **Contacto:** solo el formulario de la página → Google Apps Script → fila en una planilla de Google + aviso a Telegram + correo. Costo US$0. Código y guía de instalación en `integraciones/formulario/`.
- **Decisiones cerradas:** nombre propio (sin marca de fantasía), caso real 100% anónimo y sin cifras, sin precios, sin foto, sin analítica. Diseño sobrio, que no parezca hecho con IA (sin degradados, stock, 3D ni emoji).
- **Auditoría Lighthouse** (producción y vista previa): `docs/auditoria-2026-10-20.md`.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Contexto del producto y público | `PRODUCT.md` |
| Sistema visual | `DESIGN.md` |
| Textos de la página (fuente de verdad) | `copy.md` |
| Página y estilos | `src/pages/index.astro`, `src/styles/global.css`, `src/scripts/main.js` |
| Formulario (script de Google, guía y pruebas) | `integraciones/formulario/` |
| Pruebas end-to-end | `tests/` (ver `tests/README.md`) |
| Revisiones de cada fase y su **Resultado** | `docs/revisiones/` (ver su `README.md`) |
| Pasos de publicación e ideas futuras | `docs/publicacion.md` |

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # genera dist/
npx playwright test  # suite completa (Edge instalado; ver tests/README.md)
npm run test:gs      # prueba del script de Google, sin tocar Google
npm run capturas     # capturas de revision en design/fase4/capturas (con npm run dev corriendo)
npm run og           # regenera public/og.png y public/apple-touch-icon.png
```

Para probar el formulario en local, copia `.env.example` como `.env` y pon la URL `/exec` del script de Google (guía en `integraciones/formulario/README.md`).

## Publicar cambios

No se publica solo al hacer push: el deploy es **manual**.

1. `npm run build`, `npx playwright test` y `npm run test:gs` en verde.
2. Commit y push a `main`.
3. En GitHub: **Actions → Deploy a GitHub Pages → Run workflow** (o `gh workflow run deploy.yml --ref main`). El workflow lee la variable de repositorio `PUBLIC_WEBHOOK_URL` (URL `/exec` del script de Google) y falla si falta.
4. Verifica <https://carlos-maldonado578.github.io/> y haz un envío de prueba del formulario.

Si cambias `integraciones/formulario/Code.gs`, hay que publicar además una **nueva versión** de la implementación en Apps Script (guía, paso 8).
