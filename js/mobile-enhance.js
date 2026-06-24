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

  /* 1) Hero móvil sincronizado al video, fluido como en desktop:
        - cada frame calculamos una opacidad continua (fade) que entra y sale,
        - el punto surge y la línea SE DIBUJA del punto hacia la tarjeta (stroke-dashoffset),
        - en los huecos entre beats no hay nada (igual que desktop). */
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
    var F = 0.5;           // segundos de rampa de entrada/salida (igual que desktop)
    var cur = -1;

    // opacidad 0..1 con rampa suave en los bordes del beat (idéntico a desktop)
    function fade(ct, b) {
      if (ct < b.t0 || ct > b.t1) return 0;
      return Math.max(0, Math.min(1, (ct - b.t0) / F, (b.t1 - ct) / F, 1));
    }
    function easeOut(x) { return 1 - Math.pow(1 - x, 2); }

    function setBeat(i) {
      var b = BEATS[i];
      lbl.textContent = b.l; val.textContent = b.v;
      if (dot) { dot.style.left = b.hot[0] + '%'; dot.style.top = b.hot[1] + '%'; }
      if (line) { // el trazo arranca en el punto (x1,y1) y termina en la tarjeta (x2,y2)
        line.setAttribute('x1', b.hot[0]); line.setAttribute('y1', b.hot[1]);
        line.setAttribute('x2', ANCHOR[0]); line.setAttribute('y2', ANCHOR[1]);
      }
    }

    var raf = 0;
    function loop() {
      raf = requestAnimationFrame(loop);
      if (!mqHero.matches) { if (card.style.opacity !== '0') { card.style.opacity = dot.style.opacity = '0'; line.style.opacity = '0'; } return; }
      var ct = pvid.currentTime || 0, i = -1;
      for (var k = 0; k < BEATS.length; k++) { if (ct >= BEATS[k].t0 && ct <= BEATS[k].t1) { i = k; break; } }
      if (i !== cur) { cur = i; if (i >= 0) setBeat(i); }
      var a = (i >= 0) ? fade(ct, BEATS[i]) : 0;     // opacidad continua
      var draw = easeOut(a);                          // progreso del trazo
      card.style.opacity = a.toFixed(3);
      if (dot) { dot.style.opacity = a.toFixed(3); dot.style.transform = 'translate(-50%,-50%) scale(' + (0.55 + 0.45 * a).toFixed(3) + ')'; }
      if (line) { line.style.opacity = a.toFixed(3); line.style.strokeDashoffset = (100 * (1 - draw)).toFixed(2); }
    }
    raf = requestAnimationFrame(loop);

    // 2) Reanudar el video al volver a la pestaña (iOS lo pausa al ocultar)
    function resume() {
      if (mqHero.matches && pvid.paused) { var p = pvid.play(); if (p && p.catch) p.catch(function(){}); }
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) resume(); });
    window.addEventListener('pageshow', resume);
    window.addEventListener('focus', resume);
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
