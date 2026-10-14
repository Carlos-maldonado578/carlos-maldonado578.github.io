import { test, expect } from '@playwright/test';
import { abrir, indiceActivo, verPegas } from './comun';

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

  test('el hover (>200ms) cambia la pestana; pasar rapido no', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'hover solo con puntero fino');
    await abrir(page);
    await tab(page, 1).hover();
    await page.waitForTimeout(450);
    expect(await indiceActivo(page)).toBe(1);
    await tab(page, 3).hover();
    await page.mouse.move(5, 5);
    await page.waitForTimeout(450);
    expect(await indiceActivo(page)).toBe(1);
  });

  // BUG conocido (ver QA-REPORTE.md, B1): con el mouse quieto sobre la lista, el hover vuelve a elegir
  // pestanas y pisa al teclado. test.fail() = se espera que falle; cuando se corrija, avisara para quitarlo.
  test('el teclado no es pisado por un hover residual del mouse', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'hover solo con puntero fino');
    test.fail();
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

  test('Pausar/Reanudar detiene el auto-avance', async ({ page }) => {
    await abrir(page);
    await verPegas(page);
    const pausa = page.locator('#pegas-pausa');
    await expect(pausa).toBeVisible({ timeout: 5000 });
    await expect(pausa).toHaveText('Pausar');
    await pausa.click();
    await expect(pausa).toHaveText('Reanudar');
    await expect(page.locator('#pegas')).toHaveClass(/pausado/);
    const i = await indiceActivo(page);
    await page.waitForTimeout(9000); // mas que la escena mas larga
    expect(await indiceActivo(page)).toBe(i);
    await pausa.click();
    await expect(pausa).toHaveText('Pausar');
    await expect(page.locator('#pegas')).not.toHaveClass(/pausado/);
  });

  test('el auto-avance da una sola vuelta y termina quieto', async ({ page }) => {
    test.setTimeout(90_000);
    await abrir(page);
    await verPegas(page);
    const seq: number[] = [];
    const t0 = Date.now();
    let quietoDesde = 0;
    while (Date.now() - t0 < 60_000) {
      const i = await indiceActivo(page);
      if (seq[seq.length - 1] !== i) seq.push(i);
      if (seq.length >= 5 && !quietoDesde) quietoDesde = Date.now();
      if (quietoDesde && Date.now() - quietoDesde > 10_000) break;
      await page.waitForTimeout(200);
    }
    expect(seq, 'secuencia de pestanas activas').toEqual([0, 1, 2, 3, 0]);
    await expect(page.locator('#pegas-pausa')).toBeHidden(); // el control desaparece al terminar la vuelta
  });

  test('una interaccion corta el auto-avance', async ({ page }) => {
    test.setTimeout(60_000);
    await abrir(page);
    await verPegas(page);
    await expect(page.locator('#pegas-pausa')).toBeVisible({ timeout: 5000 });
    await tab(page, 2).click();
    await expect(page.locator('#pegas-pausa')).toBeHidden();
    await page.waitForTimeout(10_000);
    expect(await indiceActivo(page)).toBe(2);
  });
});
