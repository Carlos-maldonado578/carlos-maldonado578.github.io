# Revisiones

Registro de las revisiones externas de la landing (hechas en el chat de Claude, fuera de Claude Code).

## Flujo
1. La revisión se escribe aquí como `AAAA-MM-DD-tema.md`, con instrucciones y criterios de aceptación.
2. En Claude Code: `aplica @docs/revisiones/<archivo>.md`.
3. Claude Code implementa, genera capturas en `design/<fase>/capturas/` y espera el OK de Carlos.
4. Al cerrar, Claude Code completa la sección **Resultado** del archivo (commit, qué se hizo, qué quedó pendiente) y lo incluye en el commit.

Revisiones rutinarias (después de cada cambio visual): subagente `revisor-landing` (`.claude/agents/revisor-landing.md`).
Decisiones grandes (secciones, copy, dirección): en el chat, y quedan como archivo aquí.
