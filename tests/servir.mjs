// Construye dos veces (webhook de prueba y webhook vacio) y sirve ambos builds como estaticos
// (no usa `astro preview`: solo admite un servidor por proyecto y puede haber otro corriendo).
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const sitios = [
  { out: 'dist-test', port: 4173, hook: 'http://localhost:4173/__webhook' },
  { out: 'dist-test-vacio', port: 4174, hook: '' },
];
const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json', '.txt': 'text/plain' };

for (const s of sitios) {
  const r = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', s.out], {
    env: { ...process.env, PUBLIC_WEBHOOK_URL: s.hook },
    stdio: 'inherit',
  });
  if (r.status) process.exit(r.status);
  createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    try {
      const f = join(process.cwd(), s.out, normalize(p));
      const datos = await readFile(f);
      res.writeHead(200, { 'content-type': tipos[extname(f)] || 'application/octet-stream' });
      res.end(datos);
    } catch {
      res.writeHead(404).end('no encontrado');
    }
  }).listen(s.port).on('error', (e) => { console.error(e); });
}
