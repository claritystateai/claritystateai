---
context: sitio-web-clarity — modo noche autónoma
fecha: 2026-06-15 (noche) → autorizado por JMP
regla_dura: TODO en LOCAL. NO push NI deploy (un push dispara Netlify). Commits locales OK como checkpoint.
---

# PROGRESO — Noche autónoma sitio Clarity State (15 jun 2026)

Bitácora viva de la sesión nocturna. Cada bloque se cierra con un commit local.

## Reglas que estoy respetando
- **No rediseñar**: construyo sobre `index.html` + `css/styles.css`. NO reescribo `styles.css`; agrego solo `css/multipagina.css` (aditivo).
- **Copy ejecutivo**: answer-first, concreto, sin humo. SIN comparativas "no es X sino Y". SIN guion largo (—) de cara al cliente; uso dos puntos / punto / paréntesis.
- **Compliance**: nada identificable de Plazoleta/MCW/El Solar sin permiso por escrito. Caso público = "exportador agroindustrial B2B anónimo de ~40 años" + 90.2% con frontera declarada. Lista negra completa en `AUDITORIA-SITIO-2026-06-12.md §4`.
- **Multi-página**: enlaces con `.html` explícito (funciona en local y en Netlify).
- **NO push / NO deploy.** Solo commits locales.

## Estado de las olas

### ✅ Paso 0 — Limbo crisálida RESUELTO
- `index-crisalida.html`, `css/crisalida-site.css`, `css/crisalida/` → movidos a `experimental/crisalida-2026-06-11/`.
- Decisión: era un refactor a CSS modular (rediseño) → contra la decisión LOCKED. Se archiva como referencia, no se borra.
- Único activo rescatado para producción: el bloque de cifra (`cs-stat` con el 90.2%) se reimplementa en `css/multipagina.css` como `.stat-*`.

### ✅ Ola 1 — Arreglos técnicos
- [x] og-image → `assets/og-image.svg` creado + meta actualizada. PENDIENTE rasterizar a PNG (humano).
- [x] Hamburguesa móvil → `css/multipagina.css` + `js/main-multipagina.js` (accesible: aria, ESC, overlay).
- [x] Reconectar 3 ebooks → barra de retorno (sticky) + bloque CTA de cierre con WhatsApp, en los 3. Enlazados desde recursos.html.
- [x] Jerarquizar CTA → WhatsApp = botón primario; Calendly = `.btn-text` (enlace de texto).
- [x] Enlaces muertos del footer → reemplazados por Servicios/Sitio reales; compliance movido al copy del footer.
- [x] Eventos de conversión GA4 → `contacto_click` + `generate_lead` con `data-loc` (delegación de clics).

### ✅ Ola 2 — Multi-página
- [x] Home (index.html) reconstruida sobre styles.css (+ multipagina.css). Marco 3 frentes, cifra 90.2% anónima, trust grid, entregables, FAQ, 1 CTA.
- [x] operacion.html · riesgo.html · cliente.html · nosotros.html · contacto.html (subagentes en paralelo, siguiendo BUILD-KIT).
- [x] recursos.html (enlaza los 3 ebooks).
- [x] `BUILD-KIT.md` = contrato compartido de construcción.

### Verificación ejecutada (post-construcción)
- 7 páginas + index.anonimizado bien formadas (html/head/body/html, secciones balanceadas).
- Compliance: cero dominios/nombres de clientes en el contenido visible.
- Cero em-dash (—) en copy persuasivo (solo en `<title>`/`og:title` y `<cite>`, igual que el sitio actual).
- Todas cargan styles.css + multipagina.css + main.js + main-multipagina.js; navbar/footer/dropdown/hamburguesa/WhatsApp flotante presentes.
- Todos los enlaces internos `.html` resuelven a archivos existentes. Ancla "Servicios" en interiores → `index.html#tres-frentes`.
- Formulario de contacto cableado como Netlify Forms (honeypot incluido); nota de Resend como opción futura.

### ✅ Compliance — index anonimizado
- [x] `index.anonimizado.html` listo (drop-in del diseño actual sin clientes). NO desplegado.
- [x] El nuevo Home también nace anonimizado (trust grid sin nombres + bloque nombrado en comentario para activar con permisos).

## Pendientes humanos (bloqueados, no los puedo resolver yo)
- [ ] Permisos por escrito: Medical Care Well · Flores de la Plazoleta · 27 Risk Lab (nombre/logo).
- [ ] Decisión de Pablo: atribuir 90.2% a Plazoleta o mantener anónimo.
- [ ] **Rasterizar `assets/og-image.svg` → `og-image.png` 1200×630** antes de desplegar (WhatsApp/LinkedIn/Facebook no renderizan SVG en OG). Opciones: abrir el SVG en navegador y exportar, o `rsvg-convert`/Chrome headless cuando esté disponible.
- [ ] Antes de cualquier push: `gh auth switch --user juanmplazasg-lgtm` (nunca cuenta Solar).
