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

  // "Ingreso" (acceso) se oculta en la barra en móvil; lo reponemos DENTRO del menú.
  if (!links.querySelector('.navbar-link--access')) {
    const accessBtn = document.querySelector('.navbar-access');
    const ing = document.createElement('a');
    ing.className = 'navbar-link navbar-link--access';
    ing.href = (accessBtn && accessBtn.getAttribute('href')) || 'acceso.html';
    ing.target = '_blank';
    ing.rel = 'noopener';
    ing.textContent = 'Ingreso';
    links.appendChild(ing);
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

/* ---------- 3) Scroll-reveal sutil ----------
   Añade .cs-rv al contenido de cada sección (salvo el hero, que está arriba del
   pliegue) y revela con IntersectionObserver. El estado oculto vive en premium.css
   bajo <html class="cs-reveal">, que SOLO se activa aquí: sin JS, todo queda visible.
   Respeta prefers-reduced-motion (no se activa el efecto). */
(function scrollReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  const sections = document.querySelectorAll('section.section');
  if (!sections.length) return;

  document.documentElement.classList.add('cs-reveal');

  const targets = [];
  sections.forEach((s) => {
    const c = s.querySelector('.container');
    if (c) { c.classList.add('cs-rv'); targets.push(c); }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach((t) => io.observe(t));

  // Salvaguarda: si algo falla, revelar todo tras 1.2s
  setTimeout(() => targets.forEach((t) => t.classList.add('is-visible')), 1200);
})();
