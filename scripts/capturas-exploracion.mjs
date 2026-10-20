// Capturas de las variantes de /prototypes/* a 375 y 1440, y chequeo de errores de consola y de desborde.
// Uso: node scripts/capturas-exploracion.mjs [url-base] [carpeta]
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4321';
const out = process.argv[3] ?? 'design/fase5/exploracion';
mkdirSync(out, { recursive: true });

const piezas = { ejemplos: 3, faq: 3 };
const browser = await chromium.launch({ channel: 'msedge' });
for (const ancho of [375, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: ancho, height: 900 }, reducedMotion: 'reduce', locale: 'es-CL' });
  const page = await ctx.newPage();
  const errores = [];
  page.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
  page.on('pageerror', (e) => errores.push(String(e)));
  for (const [pieza, n] of Object.entries(piezas)) {
    for (let v = 1; v <= n; v++) {
      await page.goto(`${base}/prototypes/${pieza}?v=${v}`);
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({ content: '.proto-picker,astro-dev-toolbar{display:none!important}.cabecera{position:static!important}' });
      const zona = page.locator('.proto-v:not([hidden])');
      await zona.screenshot({ path: `${out}/${pieza}-v${v}-${ancho}.png`, animations: 'disabled' });
      if (pieza === 'ejemplos' && v === 2) {
        for (const c of ['pedidos', 'stock']) {
          await page.locator(`#v2-tab-${c}`).click();
          await zona.screenshot({ path: `${out}/${pieza}-v${v}-${c}-${ancho}.png`, animations: 'disabled' });
        }
      }
      const sobra = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (sobra > 0) errores.push(`${pieza} v${v} @${ancho}: desborde horizontal de ${sobra}px`);
    }
  }
  console.log(ancho, errores.length ? errores : 'sin errores');
  await ctx.close();
}
await browser.close();
