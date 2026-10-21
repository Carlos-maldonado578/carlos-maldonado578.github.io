# Google Search Console — 2026-10-21

Carlos registró `https://carlos-maldonado578.github.io/` en Search Console (propiedad "Prefijo de la URL") y eligió verificar con **archivo HTML**.

Ya existe `public/google4f9eab580a5fb8ee.html` (creado en la revisión externa) con el contenido estándar de Google:
`google-site-verification: google4f9eab580a5fb8ee.html`

## Instrucciones
1. Si Carlos descargó el archivo desde Search Console, compáralo con el del repo; si difiere, usa el descargado tal cual.
2. **No lo borres nunca**: Google lo revisa periódicamente para mantener la verificación. Agrega una nota en `docs/publicacion.md` y un test que compruebe que el archivo existe en el build (`dist/google4f9eab580a5fb8ee.html`).
3. Asegúrate de que **no** entre al `sitemap.xml`.
4. Build y tests en verde. Commit en `main` y push.
5. Ejecuta el workflow Deploy y espera a que termine.
6. Verifica que `https://carlos-maldonado578.github.io/google4f9eab580a5fb8ee.html` responde 200 con ese texto exacto.
7. Avísale a Carlos que ya puede pulsar **Verificar** en Search Console y luego enviar `sitemap.xml` en **Sitemaps**.

## Resultado
**Commit:** `8fc4c08` en `main` (ya subido). Deploy: [ejecución exitosa](https://github.com/Carlos-maldonado578/carlos-maldonado578.github.io/actions/runs/39642157488).

**Hecho**
1. No había copia descargada de Search Console en tu carpeta de Descargas para comparar, así que se usó el archivo del repo, que tiene el contenido estándar exacto (`google-site-verification: google4f9eab580a5fb8ee.html`, sin salto de línea al final). Quedó versionado en `public/google4f9eab580a5fb8ee.html`. Si el archivo que descargaste difiere, mándamelo y lo reemplazo.
2. Nota en `docs/publicacion.md` (paso 7): no borrar nunca ese archivo y qué hacer con el sitemap. Test nuevo en `tests/carga-seo.spec.ts`: comprueba que `dist-test/google4f9eab580a5fb8ee.html` existe, que se sirve con 200 y su texto exacto, y que el `sitemap.xml` no menciona "google".
3. El `sitemap.xml` sigue con una sola URL (la portada); el archivo de verificación no entra.
4. Build ok; suite completa (122 pasan, 8 omitidos) y `npm run test:gs` (19) en verde. Commit en `main` y push.
5. Deploy ejecutado y terminado con éxito.
6. Producción: `https://carlos-maldonado578.github.io/google4f9eab580a5fb8ee.html` responde **200** con el texto exacto `google-site-verification: google4f9eab580a5fb8ee.html`.

**Te toca a ti**
- En Search Console pulsa **Verificar**. Si dice que no encuentra el archivo, espera un par de minutos y repite.
- Luego, en **Sitemaps**, escribe `sitemap.xml` y pulsa **Enviar**.
- Las pendientes de `2026-10-21-publicacion.md` (confirmar fila, Telegram y correo, y revisar el enlace al compartir) siguen en pie.
