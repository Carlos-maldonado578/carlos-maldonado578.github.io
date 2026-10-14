import { defineConfig, devices } from '@playwright/test';

// Navegador: Microsoft Edge instalado (channel msedge). El chromium descargado por Playwright falla aqui con 'spawn UNKNOWN'.

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 60_000,
  expect: { timeout: 7_000, toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  fullyParallel: true,
  workers: 4,
  reporter: [['list'], ['html', { open: 'never' }]],
  snapshotPathTemplate: '{testDir}/__snapshots__/{projectName}/{testFilePath}/{arg}{ext}',
  use: { channel: 'msedge', baseURL: 'http://localhost:4173', locale: 'es-CL', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'movil', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: 'node tests/servir.mjs',
    url: 'http://localhost:4173',
    reuseExistingServer: !!process.env.REUSAR_SERVIDOR,
    timeout: 180_000,
    stdout: 'pipe',
  },
});
