import { test, expect } from '@playwright/test';
import { abrir } from './comun';

test.describe('Teclado', () => {
  test('el enlace "saltar" aparece primero y lleva al formulario', async ({ page }) => {
    await abrir(page);
    await page.keyboard.press('Tab');
    const salto = page.locator('.salto');
    await expect(salto).toBeFocused();
    expect((await salto.boundingBox())!.y).toBeGreaterThanOrEqual(0); // visible al enfocar
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.locator('#contacto')).toBeInViewport();
  });

  test('el Tab llega a todo lo interactivo y el foco es visible', async ({ page }) => {
    await abrir(page);
    const visitados: string[] = [];
    const sinOutline: string[] = [];
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const a = document.activeElement as HTMLElement;
        if (!a || a === document.body) return null;
        a.dataset.qa = a.dataset.qa || String(Math.random());
        const cs = getComputedStyle(a);
        const nombre = a.tagName + (a.id ? '#' + a.id : '') + (a.className ? '.' + String(a.className).split(' ')[0] : '');
        return { id: a.dataset.qa, nombre, ow: parseFloat(cs.outlineWidth), os: cs.outlineStyle };
      });
      if (!info || visitados.includes(info.id)) break;
      visitados.push(info.id);
      if (info.os === 'none' || info.ow < 2) sinOutline.push(info.nombre);
    }
    const faltan = await page.evaluate((v) =>
      [...document.querySelectorAll<HTMLElement>('a[href], button, input, textarea, select, [tabindex]')]
        .filter((e) => e.tabIndex >= 0 && !(e as HTMLButtonElement).disabled && e.checkVisibility({ visibilityProperty: true }))
        .filter((e) => !v.includes(e.dataset.qa || ''))
        .map((e) => e.tagName + (e.id ? '#' + e.id : '') + '.' + e.className), visitados);
    expect(faltan, 'interactivos que el Tab no alcanzo').toEqual([]);
    expect(sinOutline, 'elementos sin outline visible al enfocar').toEqual([]);
    expect(visitados.length).toBeGreaterThanOrEqual(10);
  });

  test('el honeypot esta fuera de pantalla y fuera del orden de tab', async ({ page }) => {
    await abrir(page);
    const hp = page.locator('#f-hp');
    await expect(hp).toHaveAttribute('tabindex', '-1');
    expect((await hp.boundingBox())!.x).toBeLessThan(0);
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press('Tab');
      await expect(hp).not.toBeFocused();
    }
  });
});
