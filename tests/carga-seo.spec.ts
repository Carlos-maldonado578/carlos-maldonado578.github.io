import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { abrir } from './comun';

test.describe('Carga y SEO basico', () => {
  test('un solo h1, lang es-CL, title y description', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es-CL');
    expect((await page.title()).length).toBeGreaterThan(10);
    const d = await page.locator('meta[name=description]').getAttribute('content');
    expect(d!.length).toBeGreaterThan(50);
    expect(d!.length).toBeLessThanOrEqual(200);
  });

  test('sin errores de consola ni excepciones', async ({ page }) => {
    const errores: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
    page.on('pageerror', (e) => errores.push(String(e)));
    await abrir(page);
    await page.mouse.wheel(0, 3000);
    await page.waitForTimeout(500);
    expect(errores).toEqual([]);
  });

  test('solo peticiones a localhost (nada de terceros)', async ({ page }) => {
    const hosts = new Set<string>();
    page.on('request', (r) => {
      const u = new URL(r.url());
      if (u.protocol.startsWith('http')) hosts.add(u.hostname);
    });
    await abrir(page);
    await page.mouse.wheel(0, 5000);
    await page.waitForTimeout(500);
    expect([...hosts]).toEqual(['localhost']);
  });

  test('fuentes cargadas (Archivo y sin errores)', async ({ page }) => {
    await abrir(page);
    await page.locator('#contacto').scrollIntoViewIfNeeded();
    const r = await page.evaluate(async () => {
      await document.fonts.ready;
      return [...document.fonts].map((f) => `${f.family}:${f.status}`);
    });
    expect(r.some((x) => /Archivo:loaded/.test(x)), `fuentes: ${r}`).toBe(true);
    expect(r.filter((x) => /error/.test(x))).toEqual([]);
  });

  test('metadatos: titulo, descripcion sin "pega" (<=155), Open Graph y Twitter con URLs absolutas', async ({ page }) => {
    await abrir(page);
    await expect(page).toHaveTitle('Carlos Maldonado · Automatización para pymes en Santiago');
    const meta = (q: string) => page.locator(q).getAttribute('content');
    const d = (await meta('meta[name=description]'))!;
    expect(d.length).toBeLessThanOrEqual(155);
    expect(d).not.toMatch(/pega/i);
    expect(d).toBe('Tu equipo manda un mensaje y el dato queda en tu planilla. Automatizo registros y avisos para pymes en Santiago. Primera conversación sin costo.');
    const sitio = 'https://carlos-maldonado578.github.io/';
    expect(await meta('meta[property="og:site_name"]')).toBe('Carlos Maldonado');
    expect(await meta('meta[property="og:url"]')).toBe(sitio);
    expect(await meta('meta[property="og:image"]')).toBe(sitio + 'og.png');
    expect(await meta('meta[property="og:image:width"]')).toBe('1200');
    expect(await meta('meta[property="og:image:height"]')).toBe('630');
    expect((await meta('meta[property="og:image:alt"]'))!.length).toBeGreaterThan(10);
    expect(await meta('meta[name="twitter:card"]')).toBe('summary_large_image');
    expect(await meta('meta[name="twitter:image"]')).toBe(sitio + 'og.png');
    expect(await meta('meta[name="twitter:title"]')).toBe(await meta('meta[property="og:title"]'));
    expect(await meta('meta[name="twitter:description"]')).toBe(d);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', sitio);
    // "datos con respaldo" no se publica hasta que el respaldo nocturno funcione
    expect(await page.content()).not.toMatch(/datos con respaldo/i);
    await expect(page.locator('link[rel=apple-touch-icon]')).toHaveAttribute('href', '/apple-touch-icon.png');
  });

  test('JSON-LD ProfessionalService: campos pedidos, sin telefono, precios ni resenas', async ({ page }) => {
    await abrir(page);
    const crudo = await page.locator('script[type="application/ld+json"]').textContent();
    const j = JSON.parse(crudo!);
    expect(j['@context']).toBe('https://schema.org');
    expect(j['@type']).toBe('ProfessionalService');
    expect(j.name).toBe('Carlos Maldonado · Automatización para pymes');
    expect(j.description).toBe(await page.locator('meta[name=description]').getAttribute('content'));
    expect(j.url).toBe('https://carlos-maldonado578.github.io/');
    expect(j.email).toBe('carlos.automatiza.tupyme@gmail.com');
    expect(j.image).toBe('https://carlos-maldonado578.github.io/og.png');
    expect(j.areaServed).toEqual(['Santiago', 'Región Metropolitana']);
    expect(j.address).toEqual({ '@type': 'PostalAddress', addressLocality: 'Santiago', addressCountry: 'CL' });
    expect(j.founder).toEqual({ '@type': 'Person', name: 'Carlos Maldonado', jobTitle: 'Desarrollador' });
    expect(j.knowsAbout).toEqual(['automatización de procesos', 'n8n', 'bots de Telegram', 'Google Sheets']);
    for (const k of ['telephone', 'priceRange', 'aggregateRating', 'review']) expect(j).not.toHaveProperty(k);
    expect(j.address).not.toHaveProperty('streetAddress');
  });

  test('robots.txt, sitemap.xml, og.png (<200 KB) y 404 con noindex', async ({ page, request }) => {
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toMatch(/Allow: \//);
    expect(robots).toMatch(/Sitemap: https:\/\/carlos-maldonado578\.github\.io\/sitemap\.xml/);
    const mapa = await (await request.get('/sitemap.xml')).text();
    expect(mapa.match(/<loc>/g)).toHaveLength(1);
    expect(mapa).toContain('<loc>https://carlos-maldonado578.github.io/</loc>');
    const og = await request.get('/og.png');
    expect(og.headers()['content-type']).toBe('image/png');
    expect((await og.body()).length).toBeLessThan(200 * 1024);
    await page.goto('/404.html');
    await expect(page.locator('h1')).toHaveText('Esta página no existe.');
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex');
    await expect(page.locator('main a')).toHaveAttribute('href', '/');
    expect((await page.locator('main a').boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await expect(page.locator('.cabecera')).toBeVisible();
  });

  test('verificacion de Google Search Console: el archivo esta en el build con su texto exacto y no entra al sitemap (no borrar nunca)', async ({ request }) => {
    const archivo = 'google4f9eab580a5fb8ee.html';
    expect(existsSync(`dist-test/${archivo}`), 'dist-test/' + archivo).toBe(true);
    const r = await request.get('/' + archivo);
    expect(r.status()).toBe(200);
    expect(await r.text()).toBe('google-site-verification: ' + archivo);
    expect(await (await request.get('/sitemap.xml')).text()).not.toMatch(/google/i);
  });
});
