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

### ⏳ Ola 1 — Arreglos técnicos
- [ ] og-image (no hay rasterizador SVG→PNG en el entorno: creo `assets/og-image.svg` + nota de conversión)
- [ ] Hamburguesa móvil
- [ ] Reconectar 3 ebooks (CTA dentro + enlazados desde el sitio)
- [ ] Jerarquizar CTA (WhatsApp primaria sólida, Calendly como enlace de texto)
- [ ] Enlaces muertos del footer
- [ ] Eventos de conversión GA4 (clic WhatsApp / Calendly)

### ⏳ Ola 2 — Multi-página
- [ ] Home (index.html) reconstruida sobre styles.css
- [ ] /operacion /riesgo /cliente /nosotros /contacto

### ⏳ Compliance — index anonimizado
- [ ] `index.anonimizado.html` listo (NO desplegar)

## Pendientes humanos (bloqueados, no los puedo resolver yo)
- [ ] Permisos por escrito: Medical Care Well · Flores de la Plazoleta · 27 Risk Lab (nombre/logo).
- [ ] Decisión de Pablo: atribuir 90.2% a Plazoleta o mantener anónimo.
- [ ] **Rasterizar `assets/og-image.svg` → `og-image.png` 1200×630** antes de desplegar (WhatsApp/LinkedIn/Facebook no renderizan SVG en OG). Opciones: abrir el SVG en navegador y exportar, o `rsvg-convert`/Chrome headless cuando esté disponible.
- [ ] Antes de cualquier push: `gh auth switch --user juanmplazasg-lgtm` (nunca cuenta Solar).
