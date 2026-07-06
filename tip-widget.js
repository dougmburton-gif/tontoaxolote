(function(){
  var TIPS = [
    "Mi Tía Wendy Trae Frutas Sabrosas Siempre — así se recuerdan los días de la semana en inglés, en orden.",
    "\"Embarrassed\" no significa \"embarazada\" — significa apenado o avergonzado. ¡Cuidado con este falso amigo!",
    "Cuando dos vocales caminan juntas en inglés, la primera habla y la segunda queda muda.",
    "Paréntesis, Exponentes, Multiplicación, División, Adición, Sustracción — el orden para resolver una expresión matemática.",
    "Rojo, Anaranjado, Amarillo, Verde, Azul, Índigo, Violeta — los colores del arcoíris, en orden.",
    "Nunca Entres Sin Whisky — Norte, Este, Sur, Oeste, en sentido horario en un mapa.",
    "Treinta días trae noviembre, con abril, junio y septiembre — los demás traen treinta y uno, menos febrero.",
    "El ajolote nunca pierde sus branquias ni sale del agua — a eso se le llama neotenia.",
    "Escribe tu lista de pendientes antes de dormir — ayuda a que tu cerebro suelte el día y descanse mejor."
  ];

  function dayIndex(){
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay) % TIPS.length;
  }

  var todayKey = 'ta_tip_dismissed_' + new Date().toISOString().slice(0,10);
  if (localStorage.getItem(todayKey)) return;

  var bar = document.createElement('div');
  bar.setAttribute('id', 'ta-tip-widget');
  bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;'
    + 'background:rgba(255,253,248,.95);backdrop-filter:blur(6px);border-top:4px solid var(--honey,#f4b942);'
    + 'color:var(--ink,#3a2a1a);font-family:"Comic Sans MS","Trebuchet MS",Verdana,sans-serif;font-size:.82rem;'
    + 'padding:10px 16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;'
    + 'box-shadow:0 -4px 14px rgba(0,0,0,0.15);';

  bar.innerHTML =
    '<span style="font-size:1.3rem;">🦎</span>' +
    '<strong style="color:var(--brown-deep,#4a3220);white-space:nowrap;">Truco del día:</strong>' +
    '<span style="flex:1;min-width:200px;">' + TIPS[dayIndex()] + '</span>' +
    '<a href="trucos-de-memoria.html" style="color:var(--leaf-deep,#5c8a49);text-decoration:none;white-space:nowrap;font-weight:bold;">Ver más trucos →</a>' +
    '<button type="button" aria-label="Cerrar" style="background:none;border:2px solid var(--card-edge,#e8d9b8);color:var(--brown,#6b4a2f);border-radius:6px;padding:3px 9px;cursor:pointer;font-family:inherit;font-size:.78rem;">✕</button>';

  document.body.appendChild(bar);

  bar.querySelector('button').addEventListener('click', function(){
    localStorage.setItem(todayKey, '1');
    bar.remove();
  });
})();
