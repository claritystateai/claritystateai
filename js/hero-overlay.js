/* ============================================================
   Hero overlay "memoria viva" — nodos + línea + tarjeta por sector,
   sincronizado al timeline del video de fondo (hero-roughcut.mp4).
   Anclajes definidos por sondeo de imágenes (2026-06-21).
   ============================================================ */
(function(){
  const vid=document.getElementById('hero-vid');
  const canvas=document.getElementById('hero-net');
  const cardEl=document.getElementById('hero-card');
  if(!vid||!canvas||!cardEl) return;
  const ctx=canvas.getContext('2d');
  let W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2);

  const SPK='<svg class="spark" width="286" height="42" viewBox="0 0 286 42" fill="none"><polyline points="0,34 38,32 76,35 116,23 150,26 190,13 226,15 286,4" stroke="#60a5fa" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="286" cy="4" r="3.4" fill="#93c5fd"/></svg>';

  // Beats anclados al sujeto real de cada toma (ventanas del corte de 25.7s)
  const B=[
    {t0:0.2,t1:3.0,  hot:[57,38], pos:[77,40], lbl:'Energía · continuidad', val:'Detecta la falla antes de la parada', det:'monitoreo con IA + protocolo de respuesta, en una memoria viva'},
    {t0:3.5,t1:6.0,  hot:[50,40], pos:[78,64], lbl:'Energía · operación', val:'Por qué cayó la producción, en minutos', det:'la respuesta que hoy toma 15 días de revisar', spark:true},
    {t0:6.5,t1:9.0,  hot:[40,56], pos:[76,40], lbl:'Energía · activos', val:'Desviación detectada en línea', det:'alerta temprana sobre la operación'},
    {t0:9.5,t1:12.0, hot:[52,45], pos:[78,64], lbl:'Energía · predicción', val:'Generación +12% prevista', det:'modelo sobre tu propio histórico', spark:true},
    {t0:12.5,t1:14.4,hot:[42,72], pos:[77,50], lbl:'Floricultura · producción', val:'Proyecta la clasificación de tu producción', det:'90.2% de precisión, validado en un exportador real de flores', spark:true},
    {t0:14.9,t1:17.0,hot:[48,42], pos:[77,62], lbl:'Logística · puerto', val:'Qué contenedor mover primero, con criterio', det:'prioriza por naviera, cliente y ruta, en tiempo real'},
    {t0:19.0,t1:21.2,hot:[38,40], pos:[76,42], lbl:'Industria · operación', val:'Causa raíz del costo, en segundos', det:'lo que antes tomaba días de revisión'},
    {t0:23.3,t1:25.6,hot:[49,56], pos:[74,38], lbl:'Dirección', val:'Devuelve 2 a 4 horas al día a cada director', det:'60 a 80% de las preguntas, resueltas sin pasar por ti'}
  ];
  let cur=-1;

  function resize(){
    const r=canvas.getBoundingClientRect();
    if(r.width<10||r.height<10) return false;
    W=r.width; H=r.height;
    canvas.width=Math.round(W*DPR); canvas.height=Math.round(H*DPR);
    ctx.setTransform(DPR,0,0,DPR,0,0);
    return true;
  }

  function setCard(i){
    const b=B[i];
    cardEl.style.left=b.pos[0]+'%'; cardEl.style.top=b.pos[1]+'%';
    cardEl.innerHTML='<div class="lbl">'+b.lbl+'</div><div class="val">'+b.val+'</div>'+(b.spark?SPK:'')+'<div class="det">'+b.det+'</div>';
  }

  function fade(ct,b){
    const f=0.5;
    if(ct<b.t0||ct>b.t1) return 0;
    return Math.max(0,Math.min(1,(ct-b.t0)/f,(b.t1-ct)/f,1));
  }

  // coordenadas relativas al canvas (el hero no ocupa siempre todo el viewport)
  function rectXY(){ return canvas.getBoundingClientRect(); }

  function draw(b,a){
    const cr=rectXY();
    const hx=b.hot[0]/100*W, hy=b.hot[1]/100*H;
    const r=cardEl.getBoundingClientRect();
    const ax=r.left-cr.left, ay=r.top-cr.top+r.height/2;

    ctx.lineCap='round';
    ctx.strokeStyle='rgba(96,165,250,'+(a*0.20).toFixed(3)+')'; ctx.lineWidth=6; ctx.setLineDash([]);
    ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(ax,ay);ctx.stroke();

    ctx.strokeStyle='rgba(190,222,255,'+(a*0.85).toFixed(3)+')'; ctx.lineWidth=1.4;
    ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(ax,ay);ctx.stroke();

    ctx.strokeStyle='rgba(255,255,255,'+(a*0.9).toFixed(3)+')'; ctx.lineWidth=1.6;
    ctx.setLineDash([2,16]); ctx.lineDashOffset=-(performance.now()*0.06)%18;
    ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(ax,ay);ctx.stroke();
    ctx.setLineDash([]);

    const g=ctx.createRadialGradient(hx,hy,0,hx,hy,26);
    g.addColorStop(0,'rgba(96,165,250,'+(a*0.55).toFixed(3)+')');g.addColorStop(1,'rgba(96,165,250,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(hx,hy,26,0,Math.PI*2);ctx.fill();
    const pr=10+Math.sin(performance.now()*0.004)*1.6;
    ctx.strokeStyle='rgba(190,222,255,'+(a*0.9).toFixed(3)+')';ctx.lineWidth=1.6;
    ctx.beginPath();ctx.arc(hx,hy,pr,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle='rgba(225,238,255,'+a.toFixed(3)+')';
    ctx.beginPath();ctx.arc(hx,hy,4.5,0,Math.PI*2);ctx.fill();
  }

  function loop(){
    const ct=(typeof window.__heroT==='number')?window.__heroT:(vid.currentTime||0);
    let i=-1;
    for(let k=0;k<B.length;k++){ if(ct>=B[k].t0&&ct<=B[k].t1){i=k;break;} }
    if(i!==cur){ cur=i; if(i>=0) setCard(i); }
    ctx.clearRect(0,0,W,H);
    if(cur>=0){
      const a=fade(ct,B[cur]);
      cardEl.style.opacity=a;
      if(a>0.01) draw(B[cur],a);
    } else cardEl.style.opacity=0;
    requestAnimationFrame(loop);
  }

  function init(){
    let tries=0;
    (function ready(){
      if(!resize() && tries++<90){ requestAnimationFrame(ready); return; }
      requestAnimationFrame(loop);
    })();
  }
  window.addEventListener('resize',resize);
  window.addEventListener('load',resize);
  if(document.readyState!=='loading') init(); else window.addEventListener('DOMContentLoaded',init);
})();
