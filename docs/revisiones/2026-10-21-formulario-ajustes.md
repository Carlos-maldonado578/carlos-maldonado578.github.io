# Ajustes al formulario (Apps Script) — 2026-10-21

Revisión de `b5ef0cb`. El script, las pruebas y la guía están bien: secretos fuera del repo, spam, límites, inyección de fórmulas, errores sin token y la página solo da éxito con `{ok:true}`.
Decisiones de Carlos sobre los dos puntos abiertos, más un ajuste a la guía.

## Instrucciones

### 1. Tope global → `{ok:false}`
- Cuando se alcanza el **tope global** (30 por hora), responder `{ok:false}`: el visitante real ve "No se pudo enviar" con el correo de respaldo y no se pierde el contacto en silencio. La alerta única por Telegram se mantiene.
- Los **límites por contacto** (1 por minuto, 5 por hora) siguen respondiendo `{ok:true}`: es la misma persona reenviando y su primer mensaje ya quedó guardado.
- Ajusta `Code.test.mjs`, la tabla "Qué hace el script con cada envío" y la sección "Si algo falla" del README.

### 2. Script dentro de la planilla (menor permiso)
La cuenta de Google de Carlos puede tener planillas de clientes (las crea en su cuenta antes de transferirlas). Con un script anónimo y permiso a **todas** las planillas, el riesgo no vale la pena.
- El script pasa a ser **vinculado a la planilla** (Extensiones → Apps Script desde "Contactos web").
- `SpreadsheetApp.getActiveSpreadsheet()` en vez de `openById`; se elimina la propiedad `SHEET_ID`.
- `appsscript.json`: permiso `https://www.googleapis.com/auth/spreadsheets.currentonly` en vez de `spreadsheets`.
- Reescribe los pasos 1, 3 y 4 del README (crear la planilla y abrir Apps Script desde ella; tres propiedades en vez de cuatro). Actualiza "Si cambias de cuenta / de planilla".
- Verifica en las pruebas que `getActiveSpreadsheet` funciona dentro de `doPost` de una aplicación web vinculada (lo hace: el script vinculado conserva su planilla contenedora).

### 3. Prueba de la URL en Windows
Carlos usa Windows: el `curl` del paso 6 con comillas simples no funciona en CMD y en PowerShell `curl` es otro comando. Agrega la versión de PowerShell como opción principal y deja la de `curl` para Git Bash:

```powershell
Invoke-RestMethod -Method Post -Uri "URL" -ContentType "text/plain" -Body '{"nombre":"Prueba PowerShell","contacto":"ps@ejemplo.cl","mensaje":"Prueba desde PowerShell, si llega todo funciona.","hp":"","t":10000}'
```

(Debe mostrar `ok : True`.)

## Criterios de aceptación
- `npm run test:gs` y la suite pasan.
- README coherente de punta a punta con el script vinculado.
- Commit completando este Resultado.

## Resultado
**Commit:** "Formulario: tope global con ok:false y script vinculado a la planilla" (rama `conversion-v2`, sobre `b5ef0cb`).

**Hecho**
1. Tope global (30 por hora): responde `{ok:false}` (la página muestra "No se pudo enviar" con el correo de respaldo) y mantiene la alerta única por Telegram y en `Errores`. Los límites por contacto (1 por minuto, 5 por hora) siguen respondiendo `{ok:true}`. Pruebas nuevas en `Code.test.mjs` para ambos casos; tabla "Qué hace el script con cada envío" y sección "Si algo falla" del README actualizadas.
2. Script vinculado a la planilla: `SpreadsheetApp.getActiveSpreadsheet()` en vez de `openById`; se elimina la propiedad `SHEET_ID` (quedan tres: `TELEGRAM_TOKEN`, `TELEGRAM_CHAT_ID`, `EMAIL_AVISO`); `appsscript.json` con `spreadsheets.currentonly` en vez de `spreadsheets`. README: pasos 1, 3 y 4 reescritos (crear la planilla y abrir Apps Script desde Extensiones; sin ID; tres propiedades) y "Si cambias de cuenta / de planilla" ahora explica que el script vive dentro de la planilla. Pruebas: el simulacro solo ofrece `getActiveSpreadsheet` (si el código usara `openById` fallarían), y hay pruebas de que no queda `SHEET_ID`, del caso sin planilla contenedora (`{ok:false}`) y del manifiesto. `PRODUCT.md` y `docs/publicacion.md` actualizados.
3. README, paso 6: prueba de la URL con `Invoke-RestMethod` de PowerShell como opción principal (debe mostrar `ok : True`) y `curl` para Git Bash/macOS/Linux; avisa que `curl` en PowerShell es otro comando y que repetir el mismo contacto en menos de un minuto no guarda otra fila.

**Verificado:** `npm run test:gs` (19 pruebas) y suite de Playwright (120) pasan; build ok. **No verificado:** que `getActiveSpreadsheet()` funcione dentro de `doPost` de la aplicación web vinculada contra Google de verdad (el simulacro solo comprueba que el código lo use; el comportamiento documentado es que un script vinculado conserva su planilla contenedora). Se comprueba con la prueba de PowerShell del paso 6 de la guía, que debe mostrar `ok : True` y dejar una fila.

**Pendiente (de Carlos):** seguir la guía (pasos 1 a 7) con su cuenta de Google y Telegram.
