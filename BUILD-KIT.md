# BUILD-KIT — contrato para construir páginas del sitio Clarity State

> Todas las páginas nuevas DEBEN seguir este contrato para verse y comportarse
> igual que `index.html` (la referencia canónica). Construir sobre `css/styles.css`
> + `css/multipagina.css`. NO crear CSS nuevo por página (si falta un componente,
> reportarlo, no inventarlo).

## Reglas de copy (DURAS)
- Español latinoamericano neutro (tú). Nunca voseo ni rioplatense.
- Registro ejecutivo: answer-first, concreto, sin humo ("cerebro operativo" como
  muletilla, "empodera", "sinergia", "potenciar").
- **PROHIBIDO el guion largo (—) en el copy de cara al cliente.** Usar dos puntos,
  punto, o paréntesis.
- **PROHIBIDAS las comparativas "no es X sino Y" / "no X, sino Y".**
- CTA única dominante = WhatsApp (botón primario). Calendly = enlace de texto secundario.

## Compliance (DURO)
- NUNCA nombrar clientes sin permiso: Flores de la Plazoleta, Medical Care Well,
  El Solar, 27 Risk Lab quedan ANÓNIMOS. Caso público = "exportador agroindustrial
  B2B anónimo de ~40 años" + 90,2% con frontera declarada.
- NUNCA: flores/tallos/Alstroemeria, nombres de personas (Mario, Joli, Pablo, JPP),
  inversión, cap-table, valoración, proyecciones. (Lista negra: AUDITORIA-SITIO §4.)
- La excepción: la página /riesgo puede mencionar la **alianza de marca con
  27 Risk Lab** (solo el nombre de la alianza, nunca estructura ni prospectos).

## URLs fijas (copiar literal)
- WhatsApp: `https://wa.me/573134925711?text=Hola%20Juan%20Manuel%2C%20vi%20la%20web%20de%20Clarity%20State%20y%20me%20gustar%C3%ADa%20agendar%20un%20diagn%C3%B3stico%20de%2030%20minutos.`
- Calendly: `https://calendly.com/juanmanuelplazas-claritystateai/30min`
- En cada CTA agregar `data-loc="<seccion>"` para los eventos GA4.

## Estructura de archivo (cada página)
1. `<head>` idéntico al de index.html (Clarity + GA4 scripts, fonts, favicon),
   ajustando `<title>`, `<meta name=description>`, og:title/description/url.
   Cargar `css/styles.css` y luego `css/multipagina.css`.
2. NAVBAR: copiar el bloque `<nav class="navbar">…</nav>` de index.html TAL CUAL
   (incluye dropdown Servicios + `.nav-toggle`). El logo enlaza a `index.html`.
3. HERO de página interior: usar `<section class="page-hero">` con
   `.eyebrow`, `.page-hero-title`, `.page-hero-lede`, y un `.hero-buttons` con la
   CTA (botón WhatsApp `btn btn-primary btn-lg` + Calendly `btn-text`).
4. Secciones de contenido: `<section class="section">` y `<section class="section section-light">`
   ALTERNADAS (oscuro/claro). Usar `.eyebrow` + `.section-headline` por sección.
5. CTA final: `<section class="section section-cta">` con `.eyebrow`, `.section-headline`,
   `.cta-lead`, `.cta-buttons` (botón `btn btn-primary btn-xl` + Calendly `btn-text`).
6. FOOTER: copiar el `<footer class="footer">…</footer>` de index.html TAL CUAL.
7. Widget WhatsApp flotante: copiar el `<a class="whatsapp-floating">…</a>` de index.html.
8. Scripts al final: `<script src="js/main.js"></script>` y
   `<script src="js/main-multipagina.js"></script>`.

## Catálogo de componentes disponibles (clases reales)
- Botones: `.btn .btn-primary`, `.btn-lg`, `.btn-xl`, `.btn-outline`, `.btn-text` (enlace secundario).
- Texto: `.eyebrow`, `.section-headline`, `.section-lead`, `.cta-lead`.
- Hero interior: `.page-hero`, `.page-hero-title`, `.page-hero-lede`.
- Tarjetas marco: `.pilares-grid` (+ `.pilares-grid--3` para 3 columnas), `.pilar-card`
  (puede ser `<a>`), `.pilar-title`, `.pilar-desc`, `.prueba-tag`.
- Preguntas: `.preguntas-grid`, `.pregunta-card`, `.pregunta-mark` (usar "▸").
- Fases 90 días: `.metodologia-fases`, `.fase-card`, `.fase-num`, `.fase-title`.
- Cifra/prueba: `.stat`, `.stat-num`, `.stat-label`, `.stat-source`.
- Cita: `.pull-quote .pull-quote--testimonio` con `<cite>`.
- Entregables (qué incluye): `<ul class="includes-list"><li>…</li></ul>` (palomita automática).
- Confianza: `.trust-grid`, `.trust-card` (con `.trust-tag`, `<h3>`, `<p>`).
- FAQ: `.faq-list` > `.faq-item` > `.faq-question` + `.faq-answer` (ambas visibles, sin JS).
- Formulario: `.contact-form`, `.form-row`, `.form-label`, `.form-input`, `.form-textarea`, `.form-hint`.

## Verificación antes de entregar
- [ ] Cero guiones largos (—) en el texto visible.
- [ ] Cero "no es X sino Y".
- [ ] Cero nombres de clientes/personas.
- [ ] navbar y footer idénticos a index.html (enlaces .html correctos).
- [ ] CTA WhatsApp con la URL exacta + `data-loc`.
- [ ] Carga styles.css + multipagina.css + main.js + main-multipagina.js.
- [ ] Solo clases del catálogo (sin CSS inventado).
