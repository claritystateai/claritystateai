/* Hero "consola Clarity" — mini-plataforma de 3 modos en loop.
   Consulta (responde) -> Monitoreo (anticipa) -> Automatización (actúa) -> loop. */
(function () {
  var root = document.querySelector('.hca');
  if (!root) return;

  var tabs = Array.prototype.slice.call(root.querySelectorAll('.hca-tab'));
  var modes = Array.prototype.slice.call(root.querySelectorAll('.hca-mode'));
  // Consulta
  var qEl = root.querySelector('#hca-q'), caret = root.querySelector('#hca-caret'),
      think = root.querySelector('#hca-think'), resp = root.querySelector('#hca-resp'),
      aEl = root.querySelector('#hca-a'), viz = root.querySelector('#hca-viz'),
      source = root.querySelector('#hca-source'), srcLabel = root.querySelector('#hca-src-label');
  // Monitoreo
  var kpis = Array.prototype.slice.call(root.querySelectorAll('.hca-kpi'));
  var alertEl = root.querySelector('.hca-alert');
  // Automatización
  var fsteps = Array.prototype.slice.call(root.querySelectorAll('.hca-fstep'));
  var output = root.querySelector('.hca-output');
  if (!qEl) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  var CONSULTA = (window.HCA_CONFIG && window.HCA_CONFIG.consulta) || {
    q: '¿Por qué subió el costo en marzo?',
    a: 'Subió <span class="hl">8%</span>, concentrado en el <b>empaque</b> (Cartón S.A.). Materia prima y mano de obra, estables.',
    bars: [{ cap: 'Materia prima', v: 20 }, { cap: 'Empaque', v: 84, hot: true }, { cap: 'Mano de obra', v: 28 }],
    src: 'Fuente · Informe de costos, marzo'
  };

  function setMode(i) {
    tabs.forEach(function (t, k) { t.classList.toggle('is-active', k === i); });
    modes.forEach(function (m, k) { m.classList.toggle('is-active', k === i); });
  }

  function renderBars(bars) {
    viz.className = 'hca-chart';
    viz.innerHTML = bars.map(function (b) {
      return '<div class="hca-bar-item' + (b.hot ? ' hot' : '') + '"><div class="hca-bar-fill" data-v="' + b.v + '"></div><span class="hca-bar-cap">' + b.cap + '</span></div>';
    }).join('');
    var fills = viz.querySelectorAll('.hca-bar-fill');
    requestAnimationFrame(function () {
      fills.forEach(function (f, i) { setTimeout(function () { f.style.height = f.getAttribute('data-v') + '%'; }, i * 130); });
    });
  }

  async function type(el, text, speed) {
    el.textContent = '';
    for (var i = 0; i < text.length; i++) { el.textContent += text[i]; await wait(speed); }
  }

  async function playConsulta() {
    resp.classList.remove('on'); source.classList.remove('on'); think.classList.remove('on');
    viz.innerHTML = ''; aEl.innerHTML = ''; qEl.textContent = ''; if (caret) caret.style.display = '';
    await wait(350);
    await type(qEl, CONSULTA.q, 36);
    await wait(420); if (caret) caret.style.display = 'none';
    think.classList.add('on'); await wait(780); think.classList.remove('on');
    aEl.innerHTML = CONSULTA.a; resp.classList.add('on'); await wait(320);
    if (CONSULTA.bars) { renderBars(CONSULTA.bars); await wait(1000); } else { viz.innerHTML = ''; await wait(250); }
    srcLabel.textContent = CONSULTA.src; source.classList.add('on');
    await wait(3000);
  }

  async function playMonitoreo() {
    kpis.forEach(function (k) { k.classList.remove('on'); }); alertEl.classList.remove('on');
    await wait(300);
    for (var i = 0; i < kpis.length; i++) { kpis[i].classList.add('on'); await wait(170); }
    await wait(750);
    alertEl.classList.add('on');
    await wait(3100);
  }

  async function playAutomatizacion() {
    fsteps.forEach(function (s) { s.classList.remove('is-active', 'is-done'); });
    output.classList.remove('on');
    await wait(350);
    for (var i = 0; i < fsteps.length; i++) {
      fsteps[i].classList.add('is-active'); await wait(820);
      fsteps[i].classList.remove('is-active'); fsteps[i].classList.add('is-done'); await wait(200);
    }
    await wait(380); output.classList.add('on');
    await wait(2900);
  }

  var plays = [playConsulta, playMonitoreo, playAutomatizacion];

  if (reduce) {
    setMode(0);
    qEl.textContent = CONSULTA.q; if (caret) caret.style.display = 'none';
    aEl.innerHTML = CONSULTA.a; resp.classList.add('on');
    if (CONSULTA.bars) renderBars(CONSULTA.bars); srcLabel.textContent = CONSULTA.src; source.classList.add('on');
    return;
  }

  (async function loop() {
    while (true) {
      for (var i = 0; i < plays.length; i++) { setMode(i); await plays[i](); await wait(450); }
    }
  })();
})();
