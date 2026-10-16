# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (sitio estático) en GitHub Pages, user site `carlos-maldonado578.github.io`, sin subpath. CSS propio. Formulario hace POST a un webhook de n8n en Railway (URL en `PUBLIC_WEBHOOK_URL`, inyectada en el build de Pages; el despliegue y la variable se configuran en la Fase 4).

## Users

Dueños y encargados de pymes chilenas (producción, comercio, servicios), a menudo sin perfil técnico, que hoy llevan registros a mano (cuadernos, hojas, WhatsApp). Llegan por referido o búsqueda, deciden si Carlos les sirve y si es de confianza. Leen en celular y escritorio.

## Product Purpose

Carlos Maldonado, proveedor individual de automatización de procesos para pymes con n8n (Telegram, planillas, correo, avisos, boletas/facturas). La web existe para conseguir el 2º y 3º cliente: explicar qué hace en lenguaje llano, mostrar que ya lo hizo y dejar un solo camino claro para contactarlo. Éxito = el visitante entiende en segundos qué hace y escribe por el formulario.

## Positioning

Una persona, no una agencia: mira tu proceso, parte por lo que más duele, lo construye por partes con herramientas estándar y lo deja andando en un servidor en la nube que administra él (mensualidad por servidor y mantención, valor claro desde antes de empezar); los datos siguen siendo del cliente.

## Operating Context

Sin inicio de actividades ni marca; identidad = nombre propio "Carlos Maldonado". Santiago. 5 años como desarrollador backend en sistemas bancarios y fintech (no se nombran empleadores). Responde en 1 día hábil.

Contacto solo por formulario → n8n en Railway → aviso Telegram y correo. Correo de respaldo: carlos.automatiza.tupyme@gmail.com.

Decisiones de infraestructura (Railway):
- n8n con volumen persistente y SQLite para partir (Postgres si crece). `N8N_ENCRYPTION_KEY` fija como variable de entorno.
- Respaldo nocturno de la base y export de workflows en JSON hacia el servidor personal de Carlos.
- Protección del formulario: rate limit + honeypot (`sitio_web`); Cloudflare Turnstile si aparece spam. CORS solo no es protección suficiente.
- Prueba end-to-end del envío real en producción antes de publicar.

El caso real del cliente sigue corriendo en `prodesk` por ahora (hay conversaciones en curso) y NO se migra en este proyecto. El copy de "Cómo trabajo" describe la forma de trabajar de Carlos (lo deja andando en un servidor en la nube); la sección del caso real habla solo de resultados y nunca de dónde corre.

## Capabilities and Constraints

- Una sola página, 7 secciones (ver `copy.md`). Sin precios ("cada proyecto se cotiza aparte"). Sin foto de Carlos. Caso 100% anónimo (sin cliente, lugar ni rubro identificable).
- Sin WhatsApp/teléfono públicos; único canal: formulario (decisión de Carlos: sin WhatsApp por ahora).
- Sin foto de Carlos: el bloque "Quién soy" debe funcionar sin foto.
- Si el webhook falla el formulario muestra el correo de respaldo.
- Sin analítica ni tracking.

## Brand Commitments

Voz: primera persona, chilena, directa, "tú" (no voseo). Prohibidas frases de plantilla ("potencia tu negocio", "soluciones a tu medida"). Debe NO parecer hecho con IA: sin degradados, stock, 3D, íconos genéricos, emoji.

## Evidence on Hand

Copy en `copy.md`. Demo ilustrativa (mensaje Telegram → fila en planilla → aviso), debe rotularse como ejemplo. No hay capturas reales anonimizadas aún, ni testimonios, ni logos de clientes: no fabricar.

## Product Principles

1. Claridad antes que impacto: en 5 segundos se entiende qué hace y cómo contactarlo.
2. Confianza de pyme: serio, cálido, concreto; nada que parezca plantilla o experimento.
3. Mostrar el trabajo, no adjetivos: la demo mensaje→planilla→aviso es la prueba.
4. Un solo camino de contacto, repetido con calma.
5. Honestidad: nada inventado (precios, clientes, cifras).

## Accessibility & Inclusion

Contraste ≥4.5:1, navegable por teclado, legible en celular sin zoom, `prefers-reduced-motion` respetado.
