/* ============================================================
   main.js — Lógica principal de la página
   ============================================================
   Este archivo orquesta todos los comportamientos interactivos
   que no tienen módulo propio:

     1. Efecto typewriter en el hero
     2. Filtrado de proyectos por categoría
     3. Resaltar el enlace activo en la navegación al scrollear
     4. Clase .nav--scrolled en la barra de navegación
     5. Menú hamburguesa para móvil
     6. Año dinámico en el footer
     7. Animación de entrada de elementos al hacerse visibles

   Todos los módulos se inicializan dentro de DOMContentLoaded
   para garantizar que el DOM está disponible.
   ============================================================ */


document.addEventListener('DOMContentLoaded', () => {

  /* Llamamos a cada módulo en orden */
  initTypewriter();
  initProjectFilters();
  initScrollSpy();
  initNavScroll();
  initHamburger();
  initFooterYear();
  initScrollReveal();

});


/* ════════════════════════════════════════════════════════════
   1. TYPEWRITER
   Efecto de escritura animada en el subtítulo del hero.
   Escribe un string caracter a caracter, lo borra, y pasa
   al siguiente en bucle indefinido.
════════════════════════════════════════════════════════════ */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  /*
    Las frases rotan en bucle. Personaliza este array con los
    roles o cualidades que quieras destacar.
  */
  const phrases = [
    'Backend Developer.',
    'AI & Big Data.',
    'Problem Solver.',
    'Python · Java · Kotlin.',
  ];

  let phraseIndex  = 0;   /* qué frase estamos mostrando */
  let charIndex    = 0;   /* hasta qué caracter hemos escrito */
  let isDeleting   = false;
  let isPaused     = false;

  /* Velocidades en milisegundos */
  const SPEED_TYPE   = 80;    /* velocidad de escritura */
  const SPEED_DELETE = 45;    /* velocidad de borrado (más rápido) */
  const PAUSE_AFTER  = 1800;  /* pausa antes de borrar */
  const PAUSE_EMPTY  = 400;   /* pausa antes de escribir la siguiente */

  function tick() {
    if (isPaused) return;

    const current = phrases[phraseIndex];

    if (!isDeleting) {
      /* Añadir un caracter */
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        /* Llegamos al final → pausar antes de borrar */
        isPaused = true;
        setTimeout(() => {
          isPaused   = false;
          isDeleting = true;
          tick();
        }, PAUSE_AFTER);
        return;
      }
    } else {
      /* Borrar un caracter */
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        /* Texto vacío → cambiar a la siguiente frase */
        isDeleting   = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        isPaused     = true;
        setTimeout(() => {
          isPaused = false;
          tick();
        }, PAUSE_EMPTY);
        return;
      }
    }

    /* Programar el siguiente tick con la velocidad correcta */
    setTimeout(tick, isDeleting ? SPEED_DELETE : SPEED_TYPE);
  }

  /* Arrancar el efecto */
  tick();
}


/* ════════════════════════════════════════════════════════════
   2. FILTRADO DE PROYECTOS
   Los botones de filtro muestran u ocultan tarjetas según
   la categoría seleccionada (data-category en cada <article>).
════════════════════════════════════════════════════════════ */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {

      /* Quitar estado activo de todos los botones */
      filterBtns.forEach((b) => b.classList.remove('filter-btn--active'));
      /* Activar el botón clickado */
      btn.classList.add('filter-btn--active');

      const filter = btn.dataset.filter;   /* 'all', 'ia', 'backend', 'bigdata' */

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const show     = filter === 'all' || category === filter;

        if (show) {
          /*
            Eliminamos la clase primero para resetear cualquier
            estado previo, luego añadimos la de entrada.
            El CSS de projects.css define la transición de opacidad.
          */
          card.classList.remove('project-card--hidden');
          card.classList.add('project-card--visible');
          /* Eliminar display:none con un pequeño delay para que
             la transición CSS tenga tiempo de activarse */
          card.style.display = '';
        } else {
          card.classList.remove('project-card--visible');
          card.classList.add('project-card--hidden');
          /*
            Esperamos a que termine la transición (300ms) antes
            de ocultar con display:none, para que el fade-out
            sea visible antes de que el elemento desaparezca.
          */
          setTimeout(() => {
            if (card.classList.contains('project-card--hidden')) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}


/* ════════════════════════════════════════════════════════════
   3. SCROLL SPY — enlace activo en la navegación
   Detecta qué sección es visible en la pantalla y resalta
   el enlace correspondiente en la barra de navegación.
════════════════════════════════════════════════════════════ */
function initScrollSpy() {
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  /*
    IntersectionObserver es la forma moderna y eficiente de
    detectar si un elemento está en pantalla. Es mucho mejor
    que escuchar el evento scroll y calcular posiciones manualmente,
    ya que no bloquea el hilo principal.

    threshold: 0.3 significa que el callback se dispara cuando
    al menos el 30% de la sección es visible.
    rootMargin: '-64px 0px -40% 0px' descuenta los 64px de la
    barra de navegación fija de la parte superior.
  */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('nav__link--active', isActive);
          });
        }
      });
    },
    {
      threshold:  0.3,
      rootMargin: '-64px 0px -40% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
}


/* ════════════════════════════════════════════════════════════
   4. NAVBAR SCROLL — fondo al bajar
   Añade la clase .nav--scrolled cuando el usuario ha scrolleado
   más de 10px, activando el fondo más opaco definido en el CSS.
════════════════════════════════════════════════════════════ */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  /*
    Usamos requestAnimationFrame para que la comprobación
    de scroll se haga en el momento de repintado del navegador,
    evitando el "thrashing" del layout.
  */
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 10);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  /*
    passive: true le dice al navegador que este listener
    nunca llamará a preventDefault(), lo que le permite
    optimizar el scroll sin esperarlo.
  */
}


/* ════════════════════════════════════════════════════════════
   5. MENÚ HAMBURGUESA
   Abre y cierra el menú de navegación móvil.
   Cierra automáticamente al hacer clic en un enlace.
════════════════════════════════════════════════════════════ */
function initHamburger() {
  const hamburger  = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Cerrar menú');
    mobileMenu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  /* Cerrar al hacer clic en cualquier enlace del menú móvil */
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /*
    Cerrar si el usuario pulsa Escape — buena práctica de
    accesibilidad para menús y modales.
  */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /*
    Cerrar si la pantalla se hace más ancha que 768px mientras
    el menú está abierto (ej: rotar el teléfono).
  */
  window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
    if (e.matches) closeMenu();
  });
}


/* ════════════════════════════════════════════════════════════
   6. AÑO DINÁMICO EN EL FOOTER
   Evita tener que actualizar el copyright manualmente cada año.
════════════════════════════════════════════════════════════ */
function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


/* ════════════════════════════════════════════════════════════
   7. SCROLL REVEAL — animación de entrada
   Los elementos con la clase .reveal aparecen suavemente
   cuando entran en el viewport, en vez de estar visibles
   desde el principio.

   En el CSS de cada sección añadiremos:
     .reveal { opacity: 0; transform: translateY(24px); transition: ... }
     .reveal--visible { opacity: 1; transform: translateY(0); }
════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  /*
    De nuevo usamos IntersectionObserver en lugar de scroll events.
    Una vez que el elemento es visible (threshold: 0.15 = 15%),
    añadimos la clase y dejamos de observarlo para liberar memoria.
  */
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold:  0.15,
      rootMargin: '-40px 0px',
    }
  );

  revealEls.forEach((el) => observer.observe(el));
}