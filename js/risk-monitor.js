/* Centro de monitoreo de riesgo — secuenciador en loop por 3 situaciones.
   Activa focos del mapa, streamea el feed, sube el índice y dispara el protocolo. */
(function () {
  var root = document.querySelector('.rm');
  if (!root) return;

  var situEl = root.querySelector('#rm-situ'),
      idxFill = root.querySelector('#rm-index-fill'),
      idxVal = root.querySelector('#rm-index-val'),
      feedEl = root.querySelector('#rm-feed'),
      alertEl = root.querySelector('#rm-alert'),
      alertTxt = root.querySelector('#rm-alert-txt'),
      fsteps = Array.prototype.slice.call(root.querySelectorAll('.rm-flow .hca-fstep')),
      output = root.querySelector('#rm-output'),
      maps = Array.prototype.slice.call(root.querySelectorAll('.rm-map-svg')),
      hots = Array.prototype.slice.call(root.querySelectorAll('.rm-hot'));

  function setMap(which) {
    maps.forEach(function (m) { m.classList.toggle('is-active', m.getAttribute('data-map') === which); });
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  var SITU = [
    {
      name: 'Monitoreo electoral', map: 'co', hots: ['bogota', 'medellin', 'cali', 'barranquilla'], index: 62, level: 'Medio-alto',
      feed: [
        { tag: 'electoral', label: 'Electoral', src: 'Prensa', t: 'hace 6m', txt: 'Tensión social tras los resultados electorales.', sev: 'Severidad media' },
        { tag: 'medios', label: 'Medios', src: 'Medios', t: 'hace 3m', txt: 'Cobertura nacional intensa, narrativa polarizada.', sev: 'Reputacional' },
        { tag: 'electoral', label: 'Electoral', src: 'Redes · X', t: 'ahora', txt: 'Convocatoria a movilizaciones en varias ciudades.', sev: 'Severidad media', crit: true }
      ],
      alert: 'Movilizaciones convocadas en 4 ciudades donde operas.',
      output: 'Monitoreo reforzado · comunicación interna lista'
    },
    {
      name: 'Paro / bloqueo sindical', map: 'co', hots: ['corredor', 'bogota'], index: 78, level: 'Alto',
      feed: [
        { tag: 'laboral', label: 'Laboral', src: 'Prensa', t: 'hace 8m', txt: 'Sindicato anuncia paro nacional para el día 25.', sev: 'Severidad alta' },
        { tag: 'laboral', label: 'Laboral', src: 'Redes · X', t: 'ahora', txt: 'Reportan bloqueo en el corredor Bogotá–Medellín.', sev: 'Operación en riesgo', crit: true },
        { tag: 'medios', label: 'Medios', src: 'Medios', t: 'hace 2m', txt: 'Medios cubren la afectación a la cadena de abastecimiento.', sev: 'Reputacional' }
      ],
      alert: 'Bloqueo en tu corredor logístico principal.',
      output: 'Rutas alternas activadas · operación protegida'
    },
    {
      name: 'Catástrofe natural', map: 'co', hots: ['plantaNorte'], index: 84, level: 'Crítico',
      feed: [
        { tag: 'natural', label: 'Natural', src: 'Prensa', t: 'hace 4m', txt: 'Sismo de magnitud 5,8 sentido en la región.', sev: 'Severidad alta' },
        { tag: 'natural', label: 'Natural', src: 'Redes · X', t: 'ahora', txt: 'Reportan incendio forestal cerca de la planta Norte.', sev: 'Continuidad en riesgo', crit: true },
        { tag: 'medios', label: 'Medios', src: 'Medios', t: 'hace 1m', txt: 'Autoridades evalúan evacuaciones preventivas.', sev: 'Reputacional' }
      ],
      alert: 'Evento natural cerca de una instalación crítica.',
      output: 'Continuidad asegurada · respaldo operando'
    },
    {
      name: 'Riesgo regional · multipaís', map: 'latam', hots: ['rBogota', 'rSaopaulo', 'rBaires'], index: 71, level: 'Alto',
      feed: [
        { tag: 'medios', label: 'Regional', src: 'Prensa', t: 'hace 7m', txt: 'Volatilidad cambiaria golpea a proveedores en la región.', sev: 'Severidad media' },
        { tag: 'laboral', label: 'Logística', src: 'Redes · X', t: 'ahora', txt: 'Paro portuario en São Paulo frena despachos de exportación.', sev: 'Operación en riesgo', crit: true },
        { tag: 'electoral', label: 'Social', src: 'Medios', t: 'hace 2m', txt: 'Protestas en Buenos Aires afectan la distribución.', sev: 'Reputacional' }
      ],
      alert: 'Señales simultáneas en tres países donde operas.',
      output: 'Coordinación regional activada · operación protegida'
    }
  ];

  function cardHTML(c) {
    return '<div class="rm-card-top">' +
      '<span class="rm-tag ' + c.tag + '">' + c.label + '</span>' +
      '<span class="rm-card-src">' + c.src + ' · ' + c.t + '</span></div>' +
      '<div class="rm-card-txt">' + c.txt + '</div>' +
      '<span class="rm-card-sev">' + c.sev + '</span>';
  }

  function setHots(list) {
    hots.forEach(function (h) { h.classList.toggle('active', list.indexOf(h.getAttribute('data-hot')) !== -1); });
  }

  async function play(s) {
    // reset
    feedEl.innerHTML = '';
    alertEl.classList.remove('on');
    fsteps.forEach(function (f) { f.classList.remove('is-active', 'is-done'); });
    if (output) output.classList.remove('on');
    setHots([]);
    if (idxFill) idxFill.style.width = '0%';
    await wait(300);

    situEl.textContent = s.name;
    setMap(s.map || 'co');
    setHots(s.hots);
    if (idxFill) idxFill.style.width = s.index + '%';
    if (idxVal) idxVal.textContent = s.level;

    // stream feed
    for (var i = 0; i < s.feed.length; i++) {
      var d = document.createElement('div');
      d.className = 'rm-card' + (s.feed[i].crit ? ' crit' : '');
      d.innerHTML = cardHTML(s.feed[i]);
      feedEl.appendChild(d);
      requestAnimationFrame(function (el) { return function () { el.classList.add('show'); }; }(d));
      await wait(900);
    }
    await wait(450);

    // escalamiento
    alertTxt.innerHTML = '<b>Señal crítica:</b> ' + s.alert;
    alertEl.classList.add('on');
    await wait(900);

    // protocolo
    for (var k = 0; k < fsteps.length; k++) {
      fsteps[k].classList.add('is-active'); await wait(760);
      fsteps[k].classList.remove('is-active'); fsteps[k].classList.add('is-done'); await wait(190);
    }
    await wait(350);
    if (output) { output.innerHTML = '<b>Plan activado</b> · ' + s.output.replace(/^[^·]*·\s*/, ''); output.classList.add('on'); }
    await wait(3200);
  }

  if (reduce) {
    // estado compuesto de la situación 1
    var s0 = SITU[0];
    situEl.textContent = s0.name; setMap(s0.map || 'co'); setHots(s0.hots);
    if (idxFill) idxFill.style.width = s0.index + '%';
    if (idxVal) idxVal.textContent = s0.level;
    s0.feed.forEach(function (c) { var d = document.createElement('div'); d.className = 'rm-card show' + (c.crit ? ' crit' : ''); d.innerHTML = cardHTML(c); feedEl.appendChild(d); });
    alertTxt.innerHTML = '<b>Señal crítica:</b> ' + s0.alert; alertEl.classList.add('on');
    fsteps.forEach(function (f) { f.classList.add('is-done'); });
    if (output) { output.innerHTML = '<b>Plan activado</b> · ' + s0.output.replace(/^[^·]*·\s*/, ''); output.classList.add('on'); }
    return;
  }

  var timer = null;
  function stop() { /* no-op marker for visibility pause via flag */ }
  (async function loop() {
    var i = 0;
    while (true) { await play(SITU[i % SITU.length]); i++; }
  })();
})();
