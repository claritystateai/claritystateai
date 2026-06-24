/* ============================================================
   Mejoras móvil del home (2026-06-24):
   1) Tarjeta del hero que rota (crossfade) sobre el panel de video.
   2) Logos "Confían en nosotros": un logo a la vez en móvil.
   3) Evitar descargar el video full-bleed de desktop en celular.
   Todo no-op en desktop (gated por matchMedia).
   ============================================================ */
(function(){
  var mqHero = window.matchMedia('(max-width: 768px)');
  var mqLogos = window.matchMedia('(max-width: 640px)');

  /* 3) No descargar el video pesado de desktop en móvil */
  var hv = document.getElementById('hero-vid');
  if (hv && mqHero.matches) {
    try {
      hv.removeAttribute('autoplay');
      hv.preload = 'none';
      if (hv.pause) hv.pause();
      while (hv.firstChild) hv.removeChild(hv.firstChild);
      if (hv.load) hv.load();
    } catch (e) {}
  }

  /* 1) Tarjeta del hero móvil que rota */
  var card = document.getElementById('hero-mcard');
  if (card) {
    var lbl = card.querySelector('.hero-mcard-lbl');
    var val = card.querySelector('.hero-mcard-val');
    var items = [
      { l: 'Energía · operación',        v: 'La causa de la caída, en minutos' },
      { l: 'Floricultura · producción',  v: '90,2% de precisión, validado en real' },
      { l: 'Logística · puerto',         v: 'Qué contenedor mover primero' },
      { l: 'Dirección',                  v: '2 a 4 horas al día, de vuelta a cada director' }
    ];
    var i = 0;
    setInterval(function(){
      if (!mqHero.matches) return;
      i = (i + 1) % items.length;
      card.classList.add('is-fading');
      setTimeout(function(){
        lbl.textContent = items[i].l;
        val.textContent = items[i].v;
        card.classList.remove('is-fading');
      }, 500);
    }, 2800);
  }

  /* 2) Logos: crossfade de uno a la vez en móvil */
  var logos = document.querySelectorAll('.trust-logos .trust-logo');
  if (logos.length) {
    logos.forEach(function(l, k){ l.classList.toggle('is-on', k === 0); });
    var j = 0;
    setInterval(function(){
      if (!mqLogos.matches) return;
      logos[j].classList.remove('is-on');
      j = (j + 1) % logos.length;
      logos[j].classList.add('is-on');
    }, 2600);
  }
})();
