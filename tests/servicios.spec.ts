import { test, expect } from '@playwright/test';
import { abrir } from './comun';

test.describe('Estructura y texto de la pagina', () => {
  test('secciones en orden; los ejemplos viven dentro del caso (sin seccion aparte)', async ({ page }) => {
    await abrir(page);
    const ids = await page.locator('main > section').evaluateAll((s) => s.map((e) => e.getAttribute('aria-labelledby') || e.id));
    expect(ids).toEqual(['t-hero', 't-caso', 't-trabajo', 't-quien', 't-faq', 't-contacto']);
    await expect(page.locator('#t-hago, .servicios, .sv-tarjeta')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText(/Lo mismo sirve|boleta/i);
  });

  test('ejemplos: rotulo, dos tarjetas con Antes/Ahora en el bloque del caso y un solo CTA', async ({ page }) => {
    await abrir(page);
    const e = page.locator('.banda-caso .ejemplos');
    await expect(e.locator('.rotulo-ej')).toHaveText('Ejemplo · Así se vería en tu negocio');
    await expect(e.locator('h4')).toHaveText(['Pedidos', 'Stock']);
    await expect(e.locator('li').nth(0)).toContainText('Te preguntan por WhatsApp en qué va el pedido.');
    await expect(e.locator('li').nth(0)).toContainText('Seguimiento en la planilla, con su estado.');
    await expect(e.locator('li').nth(1)).toContainText('Te enteras de que falta harina cuando ya no queda.');
    await expect(e.locator('li').nth(1)).toContainText('Recibes una alerta cuando quedan 3 sacos.');
    await expect(e.locator('svg, img')).toHaveCount(0);
    await expect(page.locator('.caso-sec .btn')).toHaveCount(1);
    const x = await e.locator('li').evaluateAll((l) => l.map((i) => Math.round(i.getBoundingClientRect().left)));
    if ((await page.viewportSize())!.width >= 768) expect(x[1]).toBeGreaterThan(x[0]);
    else expect(x[1]).toBe(x[0]);
  });

  test('iconos: uno por item y decorativos (aria-hidden)', async ({ page }) => {
    await abrir(page);
    const svgs = await page.locator('main svg.ic').evaluateAll((l) => l.map((e) => ({ aria: e.getAttribute('aria-hidden'), role: e.getAttribute('role') })));
    expect(svgs.length).toBe(3 + 4 + 3);
    expect(svgs.every((x) => x.aria === 'true' && !x.role)).toBe(true);
    for (const li of await page.locator('.ficha li, .pasos > li, .no-hago li').all()) expect(await li.locator('svg.ic').count()).toBe(1);
  });

  test('lenguaje de negocio: automatizar, registro, reporte, alerta; nada de "a mano" ni "se llena sola"', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('h1')).toHaveText('Tu planilla, automatizada.');
    await expect(page.locator('h1 em')).toHaveText('automatizada');
    await expect(page.locator('.hero .lead')).toHaveText('Tu equipo envía un mensaje y el dato queda registrado en la planilla. Al final del día recibes un reporte. Yo lo implemento y lo mantengo.');
    const antes = page.locator('.antes .hito p, .antes .tramo span');
    await expect(antes).toHaveText(['Cada uno registra en papel.', 'Sin saber cuánto se produjo.', 'Alguien consolida las hojas.', 'Recién ahí sabes el total.']);
    const ahora = page.locator('.ahora .hito p, .ahora .tramo span');
    await expect(ahora).toHaveText(['Juan envía “120 cajas” y queda registrado.', 'Registrado automáticamente.', 'Recibes el reporte del día.']);
    await expect(page.locator('label[for=f-mensaje]')).toHaveText('¿Qué tarea haces hoy de forma manual?');
    await expect(page.locator('#a-mensaje')).toHaveText('Por ejemplo: registro los pedidos en papel y después los paso a una planilla.');
    const texto = (await page.locator('body').innerText()).toLowerCase();
    for (const viejo of ['a mano', 'se llena sola', 'anota', 'podría anotarse solo']) expect(texto, viejo).not.toContain(viejo);
    expect(await page.locator('meta[property="og:image:alt"]').getAttribute('content')).toBe('Carlos Maldonado. Tu planilla, automatizada. Automatización para pymes en Santiago.');
  });

  test('problema y caso son una sola seccion: titulo, chip, linea de tiempo y un boton', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('#t-caso')).toHaveText('Hoy el registro es manual. Podría ser automático.');
    await expect(page.locator('.banda-caso .chip-real')).toHaveText('Cliente real, datos anonimizados');
    await expect(page.locator('.caso-sec .btn')).toHaveText('Cuéntame tu caso');
    await expect(page.locator('#t-problema')).toHaveCount(0);
    expect(await page.locator('body').textContent()).not.toMatch(/n8n/i);
  });

  test('textos aprobados: quien soy, FAQ y contacto', async ({ page }) => {
    await abrir(page);
    expect(await page.locator('.quien').textContent()).not.toMatch(/fintech/i);
    await expect(page.locator('.faq-grandes li h3')).toHaveText(['¿Cuánto cuesta?', '¿De quién son los datos?']);
    await expect(page.locator('.faq-titular')).toHaveText(['Sabes el valor antes de empezar', 'La planilla es tuya']);
    await expect(page.locator('.faq-grandes li').nth(0)).toContainText('Un pago por armarlo y una mensualidad. Te digo los dos en la primera conversación.');
    await expect(page.locator('.faq-grandes li').nth(1)).toContainText('Si un día dejamos de trabajar juntos, te la quedas con todos tus datos.');
    await expect(page.locator('.faq > div h3')).toHaveText(['¿Necesito saber de computación?', '¿Y si algo falla?', '¿Sirve si uso Excel o WhatsApp?', '¿Cuánto demora?']);
    await expect(page.locator('#t-contacto')).toHaveText('Cuéntame qué te quita tiempo');
    await expect(page.locator('.contacto-texto .lead')).toHaveText('Dos líneas bastan. Te respondo en 1 día hábil.');
    await expect(page.locator('.nota-datos')).toHaveText('Uso tus datos solo para responderte.');
    await expect(page.locator('.promesas li')).toHaveText(['No tienes que preparar nada.', 'Te digo con honestidad si te sirve.', 'La primera conversación es sin costo.']);
    await expect(page.locator('.faq-duda')).toHaveAttribute('href', '#contacto');
  });

  test('hero: Formulario en la ilustracion; WhatsApp solo aparece en el FAQ', async ({ page }) => {
    await abrir(page);
    const nombres = await page.locator('.hero-ilus .ilus:visible text').allTextContents();
    expect(nombres).toEqual(['Telegram', 'Formulario', 'Correo', 'Planilla de Google', 'Reporte', 'Aviso']);
    expect(await page.locator('.hero').textContent()).not.toMatch(/WhatsApp/);
    await expect(page.locator('section:has(#t-faq)')).toContainText('WhatsApp');
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
      await expect(a).toHaveAttribute('aria-label', 'Carlos Maldonado, automatización para pymes: inicio');
      await expect(a.locator('svg')).toHaveAttribute('aria-hidden', 'true');
      await expect(a.locator('svg')).toHaveAttribute('viewBox', '0 0 24 24');
      await expect(a.locator('svg rect')).toHaveCount(1); // la celda llena, separada del trazo del mensaje
      await expect(page.locator('.hero .etiqueta')).toHaveCount(0);
      await expect(page.locator('.hero')).not.toContainText('Santiago');
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
