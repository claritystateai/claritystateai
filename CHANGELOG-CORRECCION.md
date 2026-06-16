# Changelog — Fase de corrección (16 jun 2026)

> Objetivo: dejar el sitio al 100% apto a producción para prospección en frío de JMP,
> al nivel editorial premium de **Aaru / Arkham** y diferenciado de **AztecLab**.
> Todo LOCAL. Sin push, sin deploy (lo aprueba JMP).

## Preview local
- Servidor: `python3 -m http.server 8123` → **http://127.0.0.1:8123/index.html**
- En local navegar con `.html` (las URLs limpias `/operacion` solo aplican en Netlify).
- Relevantes: `/index.html` `/operacion.html` `/riesgo.html` `/cliente.html` `/nosotros.html` `/contacto.html` `/recursos.html`

## Audit (resumen)
Sitio de base sólido (7.5/10): ya en la línea Aaru/Arkham (Fraunces+Inter, navy por capas,
acento cian, particle field, multipágina, una CTA). Gaps = refinamiento tipográfico,
densidad y conversión en frío. No requería rediseño.

## Cambios implementados

### Diseño premium editorial (Aaru / Arkham) — `css/premium.css` (aditivo)
- **Monospace (IBM Plex Mono) para datos y eyebrows**: kickers, tags, números de fase,
  y las cifras (90,2%) en mono tabular. Move característico de Arkham; separa de cualquier
  landing SaaS y de AztecLab.
- **Tipografía display**: tracking negativo (-0.02 a -0.025em) y `text-wrap: balance` en
  titulares; `text-wrap: pretty` en cuerpo. Remate de líneas más editorial.
- **Scroll-reveal sutil**: el contenido de cada sección entra con fade+translate
  (IntersectionObserver). Sin JS queda visible (SEO-safe); respeta `prefers-reduced-motion`.
- **Foco accesible** (`:focus-visible`) en CTAs y navegación.
- Carga: `styles.css` → `multipagina.css` → `premium.css` en las 7 páginas del funnel.

### Conversión para prospección en frío
- **Risk-reversal microcopy** (`.cta-reassure`) bajo cada CTA principal de todas las
  páginas: "Sin costo. Sin compromiso. 30 minutos directo con el fundador."
- **Hero (Home) answer-first**: el subhead ahora lidera con el resultado concreto
  ("Tu equipo decide en segundos lo que hoy toma días...") manteniendo la marca.
- **Productización** en las 3 páginas de producto: duración (~90 días), entregables
  (lista con palomitas) e inversión (desde USD $10.000) claros y escaneables.

