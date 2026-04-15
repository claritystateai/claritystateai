/* ============================================
   CLARITY STATE AI — main.js
   Vanilla JS, sin dependencias externas
   ============================================ */

/* ---- Dark / Light mode toggle ---- */
const htmlEl = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('csa-theme', theme);
  if (themeLabel) {
    themeLabel.textContent = theme === 'light' ? 'Modo oscuro' : 'Modo claro';
  }
}

// Cargar preferencia guardada o del sistema
const saved = localStorage.getItem('csa-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (prefersDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});

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

/* ---- Formulario de captura + Systeme.io webhook ---- */
const captureForm = document.getElementById('capture-form');
captureForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Datos del formulario
  const name = document.getElementById('field-name').value;
  const email = document.getElementById('field-email').value;
  const whatsapp = document.getElementById('field-whatsapp').value;
  const blocker = document.getElementById('field-blocker').value;
  const btn = captureForm.querySelector('button[type="submit"]');

  // Validar
  if (!name || !email) {
    alert('Por favor completa nombre y email');
    return;
  }

  // Mostrar loading
  const originalText = btn.textContent;
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  try {
    // Enviar a Systeme.io webhook
    // La URL será reemplazada en Sesión #2 cuando configures Systeme.io
    const webhookUrl = 'https://hook.systeme.io/api/contacts'; // URL temporal

    const payload = {
      first_name: name,
      email: email,
      phone: whatsapp,
      tags: [blocker, 'clarity-state-ai'],
      custom_fields: {
        blocker: blocker
      }
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      btn.textContent = '✅ ¡Enviado! Revisa tu email en 5 minutos.';
      btn.style.background = '#25D366';
      // Limpiar form y cerrar modal
      captureForm.reset();
      setTimeout(() => closeModal(), 2500);
    } else {
      throw new Error('Error en envío');
    }
  } catch (error) {
    console.error('Error:', error);
    btn.textContent = '❌ Error. Intenta de nuevo.';
    btn.disabled = false;
    btn.style.background = '#EF4444';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 3000);
  }
});
