(function () {
  'use strict';
  var KEY = 'dokurapi-lang';

  // Menu "Alat" di ponsel: panel selebar layar berisi direktori alat lengkap (disalin dari footer)
  var tmAll = document.querySelector('.tm-all');
  var dirIn = document.querySelector('.dir-in');
  if (tmAll && dirIn) {
    Array.prototype.forEach.call(dirIn.children, function (sec) { tmAll.appendChild(sec.cloneNode(true)); });
  }

  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-en]'));
  nodes.forEach(function (el) { el.setAttribute('data-id', el.textContent); });

  function setLang(lang) {
    var en = lang === 'en';
    nodes.forEach(function (el) { el.textContent = en ? el.getAttribute('data-en') : el.getAttribute('data-id'); });
    document.documentElement.lang = en ? 'en' : 'id';
    Array.prototype.forEach.call(document.querySelectorAll('.lang-opt'), function (o) {
      o.classList.toggle('on', o.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (e) { /* penyimpanan tidak tersedia */ }
  }

  var saved = 'id';
  try { saved = localStorage.getItem(KEY) || 'id'; } catch (e) { saved = 'id'; }
  setLang(saved === 'en' ? 'en' : 'id');

  function toggleLang() { setLang(document.documentElement.lang === 'en' ? 'id' : 'en'); }
  Array.prototype.forEach.call(document.querySelectorAll('.lang-btn, .bar-lang'), function (b) {
    b.addEventListener('click', toggleLang);
  });

  function bindMenu(btnSel, menuId) {
    var btn = document.querySelector(btnSel);
    var menu = document.getElementById(menuId);
    if (!btn || !menu) return;
    btn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      var open = menu.hasAttribute('hidden');
      closeAll();
      if (open) { menu.removeAttribute('hidden'); btn.setAttribute('aria-expanded', 'true'); }
    });
    menu.addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (ev.target.closest && ev.target.closest('a')) closeAll();
    });
  }
  function closeAll() {
    ['tools-menu', 'm-menu'].forEach(function (id) {
      var m = document.getElementById(id);
      if (m) m.setAttribute('hidden', '');
    });
    Array.prototype.forEach.call(document.querySelectorAll('[aria-expanded]'), function (b) { b.setAttribute('aria-expanded', 'false'); });
  }
  bindMenu('.tools-btn', 'tools-menu');
  bindMenu('.burger', 'm-menu');
  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeAll(); });
})();
