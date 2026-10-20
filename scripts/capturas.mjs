// Capturas de revision: pagina completa y zoom por seccion a 375 y 1440.
// Mismo preparar() que tests/visual.spec.ts (cabecera estatica, .subir oculto, movimiento reducido).
// Uso: npm run capturas [-- <url> <carpeta>]   (por defecto http://localhost:4321 y design/fase4/capturas)
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:4321/';
const out = process.argv[3] ?? 'design/fase4/capturas';
mkdirSync(out, { recursive: true });

const secciones = { faq: '#t-faq', contacto: '#contacto', caso: '.banda-caso', hero: '.hero' };
const browser = await chromium.launch({ channel: 'msedge' });
for (const ancho of [375, 768, 1024, 1280, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: ancho, height: 900 }, reducedMotion: 'reduce', locale: 'es-CL' });
  const page = await ctx.newPage();
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  // cabecera sticky tal como se ve: al cargar (arriba de la pagina) y con scroll (aparece el boton)
  await page.screenshot({ path: `${out}/cabecera-arriba-${ancho}.png`, clip: { x: 0, y: 0, width: ancho, height: 420 } });
  await page.locator('#t-trabajo').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.locator('.cabecera').screenshot({ path: `${out}/cabecera-scroll-${ancho}.png` });
  await page.evaluate(() => scrollTo(0, 0));
  if (![375, 1440].includes(ancho)) {
    // anchos intermedios: solo cabecera y hero (el hero cambia de layout entre 1024 y 1279)
    await page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
    await page.locator('.hero').screenshot({ path: `${out}/hero-${ancho}.png`, animations: 'disabled' });
    await ctx.close();
    continue;
  }
  await page.addStyleTag({ content: '.subir{display:none!important}.cabecera{position:static!important}*{caret-color:transparent!important}astro-dev-toolbar{display:none!important}' });
  await page.screenshot({ path: `${out}/pagina-${ancho}.png`, fullPage: true, animations: 'disabled' });
  for (const [nombre, sel] of Object.entries(secciones)) {
    const el = sel.startsWith('#t-') ? page.locator(`section:has(${sel})`) : page.locator(sel);
    await el.screenshot({ path: `${out}/${nombre}-${ancho}.png`, animations: 'disabled' });
  }
  await ctx.close();
}
// favicon a 16 y 32px: se rasteriza a tamano real y se amplia x10 sin suavizar para ver si las lineas se empastan
{
  const ctx = await browser.newContext({ viewport: { width: 700, height: 360 } });
  const page = await ctx.newPage();
  await page.goto(url);
  const fav = new URL('/favicon.svg', url).href;
  const reales = {};
  for (const n of [16, 32]) {
    await page.setContent(`<body style="margin:0;background:#F4EEDC"><img id="fav" src="${fav}" width="${n}" height="${n}"></body>`);
    await page.waitForFunction(() => document.getElementById('fav').complete);
    reales[n] = (await page.locator('#fav').screenshot()).toString('base64');
  }
  await page.setContent('<body style="margin:0;background:#F4EEDC;display:flex;gap:32px;padding:16px;align-items:flex-start">' +
    [16, 32].map((n) => `<div style="font:12px sans-serif">${n}px real <img src="data:image/png;base64,${reales[n]}" width="${n}" height="${n}"><br><br><img src="data:image/png;base64,${reales[n]}" width="${n * 10}" height="${n * 10}" style="image-rendering:pixelated"></div>`).join('') + '</body>');
  await page.screenshot({ path: `${out}/favicon-16-32.png` });
  await ctx.close();
}
await browser.close();
