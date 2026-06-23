/* Consentimiento de cookies — banner minimalista on-brand.
   Microsoft Clarity (heatmaps + grabación de sesiones) NO se carga hasta que el
   visitante acepta. La decisión se recuerda en localStorage. Autocontenido:
   inyecta sus propios estilos y el banner, sin tocar el resto del sitio. */
(function () {
  var KEY = 'csai-cookie-consent';        // 'granted' | 'denied'
  var CLARITY_ID = 'x0ekhl9ur4';          // Microsoft Clarity
  var PRIVACY_URL = '/privacidad.html';

  function getDecision() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setDecision(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadClarity() {
    if (window.__clarityLoaded) return;
    window.__clarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  function injectStyles() {
    if (document.getElementById('csai-cc-style')) return;
    var css =
      '.csai-cc{position:fixed;left:22px;bottom:22px;z-index:9999;max-width:440px;' +
      'background:rgba(10,13,19,0.94);backdrop-filter:blur(16px) saturate(1.1);' +
      '-webkit-backdrop-filter:blur(16px) saturate(1.1);border:1px solid rgba(147,197,253,0.20);' +
      'border-radius:15px;box-shadow:0 24px 70px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05);' +
      'padding:18px 19px 16px;color:#cfd8e3;opacity:0;transform:translateY(14px);' +
      'transition:opacity .45s ease,transform .45s ease;font-family:"Inter",system-ui,sans-serif;}' +
      '.csai-cc.csai-show{opacity:1;transform:none;}' +
      '.csai-cc-title{display:flex;align-items:center;gap:8px;font-size:0.74rem;letter-spacing:0.1em;' +
      'text-transform:uppercase;color:#93c5fd;font-family:"IBM Plex Mono",monospace;margin-bottom:9px;}' +
      '.csai-cc-title i{width:7px;height:7px;border-radius:50%;background:#3b82f6;flex:0 0 auto;}' +
      '.csai-cc-txt{font-size:0.875rem;line-height:1.5;color:#c4cdd9;margin:0 0 14px;}' +
      '.csai-cc-txt a{color:#7dafff;text-decoration:underline;text-underline-offset:2px;}' +
      '.csai-cc-actions{display:flex;gap:10px;}' +
      '.csai-cc-btn{flex:1;cursor:pointer;border-radius:9px;padding:10px 14px;font-size:0.85rem;' +
      'font-weight:600;font-family:inherit;transition:background .2s ease,border-color .2s ease,transform .1s ease;}' +
      '.csai-cc-btn:active{transform:translateY(1px);}' +
      '.csai-cc-accept{border:1px solid #3b82f6;background:#3b82f6;color:#fff;}' +
      '.csai-cc-accept:hover{background:#2f73e0;border-color:#2f73e0;}' +
      '.csai-cc-reject{border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.03);color:#cfd8e3;}' +
      '.csai-cc-reject:hover{border-color:rgba(255,255,255,0.32);background:rgba(255,255,255,0.06);}' +
      'body.csai-cc-open .whatsapp-floating{transform:translateY(-150px);transition:transform .4s ease;}' +
      '@media (max-width:560px){.csai-cc{left:16px;right:16px;bottom:16px;max-width:none;}' +
      'body.csai-cc-open .whatsapp-floating{transform:translateY(-190px);}}' +
      '@media (prefers-reduced-motion: reduce){.csai-cc{transition:none;}}';
    var st = document.createElement('style');
    st.id = 'csai-cc-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function showBanner() {
    injectStyles();
    var el = document.createElement('div');
    el.className = 'csai-cc';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Aviso de cookies');
    el.innerHTML =
      '<div class="csai-cc-title"><i></i> Cookies</div>' +
      '<p class="csai-cc-txt">Usamos cookies para entender cómo se usa el sitio y mejorar tu experiencia. ' +
      'Puedes aceptarlas o rechazarlas. <a href="' + PRIVACY_URL + '">Aviso de privacidad</a></p>' +
      '<div class="csai-cc-actions">' +
      '<button type="button" class="csai-cc-btn csai-cc-reject">Rechazar</button>' +
      '<button type="button" class="csai-cc-btn csai-cc-accept">Aceptar</button>' +
      '</div>';
    document.body.appendChild(el);
    document.body.classList.add('csai-cc-open');
    requestAnimationFrame(function () { el.classList.add('csai-show'); });

    function close(decision) {
      setDecision(decision);
      el.classList.remove('csai-show');
      document.body.classList.remove('csai-cc-open');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 450);
      if (decision === 'granted') loadClarity();
    }
    el.querySelector('.csai-cc-accept').addEventListener('click', function () { close('granted'); });
    el.querySelector('.csai-cc-reject').addEventListener('click', function () { close('denied'); });
  }

  // Permite re-abrir el banner para cambiar la preferencia (lo usa la página de privacidad).
  window.csaiOpenCookieSettings = function () {
    if (!document.querySelector('.csai-cc')) showBanner();
  };

  function init() {
    var d = getDecision();
    if (d === 'granted') { loadClarity(); return; }   // ya aceptó: cargar sin banner
    if (d === 'denied') { return; }                   // ya rechazó: nada
    showBanner();                                     // sin decisión: preguntar
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
