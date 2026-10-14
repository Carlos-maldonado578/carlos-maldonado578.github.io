import { test, expect } from '@playwright/test';
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
});
