/* ============================================
   CLARITY STATE AI — main.js
   Vanilla JS, sin dependencias externas
   ============================================ */

/* ---- Navbar scroll effect ---- */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ---- Fade-in con IntersectionObserver ---- */
const fadeEls = document.querySelectorAll('.fade-in');
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

/* ---- Modal de formulario ---- */
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-ebook-title');
const modalSubtitle = document.getElementById('modal-ebook-subtitle');

function openModal(ebookTitle, ebookSubtitle) {
  if (!modalOverlay) return;
  modalTitle.textContent = ebookTitle;
  modalSubtitle.textContent = ebookSubtitle;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Botones de ebook
document.querySelectorAll('[data-ebook]').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = btn.dataset.ebookTitle || 'Descarga tu guía gratis';
    const subtitle = btn.dataset.ebookSubtitle || 'Completa tus datos y recibirás la guía en tu email.';
    openModal(title, subtitle);
  });
});

// Cierre del modal
document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ---- Formulario de captura ---- */
const captureForm = document.getElementById('capture-form');
captureForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: Reemplazar con integración Systeme.io
  // Por ahora muestra mensaje de confirmación
  const btn = captureForm.querySelector('button[type="submit"]');
  btn.textContent = '¡Enviado! Revisa tu email.';
  btn.disabled = true;
  btn.style.background = '#25D366';
  setTimeout(() => closeModal(), 2000);
});
