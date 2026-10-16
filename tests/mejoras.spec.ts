import { test, expect } from '@playwright/test';
import { abrir, llenar } from './comun';

test.describe('Segunda ronda de mejoras', () => {
  test('FAQ: 5 preguntas siempre visibles, respuestas cortas y sin cifras de precio', async ({ page }) => {
    await abrir(page);
    const q = page.locator('.faq > div');
    await expect(q).toHaveCount(5);
    for (const t of await q.all()) {
      await expect(t.locator('h3')).toBeVisible();
      await expect(t.locator('p')).toBeVisible();
    }
    expect(await page.locator('.faq').textContent()).not.toMatch(/\$|CLP|UF/);
  });

  test('Quien soy: primera persona, sin foto; contacto dice como es la primera conversacion', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('.quien')).toContainText('Llevo 5 años como desarrollador');
    await expect(page.locator('.quien')).toContainText('Santiago');
    await expect(page.locator('.promesas')).toContainText('llamada o videollamada');
    await expect(page.locator('img')).toHaveCount(0);
  });

  test('Caso: eje 08-20 con posiciones proporcionales y en orden', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'eje horizontal solo en desktop; en movil es vertical');
    await abrir(page);
    const r = await page.evaluate(() => {
      const out: Record<string, { h: number; x: number; w: number }[]> = {};
      for (const c of ['antes', 'ahora']) {
        const pista = document.querySelector(`.${c} .pista`)!.getBoundingClientRect();
        out[c] = [...document.querySelectorAll(`.${c} .pista .hito`)].map((li) => {
          const b = li.getBoundingClientRect();
          const h = parseFloat((li as HTMLElement).style.getPropertyValue('--h'));
          // el tick esta en el borde izquierdo, o en el derecho si es .der
          const x = li.classList.contains('der') ? b.right : b.left;
          return { h, x: x - pista.left, w: pista.width };
        });
      }
      const esc = [...document.querySelectorAll('.escala li')].map((li) => li.textContent);
      return { ...out, esc };
    });
    for (const c of ['antes', 'ahora'] as const) {
      const hitos = r[c];
      for (const e of hitos) expect(Math.abs(e.x - ((e.h - 8) / 12) * e.w), `${c} ${e.h}`).toBeLessThan(2);
      const xs = hitos.map((e) => e.x);
      expect([...xs].sort((a, b) => a - b)).toEqual(xs); // orden de lectura = orden en el eje
    }
    // Antes: vacio hasta ~17:30 (79%); Ahora: arranca a <=3% y llena hasta las 18:00
    expect(r.antes[1].x / r.antes[1].w).toBeGreaterThan(0.78);
    expect(r.ahora[0].x / r.ahora[0].w).toBeLessThan(0.03);
    expect(r.esc).toEqual(['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']);
    // el tramo "Ahora" es una pista solida que empieza a las 08:14 y termina a las 18:00
    const t = await page.evaluate(() => {
      const p = document.querySelector('.ahora .pista')!.getBoundingClientRect();
      const b = document.querySelector('.ahora .tramo')!.getBoundingClientRect();
      return { ini: (b.left - p.left) / p.width, fin: (b.right - p.left) / p.width };
    });
    expect(t.ini).toBeCloseTo(0.2333 / 12, 2);
    expect(t.fin).toBeCloseTo(10 / 12, 2);
    // sin solapes de texto dentro de cada carril
    const solapes = await page.evaluate(() => {
      const malos: string[] = [];
      for (const c of ['antes', 'ahora']) {
        const cajas = [...document.querySelectorAll(`.${c} .pista .hito > *, .${c} .tramo span`)].map((e) => {
          const r = document.createRange();
          r.selectNodeContents(e);
          return r.getBoundingClientRect();
        });
        for (let i = 0; i < cajas.length; i++)
          for (let j = i + 1; j < cajas.length; j++) {
            const a = cajas[i], b = cajas[j];
            if (a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1) malos.push(`${c} ${i}-${j}`);
          }
      }
      return malos;
    });
    expect(solapes).toEqual([]);
  });

  test('Caso: las 5 horas se leen en orden para lectores de pantalla', async ({ page }) => {
    await abrir(page);
    const horas = await page.locator('.eje .pista .hora').allTextContents();
    expect(horas).toEqual(['08:00', '17:30', '20:00', '08:14', '18:00']);
    await expect(page.locator('.escala')).toHaveAttribute('aria-hidden', 'true');
  });

  test('Caso en movil: Antes y Ahora apilados, evento a ancho completo y sin scroll horizontal', async ({ page }, info) => {
    test.skip(info.project.name !== 'movil');
    await abrir(page);
    const r = await page.evaluate(() => {
      const a = document.querySelector('.antes')!.getBoundingClientRect();
      const b = document.querySelector('.ahora')!.getBoundingClientRect();
      const p = document.querySelector('.antes .hito p')!.getBoundingClientRect();
      return { apilado: b.top >= a.bottom - 1, anchoTexto: p.width, anchoPagina: innerWidth, sinScroll: document.documentElement.scrollWidth <= innerWidth };
    });
    expect(r.apilado).toBe(true);
    expect(r.sinScroll).toBe(true);
    expect(r.anchoTexto).toBeGreaterThan(r.anchoPagina * 0.6);
    await expect(page.locator('.reloj')).toBeHidden();
  });

  test('Exito: dice que pasa ahora; el contacto aclara que la primera conversacion no tiene costo', async ({ page }) => {
    await page.route('**/__webhook', (r) => r.fulfill({ status: 200, body: 'ok' }));
    await abrir(page);
    await llenar(page);
    await page.locator('#enviar').click();
    await expect(page.locator('#exito')).toBeVisible();
    await expect(page.locator('.exito-sigue')).toContainText('llamada o videollamada');
    await expect(page.locator('.promesas')).toContainText('sin costo');
  });

  test('Como trabajo: 4 pasos con titulo y una frase; Que no hago tiene 3 limites', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('.pasos > li')).toHaveCount(4);
    await expect(page.locator('.pasos h3')).toHaveText(['Conversamos', 'Definimos por dónde partir', 'Construyo la primera parte', 'Queda funcionando']);
    await expect(page.locator('.pasos p')).toHaveCount(4);
    await expect(page.locator('.pasos .lado')).toHaveCount(0);
    await expect(page.locator('.no-hago li')).toHaveCount(3);
  });

  test('bandas de fondo: 4 cortes de color (hero, noche, contacto)', async ({ page }) => {
    await abrir(page);
    const fondos = await page.evaluate(() => [...document.querySelectorAll('main > section')].map((s) => getComputedStyle(s).backgroundColor));
    const cortes = fondos.filter((c, i) => i > 0 && c !== fondos[i - 1]).length;
    expect(cortes, fondos.join(' | ')).toBe(4);
  });

  test('hero: ilustracion con 6 cajas con nombre, sin n8n; "Mira cómo funciona" visible', async ({ page }) => {
    await abrir(page);
    const svg = page.locator('.hero-ilus .ilus:visible');
    await expect(svg).toHaveCount(1);
    await expect(svg).toHaveAttribute('role', 'img');
    const nombres = await svg.locator('text').allTextContents();
    expect(nombres).toEqual(['Telegram', 'Formulario', 'Correo', 'Planilla de Google', 'Resumen', 'Aviso']);
    expect(await page.locator('.hero').textContent()).not.toMatch(/n8n/i);
    await expect(page.locator('.hero-cta .enlace-texto')).toBeVisible();
    await expect(page.locator('.hero-demo, #demo')).toHaveCount(0);
  });

  test('la grilla de puntos solo existe en el hero', async ({ page }) => {
    await abrir(page);
    const fondos = await page.evaluate(() => [...document.querySelectorAll('main *, main')].filter((e) => getComputedStyle(e).backgroundImage !== 'none' || getComputedStyle(e, '::before').backgroundImage !== 'none').map((e) => e.className));
    expect(fondos).toEqual(['hero-ilus']);
  });

  test.describe('movimiento reducido', () => {
    test.use({ reducedMotion: 'reduce' });
    test('volver arriba aparece sin transicion ni animacion (B2 cerrado)', async ({ page }) => {
      await abrir(page);
      const t = await page.locator('.subir').evaluate((e) => getComputedStyle(e).transitionDuration);
      expect(t.split(',').every((x) => parseFloat(x) === 0), t).toBe(true);
      await page.evaluate(() => scrollTo(0, innerHeight * 1.5));
      await expect(page.locator('.subir')).toHaveClass(/visible/);
      const anim = await page.evaluate(() => document.getAnimations().filter((a) => (a.effect as KeyframeEffect)?.target?.classList?.contains('subir')).length);
      expect(anim).toBe(0);
      expect(await page.locator('.subir').evaluate((e) => getComputedStyle(e).opacity)).toBe('1');
    });
  });
});
