// Ajuste les grands titres pour qu'ils remplissent exactement la largeur, sur une seule ligne.
(function () {
  var els = document.querySelectorAll('.big');

  function fit() {
    els.forEach(function (el) {
      var style = getComputedStyle(el);
      var available = el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      el.style.fontSize = '100px';
      var range = document.createRange();
      range.selectNodeContents(el);
      var natural = range.getBoundingClientRect().width;
      if (natural > 0) el.style.fontSize = (100 * available / natural) + 'px';
    });
  }

  // Une page s'ouvre toujours en haut, ou exactement sur la section visée (#da, #contact…).
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  function placeScroll() {
    var target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }

  var t;
  window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(fit, 80); });
  fit();
  placeScroll();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { fit(); placeScroll(); });
  window.addEventListener('load', placeScroll);
})();
