import { test, expect } from '@playwright/test';
import { abrir, llenar, HOOK, VACIO } from './comun';

test.describe('Formulario', () => {
  test('campos vacios: mensajes Falta/Revisa, aria-invalid y foco al primer error', async ({ page }) => {
    await abrir(page);
    await page.locator('#enviar').click();
    for (const k of ['mensaje', 'nombre', 'contacto']) {
      await expect(page.locator('#e-' + k)).toBeVisible();
      await expect(page.locator('#e-' + k)).toHaveText(/^(Falta|Revisa)/);
      await expect(page.locator('#f-' + k)).toHaveAttribute('aria-invalid', 'true');
    }
    await expect(page.locator('#f-mensaje')).toBeFocused();
  });

  test('contacto invalido dice Revisa; corregir limpia el error', async ({ page }) => {
    await abrir(page);
    await llenar(page, { contacto: 'abc' });
    await page.locator('#enviar').click();
    await expect(page.locator('#e-contacto')).toHaveText(/^Revisa/);
    await expect(page.locator('#f-contacto')).toBeFocused();
    await page.locator('#f-contacto').fill('ana@ejemplo.cl');
    await expect(page.locator('#e-contacto')).toBeHidden();
    await expect(page.locator('#f-contacto')).not.toHaveAttribute('aria-invalid', 'true');
  });

  test('POST con JSON exacto {nombre, contacto, mensaje, hp, t}', async ({ page }) => {
    let cuerpo: any, ct: string | undefined, n = 0;
    await page.route(HOOK, (r) => {
      n++;
      cuerpo = r.request().postDataJSON();
      ct = r.request().headers()['content-type'];
      return r.fulfill({ status: 200, body: 'ok' });
    });
    await abrir(page);
    await llenar(page, { nombre: 'Ana Prueba', contacto: 'ana@ejemplo.cl', mensaje: 'Anotamos los pedidos a mano.' });
    await page.locator('#enviar').click();
    await expect(page.locator('#exito')).toBeVisible();
    expect(n).toBe(1);
    expect(ct).toContain('application/json');
    expect(Object.keys(cuerpo).sort()).toEqual(['contacto', 'hp', 'mensaje', 'nombre', 't']);
    expect(cuerpo).toMatchObject({ nombre: 'Ana Prueba', contacto: 'ana@ejemplo.cl', mensaje: 'Anotamos los pedidos a mano.', hp: '' });
    expect(typeof cuerpo.t).toBe('number');
    expect(cuerpo.t).toBeGreaterThan(0);
  });

  test('exito: mini-planilla con la hora y el nombre', async ({ page }) => {
    await page.route(HOOK, (r) => r.fulfill({ status: 200, body: 'ok' }));
    await abrir(page);
    await llenar(page);
    await page.locator('#enviar').click();
    await expect(page.locator('#exito')).toBeVisible();
    await expect(page.locator('#tal-form')).toBeHidden();
    await expect(page.locator('#exito-t')).toBeFocused();
    await expect(page.locator('#x-quien')).toHaveText('Ana Prueba');
    await expect(page.locator('#x-hora')).toHaveText(/^\d\d:\d\d$/);
  });

  test('XSS: lo escrito se muestra como texto, no se ejecuta ni inyecta HTML', async ({ page }) => {
    await page.route(HOOK, (r) => r.fulfill({ status: 200, body: 'ok' }));
    await abrir(page);
    const veneno = '<img src=x onerror=window.__xss=1>';
    await llenar(page, { nombre: veneno, contacto: '<b>x</b>@ejemplo.cl' });
    await page.locator('#enviar').click();
    await expect(page.locator('#exito')).toBeVisible();
    await expect(page.locator('#x-nombre')).toHaveText(veneno);
    await expect(page.locator('#exito img, #exito b')).toHaveCount(0);
    await page.waitForTimeout(500);
    expect(await page.evaluate(() => (window as any).__xss)).toBeUndefined();
  });

  test('fallo 500: muestra correo de respaldo y conserva lo escrito', async ({ page }) => {
    await page.route(HOOK, (r) => r.fulfill({ status: 500, body: 'x' }));
    await abrir(page);
    await llenar(page);
    await page.locator('#enviar').click();
    await expect(page.locator('#fallo')).toBeVisible();
    await expect(page.locator('#fallo a')).toHaveAttribute('href', /^mailto:carlos\.automatiza\.tupyme@gmail\.com/);
    await expect(page.locator('#exito')).toBeHidden();
    await expect(page.locator('#f-nombre')).toHaveValue('Ana Prueba');
    await expect(page.locator('#f-contacto')).toHaveValue('ana@ejemplo.cl');
    await expect(page.locator('#f-mensaje')).toHaveValue(/Anotamos/);
    await expect(page.locator('#enviar')).toHaveText('Reintentar');
    await expect(page.locator('#f-nombre')).toBeEditable(); // se desbloquea para reintentar
  });

  test('timeout (peticion colgada): muestra respaldo y conserva lo escrito', async ({ page }) => {
    test.setTimeout(60_000);
    await page.route(HOOK, () => new Promise(() => {})); // nunca responde
    await abrir(page);
    await llenar(page);
    await page.locator('#enviar').click();
    await expect(page.locator('#enviar')).toHaveText('Enviando…');
    await expect(page.locator('#fallo')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#exito')).toBeHidden();
    await expect(page.locator('#f-mensaje')).toHaveValue(/Anotamos/);
  });

  test('sin PUBLIC_WEBHOOK_URL: falla con respaldo y NUNCA simula exito', async ({ page }) => {
    const posts: string[] = [];
    page.on('request', (r) => r.method() === 'POST' && posts.push(r.url()));
    await abrir(page, VACIO);
    await llenar(page);
    await page.locator('#enviar').click();
    await expect(page.locator('#fallo')).toBeVisible();
    await expect(page.locator('#exito')).toBeHidden();
    await expect(page.locator('#f-nombre')).toHaveValue('Ana Prueba');
    expect(posts).toEqual([]);
  });
});
