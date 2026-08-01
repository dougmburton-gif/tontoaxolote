/* Caballo galopando — a horse & rider gallops across the screen when you hover
   the page header (or the "Razas de Caballos" button). Used on the caballos pages. */
(function () {
  function init() {
    if (document.getElementById('gallop-horse')) return;

    var wrap = document.createElement('div');
    wrap.id = 'gallop-horse';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.cssText =
      'position:fixed;bottom:9vh;right:-340px;z-index:9998;pointer-events:none;opacity:0;will-change:transform;';

    var img = document.createElement('img');
    img.src = 'assets/caballo-jinete.png';
    img.alt = '';
    img.style.cssText = 'display:block;width:220px;max-width:42vw;will-change:transform;';
    wrap.appendChild(img);

    var style = document.createElement('style');
    style.textContent =
      '@keyframes caballoGallop{0%{opacity:0;transform:translateX(0);}6%{opacity:1;}94%{opacity:1;}100%{opacity:0;transform:translateX(-135vw);}}' +
      '@keyframes caballoBob{0%,100%{transform:translateY(0);}50%{transform:translateY(-9px);}}' +
      '#gallop-horse.run{animation:caballoGallop 3.2s linear forwards;}' +
      '#gallop-horse.run img{animation:caballoBob .34s ease-in-out infinite;}' +
      '@media (prefers-reduced-motion:reduce){#gallop-horse{display:none!important;}}';

    document.head.appendChild(style);
    document.body.appendChild(wrap);

    var running = false;
    function gallop() {
      if (running) return;
      running = true;
      wrap.classList.add('run');
    }
    wrap.addEventListener('animationend', function (e) {
      if (e.animationName === 'caballoGallop') {
        wrap.classList.remove('run');
        running = false;
      }
    });

    ['.masthead', '.nav-btn.horses'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) el.addEventListener('mouseenter', gallop);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
