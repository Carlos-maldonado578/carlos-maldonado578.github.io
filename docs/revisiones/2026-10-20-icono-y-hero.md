# Ícono propio y etiqueta del hero — 2026-10-20

Decisiones de Carlos:
1. Reemplazar la mini planilla 3×3 de la cabecera por el ícono **B1 "Mensaje-celda"** (un mensaje que se vuelve planilla). Opciones evaluadas en `design/fase5/icono-opciones.png`.
2. Quitar la etiqueta del hero "Automatización para pymes · Santiago": ya está en la cabecera y se leía dos veces seguidas.

No tocar nada más.

## Instrucciones

### 1. Ícono en la cabecera
Reemplaza el SVG actual por este, tal cual (viewBox 24, mismo tamaño de 22px, `aria-hidden="true"`). El trazo usa `tinta` y la celda llena `oliva`; pásalos a las variables CSS del proyecto si el SVG está en línea:

```svg
<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
  <path d="M4 3.75h16A1.25 1.25 0 0 1 21.25 5v11A1.25 1.25 0 0 1 20 17.25h-10l-4.5 3.5v-3.5H4A1.25 1.25 0 0 1 2.75 16V5A1.25 1.25 0 0 1 4 3.75z" fill="none" stroke="#1D2316" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M2.75 10.5h18.5M12 3.75v13.5" stroke="#1D2316" stroke-width="1.5"/>
  <rect x="14" y="12.5" width="5.25" height="2.75" rx=".6" fill="#3A4A1F"/>
</svg>
```

La celda llena va separada del trazo a propósito (es lo que fallaba en la grilla 3×3): no la agrandes hasta tocar las líneas.

### 2. Favicon
Reemplaza `public/favicon.svg` por el mismo ícono sobre fondo `oliva`, en `crema`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#3A4A1F"/>
  <g transform="translate(4 4)">
    <path d="M4 3.75h16A1.25 1.25 0 0 1 21.25 5v11A1.25 1.25 0 0 1 20 17.25h-10l-4.5 3.5v-3.5H4A1.25 1.25 0 0 1 2.75 16V5A1.25 1.25 0 0 1 4 3.75z" fill="none" stroke="#F4EEDC" stroke-width="1.75" stroke-linejoin="round"/>
    <path d="M2.75 10.5h18.5M12 3.75v13.5" stroke="#F4EEDC" stroke-width="1.75"/>
    <rect x="14" y="12.5" width="5.25" height="2.75" rx=".6" fill="#F4EEDC"/>
  </g>
</svg>
```

Revisa cómo se ve a 16px en la pestaña. Si las líneas internas se empastan, quita solo la línea vertical (`M12 3.75v13.5`) **en el favicon**, no en la cabecera.

### 3. Hero sin etiqueta
- Elimina `<p class="etiqueta">Automatización para pymes · Santiago</p>` del hero.
- Ajusta el espacio superior del hero para que el h1 no quede pegado a la cabecera ni con un hueco donde estaba la etiqueta.
- "Santiago" sigue en Quién soy y en el pie; no hace falta reubicarlo.

### 4. Registro
Actualiza DESIGN.md (cabecera, favicon, hero) y `copy.md` (sin etiqueta del hero). Ajusta tests que busquen la etiqueta o el SVG anterior.

## Criterios de aceptación
- `npm run build` ok y tests no visuales pasan.
- Capturas: cabecera a 375, 768 y 1440 (arriba y con scroll), hero a 375 y 1440, y el favicon renderizado a 16 y 32px.
- Pasar `revisor-landing` y esperar el OK de Carlos antes de `--update-snapshots`.

## Resultado
**Commit:** "Ícono mensaje-celda y hero sin etiqueta" (rama `conversion-v2`).

**Hecho**
1. Cabecera: SVG B1 "mensaje-celda" tal cual la revisión (viewBox 24, 22px, `aria-hidden`), con trazo `var(--tinta)` y celda `var(--oliva)`; la celda queda separada de las líneas. Se quitó el `fill/stroke` de `.marca-sim` (mandan los atributos del SVG).
2. Favicon: `public/favicon.svg` con el ícono en `crema` sobre `oliva`. **Decisión:** a 16px las líneas interiores se empastaban (el interior quedaba como un bloque borroso), así que se quitó solo la línea vertical `M12 3.75v13.5` **en el favicon**, como permitía la revisión; la cabecera la conserva. Comparación en `design/fase4/capturas/favicon-16-32.png` (16 y 32px reales y ampliados x10).
3. Hero: eliminada la etiqueta "Automatización para pymes · Santiago" y su CSS (`.etiqueta`). El h1 queda a 32px de la cabecera en 375 y 768, 64px en 1024 y 112px en 1440 (el texto se centra junto a la ilustración); sin hueco. "Santiago" sigue en Quién soy y en el pie.
4. `DESIGN.md` y `copy.md` actualizados; test de cabecera ampliado (ícono, sin etiqueta ni "Santiago" en el hero). `scripts/capturas.mjs` ahora también genera `hero-*` y `favicon-16-32.png`.

**Verificado:** build ok; 95 tests no visuales pasan. `revisor-landing` sin bloqueantes.

**Pendiente / para decidir**
- OK de Carlos a las capturas; luego `--update-snapshots` solo para `visual.spec.ts` (el snapshot `hero.png` cambia).
- A 1024px la nota "Primera conversación sin costo…" del hero queda en una columna angosta y roza la ilustración. Los estilos del hero no se tocaron aquí; se decide aparte.
