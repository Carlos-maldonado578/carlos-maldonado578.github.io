import { test, expect } from '@playwright/test';
import { abrir } from './comun';

test.describe('Segunda ronda de mejoras', () => {
  test('FAQ: 4 details nativos que abren y cierran con el teclado', async ({ page }) => {
    await abrir(page);
    const d = page.locator('.faq details');
    await expect(d).toHaveCount(4);
    await expect(page.locator('.faq details[open]')).toHaveCount(0);
    const s0 = d.nth(0).locator('summary');
    await s0.focus();
    await page.keyboard.press('Enter');
    await expect(d.nth(0)).toHaveAttribute('open', '');
    await expect(d.nth(0).locator('p')).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(d.nth(0)).not.toHaveAttribute('open', '');
    await page.keyboard.press('Tab'); // siguiente pregunta
    await expect(d.nth(1).locator('summary')).toBeFocused();
    await page.keyboard.press('Space');
    await expect(d.nth(1)).toHaveAttribute('open', '');
    // sin cifras de precio en las respuestas
    expect(await page.locator('.faq').textContent()).not.toMatch(/\$|\bCLP\b|\bUF\b/);
  });

  test('Quien soy: bloque corto, primera persona, sin foto', async ({ page }) => {
    await abrir(page);
    const q = page.locator('.quien');
    await expect(q.getByRole('heading', { level: 2, name: 'Quién soy' })).toBeVisible();
    await expect(q.locator('.quien-texto p')).toHaveCount(3);
    await expect(q).toContainText('Soy Carlos Maldonado');
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

  test('Caso en movil: eje vertical, antes y ahora lado a lado y sin scroll horizontal', async ({ page }, info) => {
    test.skip(info.project.name !== 'movil');
    await abrir(page);
    const r = await page.evaluate(() => {
      const a = document.querySelector('.antes .pista')!.getBoundingClientRect();
      const b = document.querySelector('.ahora .pista')!.getBoundingClientRect();
      const hs = [...document.querySelectorAll('.antes .hito')].map((e) => e.getBoundingClientRect().top - a.top);
      return { lado: b.left > a.left && Math.abs(a.top - b.top) < 2, hs, alto: a.height, sinScroll: document.documentElement.scrollWidth <= innerWidth };
    });
    expect(r.lado).toBe(true);
    expect(r.sinScroll).toBe(true);
    // 08:00, 17:30, 20:00 en vertical, proporcionales al alto de la pista
    [0, 9.5 / 12, 1].forEach((f, i) => expect(Math.abs(r.hs[i] - f * r.alto)).toBeLessThan(2));
  });

  test('Que pasa despues de enviar: 3 pasos bajo el boton; el precio va al final de las promesas', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('.despues li')).toHaveCount(3);
    const y = await page.evaluate(() => ({
      boton: document.getElementById('enviar')!.getBoundingClientRect().bottom,
      pasos: document.querySelector('.despues')!.getBoundingClientRect().top,
    }));
    expect(y.pasos).toBeGreaterThan(y.boton);
    await expect(page.locator('.despues a')).toHaveAttribute('href', /^mailto:/);
    const prom = await page.locator('.promesas strong').allTextContents();
    expect(prom).toHaveLength(4);
    expect(prom[prom.length - 1]).toContain('se cotiza aparte');
  });

  test('Como trabajo: carriles Yo hago / Tu haces; Que no hago tiene 4 limites', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('.pasos > li')).toHaveCount(4);
    await expect(page.locator('.pasos .yo')).toHaveCount(4);
    await expect(page.locator('.pasos .tu')).toHaveCount(4);
    await expect(page.locator('.no-hago li')).toHaveCount(4);
  });

  test('bandas de fondo: solo 3 cortes de color de arriba a abajo', async ({ page }) => {
    await abrir(page);
    const fondos = await page.evaluate(() => [...document.querySelectorAll('main > section')].map((s) => getComputedStyle(s).backgroundColor));
    const cortes = fondos.filter((c, i) => i > 0 && c !== fondos[i - 1]).length;
    expect(cortes, fondos.join(' | ')).toBe(3);
  });

  test('la tabla de la demo del hero nunca carga vacia (primeros 3 segundos)', async ({ page }) => {
    await abrir(page);
    for (let i = 0; i < 6; i++) {
      const visibles = await page.locator('#demo tbody tr').evaluateAll((trs) => trs.filter((t) => getComputedStyle(t.querySelector('td')!).opacity === '1').length);
      expect(visibles).toBe(5);
      await page.waitForTimeout(500);
    }
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
