# CLAUDE.md

Contexto del producto: PRODUCT.md. Sistema visual: DESIGN.md. Textos: copy.md (fuente de verdad del copy).

## Flujo de revisiones
- Las revisiones externas llegan como archivo en `docs/revisiones/AAAA-MM-DD-tema.md`. Aplícalas tal cual; si algo choca con PRODUCT.md o DESIGN.md, pregunta antes de decidir.
- Antes de mostrar capturas a Carlos, pasa el subagente `revisor-landing` y corrige lo que encuentre.
- No regeneres snapshots visuales sin el OK explícito de Carlos a las capturas.
- Al cerrar una revisión, completa su sección **Resultado** (commit, qué se hizo, qué quedó pendiente) e inclúyela en el commit.
- Todo cambio de texto en la página se refleja también en copy.md.
