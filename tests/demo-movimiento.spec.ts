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

  test('las 4 escenas de "Elige tu pega" se ven completas y estaticas', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('#pegas-pausa')).toBeHidden();
    for (let i = 0; i < 4; i++) {
      await page.locator('.pega-tab').nth(i).click();
      const panel = page.locator('.pega.activa');
      await expect(panel).toBeVisible();
      const apagados = await panel.evaluate((p) =>
        [...p.querySelectorAll('.fila-nueva, .aviso, .pega-resultado, .boleta dd, .mensaje')]
          .filter((e) => !e.classList.contains('on') || getComputedStyle(e).opacity !== '1')
          .map((e) => e.className));
      expect(apagados, `pestana ${i}`).toEqual([]);
      // el boton "volver arriba" puede estar desvaneciendose por el scroll: solo cuenta lo de la demo/escenas
      await expect.poll(() => page.evaluate(() => document.getAnimations()
        .filter((a) => a.playState === 'running' && (a.effect as KeyframeEffect).target?.closest('#pegas')).length),
        { message: `animaciones corriendo en pestana ${i}` }).toBe(0);
    }
  });
});

test.describe('Sin JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('todo el contenido visible, 4 escenas apiladas y correo de respaldo', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    for (const h of await page.locator('h2').all()) await expect(h).toBeVisible();
    await expect(page.locator('.pegas-lista')).toBeHidden();
    const cajas = [];
    for (const p of await page.locator('.pega').all()) {
      await expect(p).toBeVisible();
      cajas.push((await p.boundingBox())!);
    }
    expect(cajas).toHaveLength(4);
    for (let i = 1; i < 4; i++) expect(cajas[i].y, 'escenas apiladas, sin solaparse').toBeGreaterThanOrEqual(cajas[i - 1].y + cajas[i - 1].height - 1);
    await expect(page.locator('.sin-js')).toBeVisible();
    await expect(page.locator('.sin-js a')).toHaveAttribute('href', /mailto:carlos\.automatiza\.tupyme@gmail\.com/);
    await expect(page.locator('.hero-ilus .ilus:visible')).toHaveCount(1);
  });
});
