# carlos-maldonado578.github.io

Sitio de **Carlos Maldonado** — automatización de procesos para pymes.

Landing de una página, estática (Astro), publicada en
<https://carlos-maldonado578.github.io/> vía GitHub Pages (GitHub Actions).
Más adelante migra a dominio `.cl` propio (solo cambia `site` + `CNAME` + DNS).

## Estado

En construcción. El plan, las decisiones de diseño y las specs viven en el change
**`sitio-web-landing`** (OpenSpec) del repo `auto n8n`.

Decisiones cerradas:

- Nombre propio, sin marca de fantasía. Identificador tipográfico, sin logo.
- Contacto: solo formulario → webhook n8n local (`prodesk`) → Postgres + aviso Telegram y correo.
- Caso de referencia 100% anónimo. Sin foto de Carlos.
- Sin precios en el sitio ("cada proyecto se cotiza aparte").
- Diseño: profesional y sobrio, cercano, **que no parezca hecho con IA**
  (sin degradados, stock, ilustraciones 3D, bullets con emoji, copy de plantilla).

## Desarrollo

_Pendiente: scaffold de Astro + Tailwind con tema propio._

```bash
npm install
npm run dev
```

## Deploy

Push a `main` → GitHub Action construye y publica en Pages. Requiere el scope
`workflow` en la cuenta (ya configurado).
