/* Motor de experiencias comerciales — flujo conversacional en loop.
   ① CLARA (agente) conversa con el interesado y le hace preguntas detalladas →
   ② cada respuesta se guarda en las bases de datos (memoria viva) →
   ③ se genera una propuesta personalizada con costos y condiciones, revisada y enviada →
   pie: asesor asignado + cartera viva. Reusa el lenguaje glassy del sitio.
   Nombres de empresa ilustrativos e inventados; sin datos reales de cliente. */
(function () {
  var root = document.querySelector('.cm');
  if (!root) return;

  var AGENT = 'CLARA'; // nombre del agente (placeholder, fácil de cambiar)

  var chat = root.querySelector('#cm-chat'),
      chips = root.querySelector('#cm-chips'),
      brainSub = root.querySelector('#cm-brain-sub'),
      load = root.querySelector('#cm-brain-load'),
      loadFill = root.querySelector('#cm-brain-load-fill'),
      loadTxt = root.querySelector('#cm-brain-load-txt'),
      docFor = root.querySelector('#cm-doc-for'),
      docBody = root.querySelector('#cm-doc-body'),
      foots = Array.prototype.slice.call(root.querySelectorAll('[data-foot]'));

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var SPARK = '&#10038;'; // ✦ marca neutra del agente (sin logo de marca por ahora)

  // Cada escenario: la conversación (turnos agente/cliente), los datos que se
  // guardan en las bases de datos (chips), y la propuesta resultante (filas + costo).
  var SCEN = [
    {
      empresa: 'Frescali',
      turns: [
        { who: 'agent', txt: '¡Hola! Soy ' + AGENT + ', tu asistente comercial. ¿Qué estás buscando resolver?' },
        { who: 'user', txt: 'Quiero un proveedor de alimentos congelados con entrega constante.' },
        { who: 'agent', txt: 'Perfecto. ¿Cuál es tu sitio web para conocer tu marca?' },
        { who: 'user', txt: 'frescali.co' },
        { who: 'agent', txt: '¿En qué sector operas y qué certificaciones manejas?' },
        { who: 'user', txt: 'Alimentos. Tenemos ISO 22000 e ISO 9001.' },
        { who: 'agent', txt: '¿Qué área lo gestiona y qué volumen mensual manejas?' },
        { who: 'user', txt: 'Compras. Unas 1.200 toneladas al mes.' }
      ],
      chips: ['Sitio · frescali.co', 'Sector · Alimentos', 'ISO 22000', 'ISO 9001', 'Área · Compras', 'Volumen · 1.200 ton/mes'],
      doc: [
        { label: 'Lo que necesitas', val: 'Suministro continuo de congelados' },
        { label: 'Servicio a tu medida', val: 'Plan de abasto + ruta dedicada' },
        { label: 'Cumplimiento', val: 'Trazabilidad ISO 22000' },
        { label: 'Inversión', val: 'Desde USD $10.000', cost: true },
        { label: 'Términos y condiciones', val: 'Incluidos · contrato listo' }
      ],
      time: '3 min'
    },
    {
      empresa: 'Vendara',
      turns: [
        { who: 'agent', txt: '¡Hola! Soy ' + AGENT + '. Cuéntame, ¿qué necesitas para tu operación?' },
        { who: 'user', txt: 'Busco una solución de empaque sostenible para retail.' },
        { who: 'agent', txt: 'Genial. ¿Tienes sitio web donde vea tu catálogo?' },
        { who: 'user', txt: 'vendara.co' },
        { who: 'agent', txt: '¿Sector y certificaciones que debamos contemplar?' },
        { who: 'user', txt: 'Retail. Manejamos ISO 14001 ambiental.' },
        { who: 'agent', txt: '¿Qué área decide y cuántos puntos de venta abastece?' },
        { who: 'user', txt: 'Operaciones. Son 48 tiendas en el país.' }
      ],
      chips: ['Sitio · vendara.co', 'Sector · Retail', 'ISO 14001', 'Área · Operaciones', 'Red · 48 tiendas'],
      doc: [
        { label: 'Lo que necesitas', val: 'Empaque sostenible para retail' },
        { label: 'Servicio a tu medida', val: 'Línea ecológica + abasto a 48 tiendas' },
        { label: 'Cumplimiento', val: 'Estándar ISO 14001' },
        { label: 'Inversión', val: 'Desde USD $10.000', cost: true },
        { label: 'Términos y condiciones', val: 'Incluidos · contrato listo' }
      ],
      time: '2 min'
    }
  ];

  function agentTyping() {
    var w = document.createElement('div');
    w.className = 'cm-msg cm-msg--agent';
    w.innerHTML = '<span class="cm-av">' + SPARK + '</span><span class="cm-bub"><span class="cm-typing"><i></i><i></i><i></i></span></span>';
    chat.appendChild(w);
    requestAnimationFrame(function () { w.classList.add('show'); });
    return w;
  }

  function addMsg(t) {
    var w = document.createElement('div');
    w.className = 'cm-msg cm-msg--' + t.who;
    var av = t.who === 'agent' ? SPARK : 'TÚ';
    w.innerHTML = '<span class="cm-av">' + av + '</span><span class="cm-bub">' + t.txt + '</span>';
    chat.appendChild(w);
    requestAnimationFrame(function () { w.classList.add('show'); });
    return w;
  }

  function renderChips(list) {
    chips.innerHTML = list.map(function (c) { return '<span class="cm-chip">' + c + '</span>'; }).join('');
    return Array.prototype.slice.call(chips.querySelectorAll('.cm-chip'));
  }

  function renderDoc(rows) {
    docBody.innerHTML = rows.map(function (r) {
      return '<div class="cm-doc-row"><span class="cm-doc-label">' + r.label + '</span>' +
        '<span class="cm-doc-val' + (r.cost ? ' cost' : '') + '">' + r.val + '</span></div>';
    }).join('') + '<span class="cm-doc-out" id="cm-doc-out"></span>';
    return {
      rows: Array.prototype.slice.call(docBody.querySelectorAll('.cm-doc-row')),
      out: docBody.querySelector('#cm-doc-out')
    };
  }

  function reset() {
    chat.innerHTML = '';
    chips.innerHTML = '';
    docBody.innerHTML = '';
    brainSub.classList.remove('on');
    load.classList.remove('on');
    loadFill.style.width = '0';
    loadTxt.textContent = 'Guardando en bases de datos';
    loadTxt.classList.remove('done');
    foots.forEach(function (f) { f.classList.remove('on'); });
  }

  async function play(s) {
    reset();
    docFor.textContent = s.empresa;
    var chipEls = renderChips(s.chips);
    var doc = renderDoc(s.doc);
    var chipIdx = 0; // los datos del cliente se guardan a medida que responde
    await wait(350);

    // ① Conversación: CLARA pregunta, el cliente responde
    for (var i = 0; i < s.turns.length; i++) {
      var t = s.turns[i];
      if (t.who === 'agent') {
        var typ = agentTyping();
        await wait(900);
        typ.remove();
        addMsg(t);
        await wait(650);
      } else {
        addMsg(t);
        await wait(450);
        // la respuesta viaja a las bases de datos: encender chips + avanzar carga
        if (!load.classList.contains('on')) { brainSub.classList.add('on'); load.classList.add('on'); }
        var lights = i >= s.turns.length - 1 ? (s.chips.length - chipIdx) : 1;
        for (var k = 0; k < lights && chipIdx < chipEls.length; k++) {
          chipEls[chipIdx++].classList.add('on');
          loadFill.style.width = Math.round((chipIdx / chipEls.length) * 100) + '%';
          await wait(220);
        }
        await wait(420);
      }
    }

    // cierre del guardado en bases de datos
    loadFill.style.width = '100%';
    await wait(500);
    loadTxt.textContent = 'Bases de datos actualizadas';
    loadTxt.classList.add('done');
    await wait(550);

    // ③ Propuesta: revela cada fila del documento
    for (var r = 0; r < doc.rows.length; r++) {
      doc.rows[r].classList.add('on');
      await wait(360);
    }
    await wait(300);

    // el documento se genera, se revisa y se envía (automatización de punta a punta)
    doc.out.innerHTML = '<span class="cm-typing"><i></i><i></i><i></i></span> Revisando y enviando';
    doc.out.classList.add('on');
    await wait(1000);
    doc.out.innerHTML = '<b>Documento generado, revisado y enviado</b> · ' + s.time;
    await wait(650);

    // Pie: asesor asignado + cartera viva
    for (var f = 0; f < foots.length; f++) {
      foots[f].classList.add('on');
      await wait(500);
    }
    await wait(3600);
  }

  if (reduce) {
    var s0 = SCEN[0];
    docFor.textContent = s0.empresa;
    s0.turns.forEach(function (t) { addMsg(t); });
    renderChips(s0.chips).forEach(function (c) { c.classList.add('on'); });
    brainSub.classList.add('on');
    load.classList.add('on'); loadFill.style.width = '100%';
    loadTxt.textContent = 'Bases de datos actualizadas'; loadTxt.classList.add('done');
    var d = renderDoc(s0.doc);
    d.rows.forEach(function (row) { row.classList.add('on'); });
    d.out.innerHTML = '<b>Documento generado, revisado y enviado</b> · ' + s0.time;
    d.out.classList.add('on');
    foots.forEach(function (f) { f.classList.add('on'); });
    return;
  }

  (async function loop() {
    var i = 0;
    while (true) { await play(SCEN[i % SCEN.length]); i++; }
  })();
})();
