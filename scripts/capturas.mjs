// Capturas de revision: pagina completa y zoom por seccion a 375 y 1440.
// Mismo preparar() que tests/visual.spec.ts (cabecera estatica, .subir oculto, movimiento reducido).
// Uso: npm run capturas [-- <url> <carpeta>]   (por defecto http://localhost:4321 y design/fase4/capturas)
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:4321/';
const out = process.argv[3] ?? 'design/fase4/capturas';
mkdirSync(out, { recursive: true });

const secciones = { faq: '#t-faq', contacto: '#contacto', lomismo: '.servicios' };
const browser = await chromium.launch({ channel: 'msedge' });
for (const ancho of [375, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: ancho, height: 900 }, reducedMotion: 'reduce', locale: 'es-CL' });
  const page = await ctx.newPage();
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: '.subir{display:none!important}.cabecera{position:static!important}*{caret-color:transparent!important}astro-dev-toolbar{display:none!important}' });
  await page.screenshot({ path: `${out}/pagina-${ancho}.png`, fullPage: true, animations: 'disabled' });
  for (const [nombre, sel] of Object.entries(secciones)) {
    const el = sel.startsWith('#t-') ? page.locator(`section:has(${sel})`) : page.locator(sel);
    await el.screenshot({ path: `${out}/${nombre}-${ancho}.png`, animations: 'disabled' });
  }
  await ctx.close();
}
await browser.close();
