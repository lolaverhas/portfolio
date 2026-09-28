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

  var t;
  window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(fit, 80); });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
  fit();
})();
