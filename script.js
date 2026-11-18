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

// Animations d'apparition au scroll (désactivées si l'utilisateur préfère moins de mouvement)
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('anim');

  var groups = [
    ['.label', 'rv-line'],
    ['.big, .mid, .script', 'rv-title'],
    ['.intro__lead, .split__text .prose, .intro__side, .poster__info, .cat__meta, .facts, .credits > div, .links li, .contact__info p, .profile > div', 'rv-up'],
    ['.card, .shot, .split__img', 'rv-img']
  ];
  var els = [];
  groups.forEach(function (g) {
    document.querySelectorAll(g[0]).forEach(function (el) { el.classList.add('rv', g[1]); els.push(el); });
  });
  // léger décalage entre éléments voisins (cartes d'une grille, colonnes de crédits…)
  document.querySelectorAll('.grid, .credits, .links, .contact__info, .profile, .gallery').forEach(function (parent) {
    [].forEach.call(parent.children, function (c, i) { c.style.transitionDelay = Math.min(i, 6) * 70 + 'ms'; });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });
})();
