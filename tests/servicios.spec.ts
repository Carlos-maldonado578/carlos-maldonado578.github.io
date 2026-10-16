import { test, expect } from '@playwright/test';
import { abrir } from './comun';

test.describe('Servicios y orden de la pagina', () => {
  test('tres filas sin demos, cada una "Lo construyo para ti", y el caso va antes', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('#t-hago')).toHaveText('Lo mismo, para tus pedidos, avisos y boletas');
    const filas = page.locator('.sv-fila');
    await expect(filas).toHaveCount(3);
    expect(await filas.locator('h3').allTextContents()).toEqual(['Pedidos', 'Avisos', 'Boletas y facturas']);
    for (const e of await filas.locator('.sv-estado').allTextContents()) expect(e).toBe('Lo construyo para ti');
    await expect(page.locator('.servicios')).toContainText('Aún no los tengo andando en un cliente');
    await expect(page.locator('.servicios')).toContainText('SII');
    await expect(page.locator('.servicios table, .hoja, .pega')).toHaveCount(0);
    const ids = await page.locator('main > section').evaluateAll((s) => s.map((e) => e.getAttribute('aria-labelledby') || e.id));
    expect(ids).toEqual(['t-hero', 't-problema', 't-caso', 't-hago', 't-trabajo', 't-quien', 't-faq', 't-contacto']);
  });

  test('caso real: chip de cliente real, n8n traducido y fondo claro', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('.chip-real')).toHaveText('Cliente real, datos anonimizados');
    await expect(page.locator('.caso-arma')).toContainText('n8n, un programa que las conecta');
    const bg = await page.locator('.banda-caso').evaluate((e) => getComputedStyle(e).backgroundColor);
    expect(bg).toBe('rgb(227, 234, 208)');
  });

  test('texto aprobado: sin Tres principios, mensualidad en el paso 4, quien soy sin caja', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('.principios')).toHaveCount(0);
    await expect(page.locator('.pasos > li').nth(2)).toContainText('apruebas lo importante, como las boletas');
    await expect(page.locator('.pasos > li').nth(3)).toContainText('servicio en internet que yo mantengo');
    await expect(page.locator('.pasos > li').nth(3)).toContainText('Pagas una mensualidad por mantenerlo');
    await expect(page.locator('.quien')).toContainText('bancos y empresas de pagos');
    await expect(page.locator('.quien')).toContainText('Trabajo solo, sin agencia: hablas directo conmigo');
    await expect(page.locator('.quien .datos')).toHaveCount(0);
    expect(await page.locator('.quien').textContent()).not.toMatch(/fintech/i);
    await expect(page.locator('.faq')).toContainText('Un pago por armar el proyecto y una mensualidad por mantenerlo andando');
  });

  test('hero: Formulario en la ilustracion, WhatsApp solo en el Problema', async ({ page }) => {
    await abrir(page);
    const nombres = await page.locator('.hero-ilus .ilus:visible text').allTextContents();
    expect(nombres).toEqual(['Telegram', 'Formulario', 'Correo', 'Planilla de Google', 'Resumen', 'Aviso']);
    await expect(page.locator('#t-problema ~ .lead')).toContainText('WhatsApp');
    expect(await page.locator('.hero').textContent()).not.toMatch(/WhatsApp/);
  });
});
