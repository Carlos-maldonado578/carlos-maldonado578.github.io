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

test.describe('Hero: nota bajo los botones cuando la columna de texto no alcanza', () => {
  for (const [w, debajo] of [[768, false], [1024, true], [1279, true], [1280, false], [1440, false]] as const) {
    test(`a ${w}px la nota ${debajo ? 'va debajo' : 'va al lado'} y no invade la ilustracion`, async ({ page }, info) => {
      test.skip(info.project.name !== 'desktop', 'se fija el ancho a mano');
      await page.setViewportSize({ width: w, height: 900 });
      await abrir(page);
      const r = await page.evaluate(() => {
        const box = (q: string) => document.querySelector(q)!.getBoundingClientRect();
        const btn = box('.hero-cta .btn'), nota = box('.hero-cta .nota'), ilus = box('.hero-ilus');
        const visible = [...document.querySelectorAll('.hero-ilus .ilus')].find((e) => getComputedStyle(e).display !== 'none')!.getBoundingClientRect();
        return { notaY: nota.top, btnBottom: btn.bottom, notaRight: nota.right, ilusLeft: visible.left, notaH: nota.height };
      });
      if (debajo) expect(r.notaY, JSON.stringify(r)).toBeGreaterThanOrEqual(r.btnBottom);
      else expect(r.notaY, JSON.stringify(r)).toBeLessThan(r.btnBottom);
      if (w >= 1024) expect(r.notaRight, JSON.stringify(r)).toBeLessThanOrEqual(r.ilusLeft);
      expect(r.notaH, JSON.stringify(r)).toBeLessThan(80); // nunca una columna angosta de 5-6 lineas
    });
  }
});
