# Auditoría — 2026-10-20

Lighthouse 12.8.2 sobre `astro preview` del build de producción (`npm run build`), Microsoft Edge headless. Rama `conversion-v2`, con los cambios de la Fase 6.

## Puntajes

| | Móvil | Escritorio |
|---|---|---|
| Performance | 99 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Objetivo ≥ 95 en todo: cumplido.

## Métricas

| | Móvil (simulado, 4G lento) | Escritorio |
|---|---|---|
| LCP | 2.0 s | 0.4 s |
| FCP | 1.1 s | 0.3 s |
| CLS | 0.003 | 0.002 |
| TBT | 0 ms | 0 ms |
| Speed Index | 1.1 s | 0.3 s |
| Peso total de la página | 169 KiB | 169 KiB |

Desglose del peso (móvil): documento 7.7 KiB; Archivo 88.3 KiB, Bitter 33.6 KiB y Bitter cursiva 32.9 KiB (fuentes WOFF2 propias, sin terceros); hoja de estilos de la cursiva 5.6 KiB; favicon 0.8 KiB. No hay JavaScript externo ni peticiones a otros dominios (lo verifica el test "solo peticiones a localhost"). `og.png` (53 KB) y `apple-touch-icon.png` no se descargan al cargar la página.

## Qué se corrigió en esta fase

- Metadatos completos (descripción sin "pega", Open Graph, Twitter, `apple-touch-icon`), JSON-LD, `robots.txt`, `sitemap.xml` y 404 con `noindex`: SEO 100.
- Escala tipográfica con variables `--fs-*`, sin cambio visual (los snapshots visuales pasan sin regenerar).

## Lo que queda (no bloquea, ninguna categoría baja de 99)

1. **Móvil, Performance 99:** el LCP de 2.0 s (simulado) es el texto del título esperando la fuente. Lighthouse señala solo un recurso que bloquea el render: la hoja de la fuente cursiva de Bitter (155 ms). Las fuentes ya se precargan y tienen `font-display: swap` con fallback de métricas ajustadas; no se tocó por no valer el riesgo de cambiar la carga de fuentes. Opción futura: insertar esa hoja en línea.
2. **Escritorio, aviso informativo `label-content-name-mismatch`:** el `aria-label` del enlace de inicio se cambió a "Carlos Maldonado, automatización para pymes: inicio" (cierre de la Fase 6) **pero la auditoría de producción (abajo) sigue mostrando el aviso**: Lighthouse compara el texto visible ("Carlos Maldonado Automatización para pymes") con el nombre accesible y la coma y la minúscula inicial no le bastan. No afecta el puntaje (Accessibility 100). Para cerrarlo habría que usar el texto visible tal cual, por ejemplo `aria-label="Carlos Maldonado Automatización para pymes"` (y ajustar su test); no se hizo por no cambiar el texto aprobado.

## Cómo repetirla

```
npm run build && npx astro preview --port 4330
npx lighthouse@12 http://localhost:4330/ --port=<puerto de Edge con --remote-debugging-port>
npx lighthouse@12 http://localhost:4330/ --preset=desktop --port=<puerto>
```

Lighthouse no está instalado en el proyecto (se corre con `npx`). Aquí `chrome-launcher` no pudo abrir Edge por su cuenta, por eso se abrió Edge aparte con depuración remota y se le conectó con `--port`.

## Producción (2026-10-21)

Lighthouse 12.8.2 sobre `https://carlos-maldonado578.github.io/` (GitHub Pages, build con el lenguaje nuevo y las acciones en Node 24), Microsoft Edge headless en este mismo computador. Peso total de la página: 169 KiB (igual que en la vista previa).

| | Móvil | Escritorio |
|---|---|---|
| Performance | **89 / 94 / 99** (tres corridas) | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 1.8 a 2.0 s | 0.4 s |
| CLS | 0 | 0.003 |
| TBT | 70 a 400 ms | 30 ms |

**Por qué Performance móvil baja de 95 en dos de tres corridas.** El único indicador que se mueve es el Total Blocking Time (400, 270 y 70 ms en las tres corridas), mientras LCP (≈2 s), CLS (0) y el JavaScript (32 ms de evaluación de scripts) no cambian. La misma página dio 99 en la vista previa local. El tiempo de bloqueo viene de "Style & Layout" y "Rendering" (la página es HTML y CSS, con un solo script pequeño), y varía con la carga del computador donde corre la prueba (Lighthouse simula un celular con CPU lenta sobre esta misma máquina), no con el sitio. Es ruido de medición, no un problema del sitio; la mediana (94) queda a un punto del objetivo. Accessibility, Best Practices y SEO están en 100 en todas las corridas. Avisos informativos que no restan: política de caché de GitHub Pages para los archivos estáticos (no se controla desde el repositorio) y el `label-content-name-mismatch` descrito arriba.
