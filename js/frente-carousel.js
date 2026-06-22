/* ============================================================
   Carruseles de los tres frentes — mini-demo en loop (crossfade)
   Cada carrusel se maneja por separado con su propio timer.
   - Auto-avance cada ~3.8s
   - Pausa al hacer hover
   - Clic en un dot salta a ese slide
   - Respeta prefers-reduced-motion (sin auto-avance)
   ============================================================ */
(function () {
  'use strict';

  var INTERVAL = 3800;
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var carousels = document.querySelectorAll('#tres-frentes .fm-carousel');

  carousels.forEach(function (carousel) {
    var slides = carousel.querySelectorAll('.fm-slide');
    var dots = carousel.querySelectorAll('.fm-dot-btn');
    if (slides.length < 2) return;

    var index = 0;
    var timer = null;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) {
        s.classList.toggle('is-active', n === index);
      });
      dots.forEach(function (d, n) {
        d.classList.toggle('is-active', n === index);
      });
    }

    function next() {
      show(index + 1);
    }

    function start() {
      if (reduce || timer) return;
      timer = window.setInterval(next, INTERVAL);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    // Clic en dot: salta y reinicia el timer
    dots.forEach(function (dot, n) {
      dot.addEventListener('click', function () {
        show(n);
        stop();
        start();
      });
    });

    // Pausa al pasar el mouse
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);

    start();
  });
})();
