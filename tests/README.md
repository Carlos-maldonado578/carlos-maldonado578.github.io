# Suite QA end-to-end (Playwright)

## Cómo correr

```
npm run test:e2e           # toda la suite (desktop 1440x900 y móvil 390x844)
npm run test:e2e:update    # regenera las capturas de referencia (hazlo solo si el cambio visual es intencional)
npx playwright test pegas --project=desktop   # un archivo / un proyecto
npx playwright show-report                    # informe HTML
```

- `playwright.config.ts` levanta `tests/servir.mjs`, que hace **dos `astro build`** y los sirve como estáticos:
  - `:4173` (`dist-test/`) con `PUBLIC_WEBHOOK_URL=http://localhost:4173/__webhook`; los tests interceptan esa URL con `page.route`.
  - `:4174` (`dist-test-vacio/`) con la variable vacía, para probar que el formulario falla y nunca simula éxito.
- No usa `astro dev` (:4321) ni `astro preview` (este solo admite un servidor por proyecto). No toca `dist/`.
- Navegador: **Microsoft Edge instalado** (`channel: 'msedge'`). El Chromium descargado por Playwright no arrancó en esta máquina (`spawn UNKNOWN`). Si en otro equipo Edge no está, quita `channel` y corre `npx playwright install chromium`.
- Las capturas de `tests/__snapshots__/` se generaron con Edge en Windows; en otro SO o navegador cambiarán las fuentes/antialias y habrá que regenerarlas.
- Tarda ~2 minutos (el test de "una sola vuelta" espera ~30 s reales).

## Qué cubre

| Archivo | Cubre |
|---|---|
| `carga-seo.spec.ts` | un h1, `lang=es-CL`, title/description, sin errores de consola, solo peticiones a localhost, fuentes cargadas |
| `layout.spec.ts` | sin scroll horizontal a 390/768/1024/1280/1440; botones y campos ≥44px de alto (móvil) |
| `a11y.spec.ts` | axe (wcag2a/2aa/21aa): estado inicial, formulario con errores, cada pestaña (estado final, movimiento reducido) |
| `teclado.spec.ts` | enlace "saltar", Tab alcanza todo lo interactivo, outline visible al enfocar, honeypot fuera del Tab |
| `pegas.spec.ts` | roles ARIA, flechas/Inicio/Fin, clic, hover NO cambia (B1 cerrado), Pausar bajo la lista, herramientas reales en "Lo puedo armar", Pausar/Reanudar, una sola vuelta, se corta con interacción, alto estable entre pestañas, nombre en una línea a 1024/1100/1280 |
| `demo-movimiento.spec.ts` | Pausar/Reanudar de la demo; `reducedMotion` (demo y 4 escenas completas y quietas); sin JavaScript (contenido, 4 escenas apiladas, `<noscript>` con correo) |
| `formulario.spec.ts` | validación (Falta/Revisa, `aria-invalid`, foco), POST `text/plain` con cuerpo JSON exacto, éxito solo con `{ok:true}` (`{ok:false}`, otro JSON, texto o HTML son fallo), éxito con `textContent` (XSS), fallo 500, timeout, variable vacía |
| `subir.spec.ts` | botón volver arriba: aparece tras el primer viewport, ancla `#inicio`, ≥44x44, no tapa Enviar |
| `mejoras.spec.ts` | FAQ `<details>` con teclado, bloque "Quién soy", eje del caso (posiciones proporcionales, orden, sin solapes; vertical en móvil), "Qué pasa después de enviar", carriles de Cómo trabajo, 3 cortes de fondo, demo nunca vacía al cargar, volver arriba sin animación con `reducedMotion` (B2) |
| `visual.spec.ts` | capturas por sección (hero, 4 estados de "Elige tu pega", Cómo trabajo, FAQ, Quién soy, caso, formulario) en ambos proyectos, con movimiento reducido |

## Qué NO cubre

- Otros navegadores (Firefox, Safari/WebKit) ni dispositivos reales; "móvil" es emulación de Chromium/Edge.
- El script de Google real (el POST siempre se simula); entrega real del formulario. El antispam y los límites del lado servidor se prueban aparte, en Node con simulacros de Google: `npm run test:gs` (`integraciones/formulario/Code.test.mjs`).
- Lector de pantalla real (NVDA, VoiceOver): axe y roles ARIA no sustituyen una prueba manual.
- Contraste durante las animaciones (axe se corre en estado final) y la sensación del movimiento (solo se comprueba que exista/pare).
- Rendimiento (Lighthouse/CLS/LCP), SEO avanzado (og:image, sitemap, robots), enlaces externos.
- La regresión visual solo ve el estado con movimiento reducido (estático); las animaciones no tienen captura.
- Ya no queda ningún `test.fail()`: B1 y B2 están corregidos y con test propio.
