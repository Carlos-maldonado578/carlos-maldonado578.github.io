import type { Page } from '@playwright/test';

export const VACIO = 'http://localhost:4174/'; // build sin PUBLIC_WEBHOOK_URL
export const HOOK = '**/__webhook'; // build normal: PUBLIC_WEBHOOK_URL=http://localhost:4173/__webhook

export async function abrir(page: Page, url = '/') {
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
}

export async function llenar(page: Page, v: { nombre?: string; contacto?: string; mensaje?: string } = {}) {
  await page.locator('#f-mensaje').fill(v.mensaje ?? 'Anotamos los pedidos a mano y los pasamos a una planilla.');
  await page.locator('#f-nombre').fill(v.nombre ?? 'Ana Prueba');
  await page.locator('#f-contacto').fill(v.contacto ?? 'ana@ejemplo.cl');
}