### Credibilidad (diferenciada, anonimizada)
- `#confian`: cada caso ahora cierra con un **resultado concreto** (ej. "decisiones de
  15-20 días resueltas en minutos"), no solo descripción.
- `#quien-responde`: se eliminaron los chips de sector redundantes; ahora muestra el
  **método WAT** y el respaldo, enfocando la sección en el fundador.
- `#showcase`: pregunta **deduplicada** (ya no repite la del bloque de preguntas);
  respuesta simulada coherente y anónima.

## Diferenciación vs AztecLab
- Tipografía con personalidad (serif de contraste + mono en datos) frente a su sans plano.
- Oscuro estratificado + un único acento eléctrico, no dark mode plano.
- Cero foto stock; media propia (particle field + showcase glass).
- Una sola CTA dominante, sin botones compitiendo.

## QA ejecutado (todo verde)
- 118/118 clases usadas tienen definición (styles + multipagina + premium).
- Compliance: cero nombres de clientes/personas en contenido (solo Juan Manuel Plazas).
- Copy: cero comparativas "no es X sino Y"; em-dash solo en `<title>`/`<cite>`/meta.
- `<section>` y `<div>` balanceados en las 8 páginas; JS válido (`node --check`).
- Preview: todas las páginas y assets responden HTTP 200.

## Sin cambios (respetado)
- `styles.css` y `multipagina.css` no se reescribieron (capa premium es aditiva).
- `index.anonimizado.html` se dejó como drop-in mínimo de compliance (sin capa premium).

## Pendiente humano (bloqueado)
- Rasterizar `assets/og-image.svg` → PNG 1200×630 antes de desplegar.
- Permisos por escrito de clientes para activar nombres/logos reales.
- Aprobación de despliegue por JMP. Antes de push: `gh auth switch --user juanmplazasg-lgtm`.

---

# Adenda — Feedback Home 8 AM (16 jun 2026)

Aplicado todo el brief `FEEDBACK-HOME-2026-06-16.md`, en orden de prioridad.

## 1. Bugs de contraste (P0) — RESUELTOS
`premium.css` añade overrides `section-light` para los componentes nuevos que quedaban ilegibles:
- `.stat-*` (la cifra 90,2% sobre fondo claro).
- `.includes-list` ("cómo trabajamos" / "cómo se entrega").
- `.cred-founder` (card del fundador ahora superficie clara con texto oscuro) y `.cred-trust-block`.
- Formulario: `.form-label`, `.form-input`, `.form-textarea` legibles sobre fondo claro.

## 2. Hero + botones
- Quitado el kicker del hero (texto largo); reubicado y reescrito en "Punto de partida".
- Hero reenfocado a velocidad (título y subtítulo se mantienen).
- Botones: solo "Iniciar diagnóstico de 30 minutos" (primario) + "Contáctanos" (ancla a #contacto-form).
- Quitado el microcopy "sin costo, sin compromiso..." (`.cta-reassure`) en todo el sitio.

## 3. Formulario (crítico)
- Formulario con campos claros y etiquetados (nombre, empresa, correo, WhatsApp, mensaje) **también en el Home** (última sección, #contacto-form).
- En contacto.html la sección del formulario recibió `id="form"`.

## 4. Cerebro en acción + nombres de producto
- "El cerebro en acción" convertido en **carrusel de 3 ejecuciones** (Operación / Riesgo / Gestión comercial), mostrando que el cerebro habilita la decisión. Se fusionó con el antiguo "showcase" (se quitó la etiqueta "producto en acción").
- Nombres de producto por frente (estilo Aaru): **Núcleo** (operación), **Continuidad** (riesgo, con 27 Risk Lab), **Cartera** (gestión comercial). Aplicados en marco, nav, footer y eyebrows de las páginas de producto. (Propuestos; reversibles si JMP prefiere otros.)
- "Punto de partida": cifras 82%/6% sin atribución de fuente, reescrito a velocidad.
- "La prueba": headline reescrito sin tono informal ni comparativo.

## 5. Alianza 27 Risk Lab + equipo
- Nueva sección "Alianza" (#alianza) con 27 Risk Lab para continuidad/crisis y monitoreo del entorno. Placeholder para el logo oficial de 27RL (pendiente de asset).
- "Quién responde": **eliminado WAT** (no es metodología propia) en todo el sitio, reemplazado por método de entrega propio (diagnóstico, diseño, implementación, medición). Lenguaje de EQUIPO, no de fundador solo.

## 6. Otros
- "Recursos" retirado del nav (queda en el footer). 
- Ecuación de valor en "Cómo se entrega" (qué entrega · tiempo · inversión desde USD $10.000).

## QA (verde)
0 clases sin definición en las 7 páginas · cero comparativos · em-dash solo en title/cite/meta · cero WAT · Recursos fuera del nav · balance OK · enlaces internos resuelven · preview HTTP 200.

## Pendiente (no bloqueante / humano)
- Logo oficial de 27 Risk Lab para la sección de alianza (`assets/img/27risklab-logo.svg`).
- Sistema visual del Hub de JPP (brief #12): no aplicado en esta ventana (requiere el design-system externo); el look premium actual queda serio.
- Validar los nombres de producto (Núcleo / Continuidad / Cartera) con JMP.
- Rasterizar og-image.svg → PNG; aprobación de despliegue por JMP.
