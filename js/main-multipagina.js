/* ============================================================
   CLARITY STATE AI — main-multipagina.js
   ADITIVO. Se carga junto a main.js en todas las páginas.
   1) Menú hamburguesa móvil (accesible).
   2) Eventos de conversión GA4 (clic WhatsApp / Calendly).
   2026-06-15 — noche autónoma.
   ============================================================ */

/* ---------- 1) Menú hamburguesa móvil ---------- */
(function mobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.navbar-links');
  if (!toggle || !links) return;

  // Overlay para cerrar tocando fuera
  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  function open() {
    links.classList.add('is-open');
    overlay.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    links.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function toggleMenu() {
    if (links.classList.contains('is-open')) close();
    else open();
  }

  toggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', close);

  // Cerrar al tocar un enlace del menú (navegación)
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('is-open')) close();
  });

  // Si se agranda la ventana, resetear estado
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) close();
  }, { passive: true });
})();

/* ---------- 2) Eventos de conversión GA4 ---------- */
(function conversionEvents() {
  if (typeof window.gtag !== 'function') return;

  function track(canal, el) {
    const ubicacion = el.getAttribute('data-loc') || 'sin-ubicacion';
    // Evento custom legible en GA4 + evento recomendado generate_lead
    window.gtag('event', 'contacto_click', { canal: canal, ubicacion: ubicacion });
    window.gtag('event', 'generate_lead', { method: canal, location: ubicacion });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.includes('wa.me') || href.includes('whatsapp')) track('whatsapp', a);
    else if (href.includes('calendly.com')) track('calendly', a);
  }, { capture: true });
})();
