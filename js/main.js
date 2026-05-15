/* ============================================
   CLARITY STATE AI — main.js
   Vanilla JS, sin dependencias externas.

   2026-05-15: Webhook del CRM legacy eliminado (modelo viejo,
   descartado en el pivote 2026-05-05). El embudo único del sprint
   es WhatsApp Business (D-14 CONTEXT.md v2 03.1). El modal de
   captura y los handlers de ebook también quedaron fuera porque
   la web v1 del sprint no expone lead magnets.
   ============================================ */

/* ---- Navbar scroll effect ----
   Añade la clase .scrolled al pasar 40px — el CSS la usa para el
   fondo semitransparente con blur del navbar fijo. */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ---- Smooth scroll para anclas internas ----
   Mantiene la navegación del navbar suave hacia las secciones del
   sketch v1 (#manifiesto, #sectores, #prueba-social, #cta-final). */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ---- Fade-in con IntersectionObserver ----
   Conservado del v1. Activa la transición visible cuando un elemento
   con clase .fade-in entra al viewport. No se usa en el HTML actual
   pero queda disponible para no romper futuras secciones. */
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  fadeEls.forEach((el) => observer.observe(el));
}

/* ---- Mailing list — fallback mailto ----
   Mínimo viable para el sprint. JMP puede conectarlo a una herramienta
   real después del checkpoint (mailing tool, CRM, etc.). Por ahora,
   el form abre el cliente de correo con la dirección de contacto
   pre-llenada para que JMP procese la suscripción manualmente. */
const mailingForm = document.getElementById('mailing-form');
if (mailingForm) {
  mailingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = mailingForm.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : '';
    if (!email) {
      emailInput?.focus();
      return;
    }
    const subject = 'Suscripción al brief Clarity';
    const body = `Quiero suscribirme al brief de Clarity State.\n\nMi correo: ${email}`;
    const mailto = `mailto:juanm.plazasg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}
