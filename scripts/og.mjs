// Genera public/og.png (1200x630) desde design/og/og.html y public/apple-touch-icon.png (180x180) desde el icono del favicon.
// Uso: npm run og   (usa Microsoft Edge instalado, como el resto de los scripts)
import { chromium } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { statSync } from 'node:fs';

const browser = await chromium.launch({ channel: 'msedge' });

const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await og.goto(pathToFileURL('design/og/og.html').href);
await og.evaluate(() => document.fonts.ready);
await og.screenshot({ path: 'public/og.png', type: 'png' });
// previa a 600x315 (como se ve chica en WhatsApp), solo para revisar: el mismo HTML con la mitad de pixeles
const ctxPrevia = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 0.5 });
const previa = await ctxPrevia.newPage();
await previa.goto(pathToFileURL('design/og/og.html').href);
await previa.evaluate(() => document.fonts.ready);
await previa.screenshot({ path: 'design/og/previa-600x315.png', type: 'png' });
await ctxPrevia.close();
await og.close();

// apple-touch-icon: cuadrado completo (iOS redondea solo), fondo oliva y icono crema, con el icono completo de la cabecera (a 180px la linea vertical hace falta: sin ella se lee como una tarjeta de credito; el favicon de 16px si la omite)
const ico = await browser.newPage({ viewport: { width: 180, height: 180 } });
await ico.setContent(`<body style="margin:0;width:180px;height:180px;background:#3A4A1F;display:grid;place-items:center">
<svg width="132" height="132" viewBox="2 2 20 20"><g stroke="#F4EEDC" stroke-width="1.5" fill="none" stroke-linejoin="round">
<path d="M4 3.75h16A1.25 1.25 0 0 1 21.25 5v11A1.25 1.25 0 0 1 20 17.25h-10l-4.5 3.5v-3.5H4A1.25 1.25 0 0 1 2.75 16V5A1.25 1.25 0 0 1 4 3.75z"/>
<path d="M2.75 10.5h18.5M12 3.75v13.5"/></g><rect x="14" y="12.5" width="5.25" height="2.75" rx=".6" fill="#F4EEDC"/></svg></body>`);
await ico.screenshot({ path: 'public/apple-touch-icon.png', type: 'png' });
await browser.close();

for (const f of ['public/og.png', 'public/apple-touch-icon.png']) console.log(f, Math.round(statSync(f).size / 1024) + ' KB');
