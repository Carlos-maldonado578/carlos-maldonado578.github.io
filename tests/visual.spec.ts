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

  test('quien soy', async ({ page }) => {
    await preparar(page);
    await expect(page.locator('.quien')).toHaveScreenshot('quien.png', opciones);
  });

  test('como trabajo', async ({ page }) => {
    await preparar(page);
    await expect(page.locator('.trabajo')).toHaveScreenshot('trabajo.png', opciones);
  });

  test('preguntas', async ({ page }) => {
    await preparar(page);
    await expect(page.locator('main > section').nth(4)).toHaveScreenshot('faq.png', opciones);
  });

  test('caso real', async ({ page }) => {
    await preparar(page);
    await expect(page.locator('.banda-caso')).toHaveScreenshot('caso.png', opciones);
  });

  test('formulario', async ({ page }) => {
    await preparar(page);
    await expect(page.locator('#contacto')).toHaveScreenshot('formulario.png', opciones);
  });
});
