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

  /* 1) Tarjeta del hero móvil sincronizada al video (beats), como en desktop:
        cada momento del video activa su tarjeta, su punto (sobre el sujeto) y su
        línea hacia la tarjeta. Anclajes = los del overlay de desktop. */
  var card = document.getElementById('hero-mcard');
  var pvid = document.getElementById('hero-mvid');
  var dot = document.querySelector('.hero-mpanel .hero-mdot');
  var line = document.querySelector('.hero-mpanel .hero-mline line');
  if (card && pvid) {
    var lbl = card.querySelector('.hero-mcard-lbl');
    var val = card.querySelector('.hero-mcard-val');
    // hot = [x%,y%] del sujeto en el cuadro; ventanas de tiempo del corte de 25,7s.
    var BEATS = [
      { t0: 0.2,  t1: 3.0,  hot: [57, 36], l: 'Energía · continuidad',      v: 'Detecta la falla antes de la parada' },
      { t0: 3.5,  t1: 6.0,  hot: [50, 40], l: 'Energía · operación',        v: 'La causa de la caída, en minutos' },
      { t0: 6.5,  t1: 9.0,  hot: [40, 54], l: 'Energía · activos',          v: 'Desviación detectada en línea' },
      { t0: 9.5,  t1: 12.0, hot: [54, 44], l: 'Energía · predicción',       v: 'Generación +12% prevista' },
      { t0: 12.5, t1: 14.6, hot: [44, 64], l: 'Floricultura · producción',  v: '90,2% de precisión, validado en real' },
      { t0: 14.9, t1: 17.2, hot: [48, 44], l: 'Logística · puerto',         v: 'Qué contenedor mover primero' },
      { t0: 19.0, t1: 21.4, hot: [38, 42], l: 'Industria · operación',      v: 'Causa raíz del costo, en segundos' },
      { t0: 23.0, t1: 25.6, hot: [50, 52], l: 'Dirección',                  v: '2 a 4 horas al día, de vuelta' }
    ];
    var ANCHOR = [50, 83]; // de dónde "nace" la línea en la tarjeta (centro superior)
    var cur = -1;

    function place(i) {
      var b = BEATS[i];
      card.classList.add('is-fading');
      setTimeout(function () {
        lbl.textContent = b.l;
        val.textContent = b.v;
        card.classList.remove('is-fading');
      }, 220);
      if (dot) { dot.style.left = b.hot[0] + '%'; dot.style.top = b.hot[1] + '%'; }
      if (line) {
        line.setAttribute('x1', ANCHOR[0]); line.setAttribute('y1', ANCHOR[1]);
        line.setAttribute('x2', b.hot[0]);  line.setAttribute('y2', b.hot[1]);
      }
    }

    function tick() {
      if (!mqHero.matches) return;
      var ct = pvid.currentTime || 0, i = -1;
      for (var k = 0; k < BEATS.length; k++) {
        if (ct >= BEATS[k].t0 && ct <= BEATS[k].t1) { i = k; break; }
      }
      if (i === -1 || i === cur) return; // en los huecos mantiene la última tarjeta
      cur = i;
      place(i);
    }

    pvid.addEventListener('timeupdate', tick);
    place(0);
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
