# Experimento crisálida (archivado 2026-06-15)

Refactor a CSS modular (BEM `cs-`/`crisalida-`) del sitio, hecho el 11 jun 2026.

**Por qué se archivó:** la decisión LOCKED de JMP es **no rediseñar** el sitio: se conserva
`index.html` + `css/styles.css`. Este experimento era una reescritura desde cero del sistema
de estilos (un rediseño de facto), por lo que queda fuera de alcance.

**Qué se rescató:** el bloque de presentación de la cifra honesta (`cs-stat` con el 90.2%
out-of-sample) se reimplementó en producción dentro de `css/multipagina.css` como `.stat-*`,
respetando la convención de `styles.css`.

No borrar: queda como referencia de dirección visual modular para una eventual migración futura.
