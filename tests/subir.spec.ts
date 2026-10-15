import { test, expect } from '@playwright/test';
import { abrir } from './comun';

test.describe('Boton volver arriba', () => {
  test('aparece tras el primer viewport, ancla a #inicio y mide >= 44x44', async ({ page }) => {
    await abrir(page);
    const subir = page.locator('.subir');
    await expect(subir).toHaveAttribute('href', '#inicio');
    if (page.viewportSize()!.width < 768) {
      // En móvil se oculta: tapaba texto y ya hay cabecera fija y "Volver al inicio" en el pie.
      await page.evaluate(() => scrollTo(0, innerHeight * 1.5));
      await expect(subir).toBeHidden();
      return;
    }
    await expect(subir).not.toHaveClass(/visible/);
    await page.evaluate(() => scrollTo(0, innerHeight * 0.5));
    await expect(subir).not.toHaveClass(/visible/);
    await page.evaluate(() => scrollTo(0, innerHeight * 1.5));
    await expect(subir).toHaveClass(/visible/);
    await expect(subir).toBeVisible();
    const b = (await subir.boundingBox())!;
    expect(b.width).toBeGreaterThanOrEqual(44);
    expect(b.height).toBeGreaterThanOrEqual(44);
    await subir.click();
    await expect(page).toHaveURL(/#inicio$/);
    await expect.poll(() => page.evaluate(() => scrollY), { timeout: 5000 }).toBeLessThan(5);
    await expect(subir).not.toHaveClass(/visible/);
  });

  test('nunca tapa el boton Enviar (barrido de scroll por el formulario)', async ({ page }) => {
    await abrir(page);
    const yEnviar = await page.locator('#enviar').evaluate((e) => e.getBoundingClientRect().top + scrollY);
    const solapes: string[] = [];
    for (let y = yEnviar - 1000; y < yEnviar + 300; y += 40) {
      await page.evaluate((v) => scrollTo(0, v), y);
      await page.waitForTimeout(60);
      const r = await page.evaluate(() => {
        const s = document.querySelector('.subir')!;
        const vis = s.classList.contains('visible') && getComputedStyle(s).visibility === 'visible';
        const a = s.getBoundingClientRect(), e = document.getElementById('enviar')!.getBoundingClientRect();
        const cruza = a.left < e.right && a.right > e.left && a.top < e.bottom && a.bottom > e.top;
        return { vis, cruza, y: scrollY };
      });
      if (r.vis && r.cruza) solapes.push(`scrollY=${Math.round(r.y)}`);
    }
    expect(solapes).toEqual([]);
  });
});
