import { test, expect } from '@playwright/test';
import { abrir } from './comun';

test.describe('Sin scroll horizontal', () => {
  for (const w of [390, 768, 1024, 1280, 1440]) {
    test(`a ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 900 });
      await abrir(page);
      const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, bw: document.body.scrollWidth }));
      expect(m.sw, JSON.stringify(m)).toBeLessThanOrEqual(m.iw);
      expect(m.bw, JSON.stringify(m)).toBeLessThanOrEqual(m.iw);
    });
  }
});

test.describe('Objetivos tactiles', () => {
  test('botones, enlaces-boton y campos >= 44px de alto en movil', async ({ page }, info) => {
    test.skip(info.project.name !== 'movil');
    await abrir(page);
    const chicos = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('button, a.btn, input, textarea')]
        .filter((e) => !e.closest('.hp') && e.checkVisibility())
        .map((e) => ({ el: e.tagName + (e.id ? '#' + e.id : '') + '.' + e.className, h: Math.round(e.getBoundingClientRect().height) }))
        .filter((x) => x.h < 44));
    expect(chicos, 'elementos con alto < 44px').toEqual([]);
  });
});
