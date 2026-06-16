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

## ✅ Ola 3 — Polish cinematográfico + deuda técnica (sesión noche 2)
- [x] **logo.svg optimizado: 2.26 MB → 187 KB (~92%, 12×).** Los 2 PNG embebidos (4916²) se reescalaron a 1000px y se reincrustaron en el MISMO svg con un decodificador/encoder PNG en Node puro (zlib). Render idéntico (los `<image>` escalan por sus atributos del viewBox). Verificado VISUALMENTE: wordmark cromado intacto. Original recuperable por git. Footer logo con `loading="lazy"`.
- [x] **CSS consolidado: styles.css 3237 → 1507 líneas** (~32 KB). Eliminado CSS muerto del modelo viejo (modal captura, mailing, sectores, magnets, fit/proceso/por-que huérfanos, footer v1, theme-toggle, hero v1). Verificación: 119/119 clases usadas conservan definición, 0 regresiones.
- [x] **Showcase de producto** (`#showcase` en Home): glassmorphism + tarjeta pregunta/respuesta simulada + cifra 90.2%. Clases `.showcase-*` en multipagina.css.
- [x] **Grid de credibilidad ejecutiva** (`#quien-responde` en Home): foto fundador (JMP) + cargo + trusted-by ANONIMIZADO (chips por sector, versión nombrada en comentario). Clases `.cred-*`.
- Nota de diseño: la alternancia oscuro/claro tiene 2 adyacencias suaves inevitables (`cerebro-accion`+`showcase` oscuros; `quien-responde`+`metodologia` claros) porque showcase exige fondo oscuro (glass) y credibilidad/FAQ/confían exigen su fondo por los tokens de sus tarjetas. Es intencional, no un bug.

## Validación de producción (sesión noche 2)
- NO existe build ni type-check: el sitio es estático puro (`publish="."`, sin package.json/tsconfig). "Apto a producción" se validó sobre los artefactos reales:
  - Sintaxis JS OK (`node --check` en main.js y main-multipagina.js).
  - `<div>` y `<section>` balanceados en las 8 páginas.
  - logo.svg y og-image.svg XML bien formados.
  - 119/119 clases CSS usadas tienen definición.
  - Enlaces internos íntegros; compliance limpio.

## ✅ Pulido seguro (sesión noche 3)
- [x] **Limpieza de assets:** borrados 8 JPG/JPEG legacy sin usar (about-team, about-work, foto para landing, Foto de Juan Plazas, Foto de Perfil, Sin título, favicon.jpg, profile-photo.jpg). Sitio servible: 13 MB → 7.8 MB. Conservados los usados (logo.svg, Foto Perfil Juan Plazas_mascerca.jpg) y los SVG vectoriales de marca.
- [x] **URLs limpias en netlify.toml:** rewrites 200 para /operacion · /riesgo · /cliente · /nosotros · /contacto · /recursos (sirven el .html con la barra limpia). Los enlaces internos siguen con .html (sin hop extra). SIN desplegar.
- [x] **QA final de copy (todas las páginas + ebooks):** cero comparativas "no es X sino Y" en todo el sitio; em-dash solo en `<title>`/`<cite>`/comentarios (convención de marca); cero vocabulario-humo. Corregidos 3 encabezados y 1 comparativa en ebooks.
- [x] **og:image del anonimizado** corregido (apuntaba a un PNG inexistente) → ahora `assets/og-image.svg`.

## Pendientes opcionales (no bloqueante)
- Resend: el formulario de contacto está cableado como Netlify Forms (sin backend). Resend requeriría una función serverless.
- Canónico de URLs: si se quiere forzar /operacion.html → /operacion (301), agregar redirects inversos en netlify.toml (hoy ambos funcionan).

## Decisiones de revisión humana sugeridas (cuando JMP retome)
- Revisar el copy de las 3 páginas de producto y validar tono/cifras.
- Decidir si se despliega ya `index.anonimizado.html` como parche de compliance del sitio en vivo, o se espera al nuevo Home multi-página.
- Probar en navegador real: hamburguesa móvil, dropdown Servicios, hero de páginas interiores, formulario de contacto.
