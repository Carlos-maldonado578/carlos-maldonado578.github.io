import { test, expect } from '@playwright/test';
import { abrir } from './comun';

test.describe('Estructura y texto de la pagina', () => {
  test('secciones en orden; servicios son dos tarjetas sin demos, sin numeros ni estado', async ({ page }) => {
    await abrir(page);
    const ids = await page.locator('main > section').evaluateAll((s) => s.map((e) => e.getAttribute('aria-labelledby') || e.id));
    expect(ids).toEqual(['t-hero', 't-caso', 't-hago', 't-trabajo', 't-quien', 't-faq', 't-contacto']);
    await expect(page.locator('#t-hago')).toHaveText('Lo mismo sirve para…');
    await expect(page.locator('.servicios .lead')).toHaveCount(0);
    await expect(page.locator('.servicios .chip-real')).toHaveText('Ejemplo');
    const filas = page.locator('.sv-tarjeta');
    await expect(filas).toHaveCount(2);
    await expect(filas.locator('h3')).toHaveText(['Pedidos', 'Stock']);
    await expect(page.locator('.servicios')).not.toContainText(/boleta/i);
    await expect(page.locator('.servicios')).not.toContainText('Lo construyo para ti');
    await expect(page.locator('.servicios table, .servicios .num')).toHaveCount(0);
  });

  test('iconos y mini-UI: decorativos (aria-hidden); las 2 tarjetas alinean mini-UI, título y texto', async ({ page }) => {
    await abrir(page);
    const svgs = await page.locator('main svg.ic').evaluateAll((l) => l.map((e) => ({ aria: e.getAttribute('aria-hidden'), role: e.getAttribute('role'), padre: e.closest('li')?.textContent?.trim().slice(0, 20) })));
    expect(svgs.length).toBe(3 + 4 + 3);
    expect(svgs.every((x) => x.aria === 'true' && !x.role)).toBe(true);
    for (const li of await page.locator('.ficha li, .pasos > li, .no-hago li').all()) expect(await li.locator('svg.ic').count()).toBe(1);
    const t = page.locator('.sv-tarjeta');
    await expect(t.locator('svg')).toHaveCount(0);
    expect(await t.locator('.mini').evaluateAll((l) => l.every((e) => e.getAttribute('aria-hidden') === 'true'))).toBe(true);
    expect(await t.locator('p').evaluateAll((l) => l.every((e) => e.getClientRects()[0].height < 30))).toBe(true);
    if ((await page.viewportSize())!.width >= 768) {
      const y = await t.evaluateAll((l) => l.map((e) => ['.mini', 'h3', 'p'].map((q) => Math.round(e.querySelector(q)!.getBoundingClientRect().top - e.getBoundingClientRect().top))));
      expect(y[1]).toEqual(y[0]);
    }
  });

  test('problema y caso son una sola seccion: titulo, chip, linea de tiempo y un boton', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('#t-caso')).toHaveText('Hoy se anota a mano. Podría anotarse solo.');
    await expect(page.locator('.banda-caso .chip-real')).toHaveText('Cliente real, datos anonimizados');
    await expect(page.locator('.caso-sec .btn')).toHaveText('Cuéntame tu caso');
    await expect(page.locator('#t-problema')).toHaveCount(0);
    expect(await page.locator('body').textContent()).not.toMatch(/n8n/i);
  });

  test('textos aprobados: quien soy, FAQ y contacto', async ({ page }) => {
    await abrir(page);
    expect(await page.locator('.quien').textContent()).not.toMatch(/fintech/i);
    await expect(page.locator('.faq > div h3')).toHaveText(['¿Cuánto cuesta?', '¿De quién son los datos?', '¿Necesito saber de computación?', '¿Y si algo falla?', '¿Sirve si uso Excel o WhatsApp?', '¿Cuánto demora?']);
    await expect(page.locator('.faq > div').nth(0)).toContainText('Un pago por armarlo y una mensualidad. Te doy ambos valores antes de empezar.');
    await expect(page.locator('#t-contacto')).toHaveText('Cuéntame qué te quita tiempo');
    await expect(page.locator('.contacto-texto .lead')).toHaveText('Dos líneas bastan. Te respondo en 1 día hábil.');
    await expect(page.locator('.nota-datos')).toHaveText('Uso tus datos solo para responderte.');
    await expect(page.locator('.promesas li')).toHaveText(['No tienes que preparar nada.', 'Te digo con honestidad si te sirve.', 'La primera conversación es sin costo.']);
    await expect(page.locator('.faq-intro .lead')).toHaveCount(0);
    await expect(page.locator('.faq-duda')).toHaveAttribute('href', '#contacto');
  });

  test('hero: Formulario en la ilustracion; WhatsApp solo aparece en el FAQ', async ({ page }) => {
    await abrir(page);
    const nombres = await page.locator('.hero-ilus .ilus:visible text').allTextContents();
    expect(nombres).toEqual(['Telegram', 'Formulario', 'Correo', 'Planilla de Google', 'Resumen', 'Aviso']);
    expect(await page.locator('.hero').textContent()).not.toMatch(/WhatsApp/);
    await expect(page.locator('.faq')).toContainText('WhatsApp');
  });

  test.describe('Separacion entre secciones y pie', () => {
    test('una sola regla: linea de 1px entre secciones; contacto y pie en crema; un solo volver arriba', async ({ page }) => {
      await abrir(page);
      const reglas = await page.locator('main > section').evaluateAll((s) => s.map((e, i) => (i === 0 ? null : getComputedStyle(e).borderTopWidth + ' ' + getComputedStyle(e).borderTopStyle)));
      expect(reglas.slice(1).every((r) => r === '1px solid')).toBe(true);
      const bg = await page.evaluate(() => ['#contacto', 'footer'].map((q) => getComputedStyle(document.querySelector(q)!).backgroundColor));
      expect(bg[0]).toBe('rgba(0, 0, 0, 0)');
      expect(bg[1]).toBe('rgb(244, 238, 220)');
      expect(await page.evaluate(() => getComputedStyle(document.querySelector('footer')!).borderTopWidth)).toBe('1px');
      await expect(page.locator('footer')).not.toContainText('Volver al inicio');
      await expect(page.locator('.subir')).toHaveCount(1);
      await expect(page.locator('footer .pie-nombre')).toHaveText('Carlos Maldonado');
    });

    test('cabecera: un enlace a inicio con simbolo decorativo, nombre y descriptor solo en escritorio', async ({ page }) => {
      await abrir(page);
      const a = page.locator('.cabecera a.marca-enlace');
      await expect(a).toHaveAttribute('href', '#inicio');
      await expect(a).toHaveAttribute('aria-label', 'Carlos Maldonado, inicio');
      await expect(a.locator('svg')).toHaveAttribute('aria-hidden', 'true');
      await expect(a.locator('.marca')).toHaveText('Carlos Maldonado');
      await expect(a.locator('.marca em')).toHaveText('Maldonado');
      if ((await page.viewportSize())!.width >= 768) await expect(a.locator('.marca-desc')).toBeVisible();
      else await expect(a.locator('.marca-desc')).toBeHidden();
    });

    test('la cabecera oculta su boton sobre el hero y sobre el formulario', async ({ page }) => {
      await abrir(page);
      await expect(page.locator('.cabecera .btn')).toBeHidden();
      await page.locator('#caso-eje').scrollIntoViewIfNeeded();
      await expect(page.locator('.cabecera .btn')).toBeVisible();
      await page.locator('#contacto').evaluate((e) => e.scrollIntoView());
      await expect(page.locator('.cabecera .btn')).toBeHidden();
    });
  });
});
