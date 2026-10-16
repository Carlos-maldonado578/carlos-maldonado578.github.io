import { test, expect, type Page } from '@playwright/test';
import { abrir } from './comun';

test.use({ reducedMotion: 'reduce' });

// Estabiliza lo que se mueve solo: boton volver arriba y cabecera fija no deben tapar las capturas
async function preparar(page: Page) {
  await abrir(page);
  await page.addStyleTag({ content: '.subir{display:none!important}.cabecera{position:static!important}*{caret-color:transparent!important}' });
  await page.evaluate(() => document.fonts.ready);
}
const opciones = { animations: 'disabled' as const };

test.describe('Regresion visual', () => {
  test('hero', async ({ page }) => {
    await preparar(page);
    await expect(page.locator('.hero')).toHaveScreenshot('hero.png', opciones);
  });

  for (const [i, nombre] of ['registros', 'pedidos', 'avisos', 'boletas'].entries()) {
    test(`elige-tu-pega: ${nombre}`, async ({ page }) => {
      await preparar(page);
      await page.locator('.pega-tab').nth(i).click();
      await page.mouse.move(0, 0);
      await page.locator('#pegas').scrollIntoViewIfNeeded();
      await expect(page.locator('#pegas')).toHaveScreenshot(`pega-${nombre}.png`, opciones);
    });
  }

  test('como trabajo', async ({ page }) => {
    await preparar(page);
    await expect(page.locator('.trabajo')).toHaveScreenshot('trabajo.png', opciones);
  });

  test('preguntas', async ({ page }) => {
    await preparar(page);
    await page.locator('.faq details').first().locator('summary').click();
    await page.mouse.move(0, 0);
    await expect(page.locator('main > section').nth(5)).toHaveScreenshot('faq.png', opciones);
  });

  test('caso real', async ({ page }) => {
    await preparar(page);
    await expect(page.locator('.banda-azul')).toHaveScreenshot('caso.png', opciones);
  });

  test('formulario', async ({ page }) => {
    await preparar(page);
    await expect(page.locator('#contacto')).toHaveScreenshot('formulario.png', opciones);
  });
});
