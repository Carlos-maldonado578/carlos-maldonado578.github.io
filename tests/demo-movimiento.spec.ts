import { test, expect } from '@playwright/test';
import { abrir } from './comun';

test.describe('Movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });

  test('la ilustracion del hero se ve completa y no tiene animaciones en curso', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('.hero-ilus .ilus:visible')).toHaveCount(1);
    await page.waitForTimeout(500);
    const enCurso = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.getTiming().iterations === Infinity).length);
    expect(enCurso).toBe(0);
  });

  test('el caso real se ve completo (sin reloj ni boton de pausa)', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('#caso-pausa')).toBeHidden();
    for (const h of await page.locator('.eje .hito').all()) {
      expect(await h.evaluate((e) => getComputedStyle(e).opacity)).toBe('1');
    }
  });
});

test.describe('Sin JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('todo el contenido visible y correo de respaldo', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    for (const h of await page.locator('h2').all()) await expect(h).toBeVisible();
    await expect(page.locator('.hero-ilus .ilus:visible')).toHaveCount(1);
    await expect(page.locator('.sv-tarjeta')).toHaveCount(2);
    await expect(page.locator('.sin-js')).toBeVisible();
    await expect(page.locator('.sin-js a')).toHaveAttribute('href', /mailto:carlos\.automatiza\.tupyme@gmail\.com/);
  });
});
