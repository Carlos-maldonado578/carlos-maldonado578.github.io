import { test, expect } from '@playwright/test';
import { abrir, indiceActivo, verPegas } from './comun';

const PEGA = 9000; // DUR_PEGA en main.js
const tab = (page: any, i: number) => page.locator('.pega-tab').nth(i);

test.describe('Elige tu pega', () => {
  test('roles ARIA tablist/tab/tabpanel y relaciones', async ({ page }) => {
    await abrir(page);
    await expect(page.getByRole('tablist')).toHaveCount(1);
    await expect(page.getByRole('tab')).toHaveCount(4);
    const r = await page.evaluate(() => {
      const tabs = [...document.querySelectorAll('.pega-tab')];
      return tabs.map((t) => {
        const p = document.getElementById(t.getAttribute('aria-controls')!);
        return { panel: p?.getAttribute('role'), etiqueta: p?.getAttribute('aria-labelledby') === t.id, sel: t.getAttribute('aria-selected'), ti: (t as HTMLElement).tabIndex };
      });
    });
    expect(r.map((x) => x.panel)).toEqual(['tabpanel', 'tabpanel', 'tabpanel', 'tabpanel']);
    expect(r.every((x) => x.etiqueta)).toBe(true);
    expect(r.filter((x) => x.sel === 'true')).toHaveLength(1);
    expect(r.filter((x) => x.ti === 0)).toHaveLength(1); // tabindex itinerante
    await expect(page.locator('.pega.activa')).toHaveCount(1);
  });

  test('flechas, Inicio y Fin cambian de pestana y aria-selected', async ({ page }) => {
    await abrir(page);
    await tab(page, 0).click();
    await page.mouse.move(5, 5); // aparta el mouse (ver el test del hover residual)
    await expect(tab(page, 0)).toBeFocused();
    const paso = async (tecla: string, esperado: number) => {
      await page.keyboard.press(tecla);
      expect(await indiceActivo(page), tecla).toBe(esperado);
      await expect(tab(page, esperado)).toBeFocused();
      await expect(page.locator('.pega.activa')).toHaveCount(1);
    };
    await paso('ArrowDown', 1);
    await paso('ArrowRight', 2);
    await paso('End', 3);
    await paso('ArrowDown', 0); // vuelta
    await paso('ArrowUp', 3);
    await paso('ArrowLeft', 2);
    await paso('Home', 0);
  });

  test('el clic cambia de pestana', async ({ page }) => {
    await abrir(page);
    await tab(page, 2).click();
    expect(await indiceActivo(page)).toBe(2);
    await expect(page.locator('#pega-avisos')).toBeVisible();
    await expect(page.locator('#pega-registros')).toBeHidden();
  });

  // Antes (B1) el hover elegia pestanas y pisaba al teclado. Ahora solo cuentan clic y teclado.
  test('el hover NO cambia la pestana (solo clic o teclado)', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'hover solo con puntero fino');
    await abrir(page);
    await tab(page, 0).click();
    await tab(page, 2).hover();
    await page.waitForTimeout(600);
    expect(await indiceActivo(page)).toBe(0);
    await tab(page, 3).hover();
    await page.waitForTimeout(600);
    expect(await indiceActivo(page)).toBe(0);
  });

  test('el teclado no es pisado por el mouse quieto sobre la lista (B1 cerrado)', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'hover solo con puntero fino');
    await abrir(page);
    await tab(page, 0).click(); // el mouse queda sobre la lista
    const seq: number[] = [];
    for (const k of ['ArrowDown', 'ArrowRight', 'End']) {
      await page.keyboard.press(k);
      await page.waitForTimeout(450);
      seq.push(await indiceActivo(page));
    }
    expect(seq).toEqual([1, 2, 3]);
  });

  test('Pausar queda bajo la lista, pegado a su ultima regla (desktop)', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop');
    await abrir(page);
    await verPegas(page);
    await expect(page.locator('#pegas-pausa')).toBeVisible({ timeout: 5000 });
    const r = await page.evaluate(() => {
      const l = document.querySelector('.pegas-lista')!.getBoundingClientRect();
      const b = document.getElementById('pegas-pausa')!.getBoundingClientRect();
      const p = document.querySelector('.pegas-paneles')!.getBoundingClientRect();
      return { gap: b.top - l.bottom, bajoLista: b.left >= l.left - 13 && b.right <= l.right + 1, izqDelPanel: b.right <= p.left };
    });
    expect(r.gap).toBeGreaterThanOrEqual(0);
    expect(r.gap).toBeLessThanOrEqual(24);
    expect(r.bajoLista).toBe(true);
    expect(r.izqDelPanel).toBe(true);
  });

  test('"Lo puedo armar" nombra herramientas reales en las 3 pegas por construir', async ({ page }) => {
    await abrir(page);
    for (const id of ['pedidos', 'avisos', 'boletas']) {
      const t = await page.locator(`#pega-${id} .pega-arma`).textContent();
      expect(t, id).toMatch(/n8n/);
    }
    await expect(page.locator('#pega-registros .pega-arma')).toContainText('Telegram');
  });

  test('el alto de la seccion no cambia entre pestanas (2px)', async ({ page }) => {
    await abrir(page);
    const altos: number[] = [];
    for (let i = 0; i < 4; i++) {
      await tab(page, i).click();
      await page.waitForTimeout(300);
      altos.push(await page.locator('#pegas').evaluate((e) => e.getBoundingClientRect().height));
    }
    expect(Math.max(...altos) - Math.min(...altos), `altos: ${altos}`).toBeLessThanOrEqual(2);
  });

  for (const w of [1024, 1100, 1280]) {
    test(`el nombre de la pestana activa cabe en una linea a ${w}px`, async ({ page }, info) => {
      test.skip(info.project.name !== 'desktop');
      await page.setViewportSize({ width: w, height: 900 });
      await abrir(page);
      for (let i = 0; i < 4; i++) {
        await tab(page, i).click();
        const lineas = await tab(page, i).locator('.pega-nombre').evaluate((e) => {
          const r = document.createRange();
          r.selectNodeContents(e);
          return new Set([...r.getClientRects()].map((x) => Math.round(x.top))).size;
        });
        expect(lineas, `pestana ${i} a ${w}px`).toBe(1);
      }
    });
  }

  // Reloj simulado: cada pega dura 9 s (DUR_PEGA en main.js); no se esperan minutos reales.
  const abrirConReloj = async (page: any) => {
    await page.clock.install();
    await abrir(page);
    await verPegas(page);
    await expect(page.locator('#pegas-pausa')).toBeVisible();
    await page.clock.runFor(100);
  };

  test('rotacion continua: 0,1,2,3 y vuelve a 0, una pega cada ~9 s, en bucle', async ({ page }) => {
    await abrirConReloj(page);
    const seq = [await indiceActivo(page)];
    for (let k = 0; k < 6; k++) {
      await page.clock.runFor(PEGA);
      seq.push(await indiceActivo(page));
    }
    // cada ~9 s avanza una; tras la 4a vuelve a la 1a y sigue
    expect(seq).toEqual([0, 1, 2, 3, 0, 1, 2]);
    await expect(page.locator('#pegas-pausa')).toBeVisible();
    await expect(page.locator('#pegas-pausa')).toHaveText('Pausar');
  });

  test('cada pega permanece ~9 s antes de pasar a la siguiente', async ({ page }) => {
    await abrirConReloj(page);
    await page.clock.runFor(PEGA - 1500);
    expect(await indiceActivo(page)).toBe(0);
    await page.clock.runFor(2000);
    expect(await indiceActivo(page)).toBe(1);
  });

  test('la barra azul se llena durante lo que dura la pega', async ({ page }) => {
    await abrirConReloj(page);
    const dur = await page.locator('.pega-tab').first().evaluate((e) => e.style.getPropertyValue('--dur'));
    expect(dur).toBe(PEGA + 'ms');
    await expect(page.locator("#pegas")).toHaveClass(/ auto|^auto| auto$/);
  });

  test('Pausar/Reanudar detiene y retoma la rotacion', async ({ page }) => {
    await abrirConReloj(page);
    const pausa = page.locator('#pegas-pausa');
    await expect(pausa).toHaveText('Pausar');
    await pausa.click();
    await expect(pausa).toHaveText('Reanudar');
    await expect(page.locator('#pegas')).toHaveClass(/pausado/);
    const i = await indiceActivo(page);
    await page.clock.runFor(PEGA * 3);
    expect(await indiceActivo(page)).toBe(i);
    await pausa.click();
    await expect(pausa).toHaveText('Pausar');
    await expect(page.locator('#pegas')).not.toHaveClass(/pausado/);
    await page.clock.runFor(PEGA + 500);
    expect(await indiceActivo(page)).toBe((i + 1) % 4);
  });

  test('una interaccion corta el auto-avance y queda pausado hasta Reanudar', async ({ page }) => {
    await abrirConReloj(page);
    await tab(page, 2).click();
    const pausa = page.locator('#pegas-pausa');
    await expect(pausa).toBeVisible();
    await expect(pausa).toHaveText('Reanudar');
    await page.clock.runFor(PEGA * 3);
    expect(await indiceActivo(page)).toBe(2);
    await pausa.click();
    await expect(pausa).toHaveText('Pausar');
    await page.clock.runFor(PEGA + 500);
    expect(await indiceActivo(page)).toBe(3);
  });

  test('el teclado en una pega tambien corta el auto-avance', async ({ page }) => {
    await abrirConReloj(page);
    await tab(page, 0).focus();
    await page.keyboard.press('ArrowDown');
    expect(await indiceActivo(page)).toBe(1);
    await page.clock.runFor(PEGA * 3);
    expect(await indiceActivo(page)).toBe(1);
    await expect(page.locator('#pegas-pausa')).toHaveText('Reanudar');
  });

  test('fuera de pantalla la rotacion se pausa y al volver sigue', async ({ page }) => {
    await abrirConReloj(page);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForFunction(() => document.getElementById('pegas')!.classList.contains('pausado'));
    const i = await indiceActivo(page);
    await page.clock.runFor(PEGA * 3);
    expect(await indiceActivo(page)).toBe(i);
    await verPegas(page);
    await page.waitForFunction(() => !document.getElementById('pegas')!.classList.contains('pausado'));
    await page.clock.runFor(PEGA + 500);
    expect(await indiceActivo(page)).toBe((i + 1) % 4);
  });
});

test.describe('Elige tu pega con movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });
  test('sin auto-avance ni Pausar: la pega no cambia sola', async ({ page }) => {
    await page.clock.install();
    await abrir(page);
    await verPegas(page);
    await page.clock.runFor(PEGA * 3);
    expect(await indiceActivo(page)).toBe(0);
    await expect(page.locator('#pegas-pausa')).toBeHidden();
  });
});
