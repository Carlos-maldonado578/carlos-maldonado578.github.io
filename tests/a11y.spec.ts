import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { abrir } from './comun';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa'];
async function axe(page: Page) {
  const r = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  return r.violations.map((v) => `${v.id} (${v.impact}): ${v.help} -> ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`);
}

test.describe('Accesibilidad (axe)', () => {
  test('estado inicial: 0 violaciones', async ({ page }) => {
    await abrir(page);
    expect(await axe(page)).toEqual([]);
  });

  test('formulario con errores: 0 violaciones', async ({ page }) => {
    await abrir(page);
    await page.locator('#enviar').click();
    await expect(page.locator('#e-mensaje')).toBeVisible();
    expect(await axe(page)).toEqual([]);
  });

  // movimiento reducido = estado final estatico; en plena animacion axe ve textos a medio desvanecer (falsos positivos)
  test('cada pestana de "Elige tu pega" (estado final): 0 violaciones', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await abrir(page);
    for (let i = 0; i < 4; i++) {
      await page.locator('.pega-tab').nth(i).click();
      await page.waitForTimeout(300);
      expect(await axe(page), `pestana ${i}`).toEqual([]);
    }
  });
});
