# Ajustes Fase 4 — 2026-10-19

Revisión externa sobre `f33e12a` (capturas de `design/fase4/capturas/`). La revisión 2026-10-17 quedó bien resuelta: página completa sin artefactos, FAQ con jerarquía clara, contacto con promesas, tarjetas sin espacio muerto.
Quedan dos ajustes antes de regenerar snapshots. Solo toca esto.

## Instrucciones

### 1. Quitar la tarjeta Boletas
Decisión de Carlos: "Lo mismo sirve para…" queda solo con **Pedidos** y **Stock**. Boletas no ahorra trabajo real (no hay integración con el SII) y abre dudas sobre claves tributarias.
- Elimina la tarjeta Boletas (HTML, CSS de su mini-UI y textos).
- Dos tarjetas en 1440: que no quede un hueco de tercera columna. Usa dos columnas que ocupen el ancho del contenedor; en 375 siguen apiladas.
- Quita Boletas/facturas de `copy.md` y de DESIGN.md si aparece. Ajusta los tests que la mencionen.

### 2. Caso real: marca de las 20:00
Ahora la marca de las 20:00 es una línea vertical larga que baja hasta la etiqueta; se ve como un error. Pon la etiqueta "20:00 · Recién ahí sabes el total." **encima** de la línea de "Antes", alineada a la derecha bajo su marca corta (el espacio a la derecha de "Sin saber cuánto se produjo." está libre). La marca vuelve a tener el mismo largo que las de 08:00 y 17:30. En 375 se mantiene como está.

## Criterios de aceptación
- `npm run build` ok y los 89 tests no visuales pasan.
- `npm run capturas`; pasar `revisor-landing`; mostrarme `lomismo-1440`, `lomismo-375` y caso real en 1440 y 375.
- Con mi OK: `--update-snapshots` solo para `visual.spec.ts`, borrar PNG obsoletos de `tests/__snapshots__/`, commit (incluye este archivo con su Resultado) y pasar a la Fase 5.

## Resultado
**Commit:** "Fase 4: ajustes 2026-10-19" (rama `conversion-v2`, sobre `f33e12a`).

**Hecho**
1. Tarjeta Boletas eliminada (HTML, CSS de su mini-UI, `copy.md`, `DESIGN.md` y tests). "Lo mismo sirve para…" queda con Pedidos y Stock: dos columnas de ancho completo desde 768px, apiladas en 375.
2. Caso real (≥900px): "20:00 · Recién ahí sabes el total." va en una línea sobre la línea de Antes, alineada a la derecha; la marca de las 20:00 mide lo mismo que las de 08:00 y 17:30. El carril Antes ya no tiene espacio muerto. En 375 sin cambios.
- `npm run capturas` ahora incluye `caso-*`. Revisión de `revisor-landing`: sin hallazgos graves; corregida la indentación en `servicios.spec.ts` y subida la etiqueta 0.1rem para despegarla de la marca de 17:30.
- Con el OK de Carlos: snapshots regenerados solo para `visual.spec.ts` y borrados los PNG obsoletos `pega-*.png`.

**Verificado:** `npm run build` ok; suite completa (89 no visuales + visuales) pasa.

**Pendiente**
- `PRODUCT.md:19` aún menciona "boletas/facturas" (no estaba en el alcance); decidir si se quita.
- Fase 5.
