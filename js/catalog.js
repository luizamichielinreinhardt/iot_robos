(function () {
  var navButtons = document.querySelectorAll('.catalog-nav button');
  var panels = document.querySelectorAll('.robot-panel');

  if (!navButtons.length || !panels.length) return;

  function showRobot(id, updateHash) {
    panels.forEach(function (panel) {
      panel.classList.toggle('active', panel.id === id);
    });
    navButtons.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.target === id);
    });
    if (updateHash) {
      history.replaceState(null, '', '#' + id);
    }
    // leva o usuário para o topo do conteúdo do catálogo ao trocar de robô
    var shell = document.querySelector('.catalog-shell');
    if (shell) {
      window.scrollTo({ top: shell.offsetTop - 90, behavior: 'smooth' });
    }
  }

  navButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      showRobot(btn.dataset.target, true);
    });
  });

  var validIds = Array.prototype.map.call(panels, function (p) { return p.id; });

  // qualquer link da página (ex.: cartões de prévia no topo) que aponte para
  // #cartesiano, #scara etc. deve abrir a aba correspondente no catálogo,
  // já que agora tudo vive na mesma página.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var targetId = link.getAttribute('href').substring(1);
    if (validIds.indexOf(targetId) !== -1) {
      link.addEventListener('click', function (evt) {
        evt.preventDefault();
        showRobot(targetId, true);
      });
    }
  });

  // respeita o hash da URL ao carregar (link direto para um robô) e também
  // quando o hash muda por qualquer outro motivo
  function applyHash() {
    var id = window.location.hash ? window.location.hash.substring(1) : null;
    if (id && validIds.indexOf(id) !== -1) {
      showRobot(id, false);
    }
  }
  window.addEventListener('hashchange', applyHash);
  applyHash();
})();
