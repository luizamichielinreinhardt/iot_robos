document.addEventListener('DOMContentLoaded', function () {

  /* ---- Menu de navegação responsivo -------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // fecha o menu ao clicar em um link (útil em navegação mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Relógio da barra de status ------------------------------------ */
  var clockEl = document.getElementById('clock');
  if (clockEl) {
    function updateClock() {
      var now = new Date();
      var hh = String(now.getHours()).padStart(2, '0');
      var mm = String(now.getMinutes()).padStart(2, '0');
      var ss = String(now.getSeconds()).padStart(2, '0');
      clockEl.textContent = hh + ':' + mm + ':' + ss;
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ---- Botão "voltar ao topo" ----------------------------------------- */
  var backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 480) {
        backTop.classList.add('show');
      } else {
        backTop.classList.remove('show');
      }
    });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
