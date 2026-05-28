/* ============================================================
   darkmode.js — Gestión del tema oscuro / claro
   ============================================================
   Responsabilidad única: alternar el atributo data-theme
   en el <html> entre "dark" y "light", y recordar la
   preferencia del usuario entre visitas.

   Flujo de decisión al cargar la página:
     1. ¿Hay preferencia guardada en localStorage? → úsala.
     2. Si no, ¿el sistema operativo prefiere modo oscuro? → úsalo.
     3. Si tampoco, → modo oscuro por defecto (nuestro default).
   ============================================================ */


/* ── Constantes ──────────────────────────────────────────── */
const STORAGE_KEY  = 'portfolio-theme';   // clave en localStorage
const ATTR         = 'data-theme';        // atributo en <html>
const DARK         = 'dark';
const LIGHT        = 'light';


/* ── Funciones de utilidad ───────────────────────────────── */

/**
 * Devuelve el tema que debe aplicarse al cargar la página.
 * Prioridad: localStorage → preferencia del SO → dark (default).
 * @returns {'dark'|'light'}
 */
function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === DARK || stored === LIGHT) return stored;

  /*
    window.matchMedia es la API del navegador para consultar
    media queries desde JavaScript. Aquí preguntamos si el
    sistema operativo tiene activado el modo oscuro.
  */
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? DARK : LIGHT;
}

/**
 * Aplica el tema al documento y actualiza el botón de toggle.
 * @param {'dark'|'light'} theme
 */
function applyTheme(theme) {
  const root   = document.documentElement;   // el elemento <html>
  const toggle = document.getElementById('themeToggle');

  root.setAttribute(ATTR, theme);

  if (toggle) {
    const isDark = theme === DARK;
    /*
      aria-label describe la ACCIÓN del botón, no su estado actual.
      Si estoy en modo oscuro, el botón sirve para activar el claro,
      así que el label dice "Activar modo claro".
    */
    toggle.setAttribute(
      'aria-label',
      isDark ? 'Activar modo claro' : 'Activar modo oscuro'
    );
    toggle.setAttribute('title', isDark ? 'Modo claro' : 'Modo oscuro');
  }
}

/**
 * Alterna entre dark y light y guarda la preferencia.
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute(ATTR);
  const next    = current === DARK ? LIGHT : DARK;

  applyTheme(next);

  /*
    localStorage persiste entre sesiones. El usuario no tendrá
    que volver a elegir el tema cada vez que visite el portfolio.
    Solo almacenamos un string simple: "dark" o "light".
  */
  localStorage.setItem(STORAGE_KEY, next);
}


/* ── Inicialización ──────────────────────────────────────── */

/*
  Aplicamos el tema ANTES de que el DOM esté completamente
  cargado para evitar el "flash": sin esto, la página cargaría
  primero en el tema por defecto del CSS y luego saltaría al
  preferido, causando un parpadeo visible.

  Como este script está al final del <body>, el <html> ya existe,
  así que podemos actuar sobre él inmediatamente.
*/
applyTheme(getInitialTheme());

/*
  DOMContentLoaded se dispara cuando el HTML está parseado
  pero antes de que carguen imágenes y fuentes. Es el momento
  correcto para añadir event listeners a elementos del DOM.
*/
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('themeToggle');

  if (toggle) {
    toggle.addEventListener('click', toggleTheme);
  }

  /*
    Escuchamos cambios en la preferencia del sistema operativo
    en tiempo real. Si el usuario cambia de modo oscuro a claro
    en su SO mientras tiene el portfolio abierto, y no había
    guardado una preferencia manual, se actualiza automáticamente.
  */
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      const hasManualPref = localStorage.getItem(STORAGE_KEY);
      if (!hasManualPref) {
        applyTheme(e.matches ? DARK : LIGHT);
      }
    });
});