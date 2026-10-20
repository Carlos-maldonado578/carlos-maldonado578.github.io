# Cierre Fase 6 — 2026-10-20

Revisión de `69cd3b3`. Aprobados: og.png (se lee bien también a 600×315), metadatos, JSON-LD, robots/sitemap/404, escala tipográfica, auditoría (99-100 en todo) y `docs/publicacion.md`.

Dos ajustes chicos:

1. **apple-touch-icon (180×180):** sin la línea vertical, a ese tamaño el ícono se lee como una **tarjeta de crédito** (rectángulo con franja y un rectángulo chico). Regenera `public/apple-touch-icon.png` con el ícono completo de la cabecera (incluida `M12 3.75v13.5`). El favicon SVG de 16px se queda como está.
2. **aria-label del enlace de inicio:** cámbialo a "Carlos Maldonado, automatización para pymes: inicio" para cerrar el aviso WCAG 2.5.3 de Lighthouse. Ajusta su test.

## Criterios de aceptación
- Tests pasan; mostrar el apple-touch-icon nuevo.
- Commit, completando este Resultado.

## Resultado
**Commit:** "Fase 6: cierre (apple-touch-icon completo y aria-label del inicio)" (rama `conversion-v2`, sobre `69cd3b3`).

**Hecho**
1. `public/apple-touch-icon.png` (180×180) regenerado con el ícono completo de la cabecera, incluida la línea vertical `M12 3.75v13.5`: se lee como un mensaje con celdas, no como tarjeta de crédito. Cambio en `scripts/og.mjs` (`npm run og`). El favicon SVG de 16px queda sin la línea vertical, como estaba.
2. `aria-label` del enlace de inicio: "Carlos Maldonado, automatización para pymes: inicio" en `index.astro` y en la cabecera de `404.astro`; test ajustado y `DESIGN.md` actualizado. Cierra el aviso `label-content-name-mismatch` de Lighthouse (WCAG 2.5.3); `docs/auditoria-2026-10-20.md` lo anota como corregido.

**Verificado:** build ok; suite completa pasa. No cambió ningún snapshot visual. No se repitió Lighthouse después del cambio de `aria-label`.

**Pendiente:** los pasos de `docs/publicacion.md` (de Carlos).
