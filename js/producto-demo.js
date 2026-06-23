/* Producto en acción — selector de escenarios con auto-rotación.
   Activa botón .pd-scn, panel .pd-panel y dot .pd-dot por índice (data-pd). */
(function () {
  var root = document.querySelector('.pd-section');
  if (!root) return;
  var scns = Array.prototype.slice.call(root.querySelectorAll('.pd-scn'));
  var panels = Array.prototype.slice.call(root.querySelectorAll('.pd-panel'));
  var dots = Array.prototype.slice.call(root.querySelectorAll('.pd-dot'));
  if (!scns.length || !panels.length) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur = 0, timer = null, DELAY = 5200;

  function show(i) {
    cur = i;
    scns.forEach(function (el, k) { el.classList.toggle('is-active', k === i); el.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    panels.forEach(function (el, k) { el.classList.toggle('is-active', k === i); });
    dots.forEach(function (el, k) { el.classList.toggle('is-active', k === i); });
  }
  function next() { show((cur + 1) % panels.length); }
  function start() { if (reduce || timer) return; timer = setInterval(next, DELAY); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function pick(i) { stop(); show(i); start(); }

  scns.forEach(function (el, i) { el.addEventListener('click', function () { pick(i); }); });
  dots.forEach(function (el, i) { el.addEventListener('click', function () { pick(i); }); });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  show(0);
  start();
})();
