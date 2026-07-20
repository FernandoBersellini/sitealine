document.addEventListener('DOMContentLoaded', function () {

  // FAQ accordion — apenas um item aberto por vez
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');

    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
        q.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // menu mobile
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }

  function openMenu() {
    navLinks.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar menu');
  }

  menuToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // animação sutil ao entrar na viewport (títulos de seção e cards)
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = document.querySelectorAll('.section-head, .card, .dif-item');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('reveal', 'is-visible'); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  }

  // linha de agendamento personalizada pelo dia atual
  var hojeEl = document.getElementById('agendamentoHoje');
  if (hojeEl) {
    var DOCTORALIA_URL = 'https://www.doctoralia.com.br/maria-aline-mortati-gibellato-2/medico-de-familia/londrina';
    var AGENDARCONSULTA_URL = 'https://agendarconsulta.com/perfil/dr-maria-aline-mortati-gibellato-1764633313';

    var diasSemana = [
      'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira',
      'quinta-feira', 'sexta-feira', 'sábado'
    ];

    // 0 = domingo ... 6 = sábado
    var plataformaPorDia = {
      1: { nome: 'Doctoralia', url: DOCTORALIA_URL },
      2: { nome: 'agendarconsulta.com', url: AGENDARCONSULTA_URL },
      3: { nome: 'Doctoralia', url: DOCTORALIA_URL },
      4: { nome: 'agendarconsulta.com', url: AGENDARCONSULTA_URL },
      5: { nome: 'Doctoralia', url: DOCTORALIA_URL },
      6: { nome: 'agendarconsulta.com', url: AGENDARCONSULTA_URL }
    };

    var diaAtual = new Date().getDay();
    var nomeDia = diasSemana[diaAtual];

    if (diaAtual === 0) {
      hojeEl.textContent = 'Hoje não há atendimento. Volte amanhã para agendar.';
    } else {
      var plataforma = plataformaPorDia[diaAtual];
      hojeEl.innerHTML = 'Hoje é ' + nomeDia + '. Agende agora pelo(a) ' + plataforma.nome +
        ' <a href="' + plataforma.url + '" target="_blank" rel="noopener">Agendar agora</a>';
    }
  }

});
