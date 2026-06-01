/* ============================================================
   i18n.js — Internacionalización (ES / EN)
   ============================================================
   Gestiona el cambio de idioma entre español e inglés sin
   recargar la página. Funciona leyendo el atributo data-i18n
   de cada elemento del HTML y sustituyendo su textContent
   con la traducción correspondiente del diccionario.

   Flujo:
     1. Al cargar, detecta idioma guardado o idioma del navegador.
     2. Aplica las traducciones a todos los elementos marcados.
     3. Los botones ES/EN del nav disparan el cambio en tiempo real.
     4. Actualiza el atributo lang del <html> para accesibilidad.
   ============================================================ */


/* ── Diccionario de traducciones ─────────────────────────── */
/*
  Cada clave corresponde a un data-i18n="clave" en el HTML.
  Añade o modifica entradas aquí para actualizar los textos.
  Los valores deben ser strings planos (sin HTML).
*/
const translations = {

  es: {
    /* Navegación */
    skip_link:          'Saltar al contenido principal',
    nav_about:          'Sobre mí',
    nav_skills:         'Habilidades',
    nav_projects:       'Proyectos',
    nav_experience:     'Experiencia',
    nav_contact:        'Contacto',

    /* Hero */
    hero_badge:         'Disponible para nuevas oportunidades',
    hero_description:   'Desarrollador backend con especialización en IA y Big Data. Construyo soluciones que conectan datos complejos con impacto real.',
    hero_cta_projects:  'Ver proyectos',
    hero_cta_contact:   'Contactar',

    /* Sobre mí */
    section_label_about: '01 · Sobre mí',
    about_title:        'Quién soy',
    about_lead:         'Desarrollador backend con formación en DAM y especialización en IA y Big Data, apasionado por construir sistemas que procesan información de forma inteligente y generan valor real.',
    about_body:         'Mi trabajo combina el rigor del desarrollo backend con la curiosidad por los modelos de lenguaje, la visión artificial y el análisis de datos a gran escala. Busco mi primera oportunidad profesional en un equipo donde seguir creciendo y aportar desde el primer día.',
    about_location:     'Ubicación',
    about_location_val: 'España',
    about_edu:          'Formación',
    about_edu_val:      'DAM (2025) · Especialización IA & Big Data (2026)',
    about_lang:         'Idiomas',
    about_lang_val:     'Español (nativo) · Inglés (B2)',
    cv_es:              'Descargar CV (ES)',
    cv_en:              'Descargar CV (EN)',

    /* Habilidades */
    section_label_skills: '02 · Habilidades',
    skills_title:       'Stack técnico',
    skills_cat_languages: 'Lenguajes',
    skills_cat_backend: 'Backend & Frameworks',
    skills_cat_ia:      'IA & Big Data',
    skills_cat_tools:   'Herramientas',

    /* Proyectos */
    section_label_projects: '03 · Proyectos',
    projects_title:     'Lo que he construido',
    filter_all:         'Todos',
    filter_ia:          'IA & LLM',
    filter_backend:     'Backend',
    filter_bigdata:     'Big Data',
    proj1_title:        'Sistema RAG sobre Autismo',
    proj1_desc:         'Pipeline de Retrieval-Augmented Generation que permite consultar documentación especializada sobre el espectro autista con lenguaje natural. Desarrollado como herramienta de apoyo informativo.',
    proj2_title:        'Analizador de postura con visión artificial',
    proj2_desc:         'Sistema de análisis de postura en tiempo real o video durante el ejercicio físico, usando visión por computador para detectar y corregir la posición corporal mediante landmarks articulares. Utilizable mediante app web conectada con FastAPI al modelo de visión.',
    proj3_title:        'Proyecto Spring Boot',
    proj3_desc:         'API REST desarrollada con Spring Boot, para la gestión y asignación de tareas a usuarios de la aplicación.',
    view_code:          'Ver código',
    view_demo:          'Ver demo',

    /* Navegación — formación */
    nav_education:      'Formación',

    /* Experiencia */
    section_label_exp:  '04 · Experiencia',
    exp_title:          'Experiencia laboral',
    exp1_date:          'Abr 2025 — Jun 2025',
    exp1_type:          'Prácticas',
    exp1_title:         'Desarrollador de aplicación móvil',
    exp1_company:       'IES Rafael Alberti',
    exp1_desc:          'Desarrollo de una aplicación móvil para la gestión de horas y tareas de empleados, utilizando Kotlin Multiplatform para crear una app nativa tanto en Android como iOS y base de datos alojada en Supabase. Participación en todas las fases del proyecto: diseño, desarrollo y pruebas.',

    /* Formación */
    section_label_edu:  '05 · Formación',
    edu_title:          'Formación',
    edu1_date:          '2023 — 2025',
    edu1_type:          'Formación profesional',
    edu1_title:         'Técnico Superior en DAM',
    edu1_center:        'IES Rafael Alberti, España',

    edu2_date:          '2025 - 2026',
    edu2_type:          'Especialización',
    edu2_title:         'Especialización en IA y Big Data',
    edu2_center:        'IES Fernando Aguilar, España',

    /* Contacto */
    section_label_contact: '06 · Contacto',
    contact_title:      'Hablemos',
    contact_intro:      '¿Tienes una oportunidad, un proyecto o simplemente quieres charlar sobre tecnología? Mi bandeja de entrada está abierta.',

    /* Footer */
    footer_built:       'Construido con',
    footer_by:          'por Daniel Marin Pacheco ·',
    footer_top:         'Volver arriba',
  },


  en: {
    /* Navigation */
    skip_link:          'Skip to main content',
    nav_about:          'About',
    nav_skills:         'Skills',
    nav_projects:       'Projects',
    nav_experience:     'Experience',
    nav_contact:        'Contact',

    /* Hero */
    hero_badge:         'Open to new opportunities',
    hero_description:   'Backend developer specialising in AI and Big Data. I build solutions that turn complex data into real-world impact.',
    hero_cta_projects:  'See projects',
    hero_cta_contact:   'Get in touch',

    /* About */
    section_label_about: '01 · About me',
    about_title:        'Who I am',
    about_lead:         'Backend developer with a DAM degree and specialisation in AI and Big Data, passionate about building intelligent systems that process information and generate real value.',
    about_body:         'My work blends backend rigour with curiosity for language models, computer vision, and large-scale data analysis. I\'m looking for my first professional opportunity in a team where I can keep growing and contribute from day one.',
    about_location:     'Location',
    about_location_val: 'Spain',
    about_edu:          'Education',
    about_edu_val:      'DAM (2025) · AI & Big Data specialisation (2026)',
    about_lang:         'Languages',
    about_lang_val:     'Spanish (native) · English (B2)',
    cv_es:              'Download CV (ES)',
    cv_en:              'Download CV (EN)',

    /* Skills */
    section_label_skills: '02 · Skills',
    skills_title:       'Tech stack',
    skills_cat_languages: 'Languages',
    skills_cat_backend: 'Backend & Frameworks',
    skills_cat_ia:      'AI & Big Data',
    skills_cat_tools:   'Tools',

    /* Projects */
    section_label_projects: '03 · Projects',
    projects_title:     'What I\'ve built',
    filter_all:         'All',
    filter_ia:          'AI & LLM',
    filter_backend:     'Backend',
    filter_bigdata:     'Big Data',
    proj1_title:        'RAG System on Autism',
    proj1_desc:         'Retrieval-Augmented Generation pipeline that allows natural language queries on specialised autism spectrum documentation. Built as an informational support tool.',
    proj2_title:        'Exercise posture analyser',
    proj2_desc:         'Real-time or video posture analysis system for physical exercise, using computer vision to detect and correct body position through joint landmarks. Usable via web app connected with FastAPI to the vision model.',
    proj3_title:        'Spring Boot project',
    proj3_desc:         'REST API built with Spring Boot, for task management and assignment to users of the application.',
    view_code:          'View code',
    view_demo:          'Live demo',

    /* Navigation — education */
    nav_education:      'Education',

    /* Experience */
    section_label_exp:  '04 · Experience',
    exp_title:          'Work experience',
    exp1_date:          'Apr 2025 — Jun 2025',
    exp1_type:          'Internship',
    exp1_title:         'Mobile application developer',
    exp1_company:       'IES Rafael Alberti',
    exp1_desc:          'Development of a mobile application for managing employee hours and tasks, using Kotlin Multiplatform to create a native app for both Android and iOS, with database hosted on Supabase. Involved in all project phases: design, development, and testing.',

    /* Education */
    section_label_edu:  '05 · Education',
    edu_title:          'Education',
    edu1_date:          '2023 — 2025',
    edu1_type:          'Official degree',
    edu1_title:         'Higher National Diploma in Cross-Platform App Development',
    edu1_center:        'IES Rafael Alberti, Spain',

    edu2_date:          '2025 - 2026',
    edu2_type:          'Specialisation',
    edu2_title:         'Specialisation in AI and Big Data',
    edu2_center:        'IES Fernando Aguilar, Spain',

    /* Contact */
    section_label_contact: '06 · Contact',
    contact_title:      'Let\'s talk',
    contact_intro:      'Got an opportunity, a project, or just want to chat about tech? My inbox is open.',

    /* Footer */
    footer_built:       'Built with',
    footer_by:          'by Daniel Marin Pacheco ·',
    footer_top:         'Back to top',
  }
};


/* ── Constantes ──────────────────────────────────────────── */
const LANG_KEY = 'portfolio-lang';   // clave en localStorage


/* ── Funciones principales ───────────────────────────────── */

/**
 * Determina el idioma inicial a aplicar.
 * Prioridad: localStorage → idioma del navegador → español.
 * @returns {'es'|'en'}
 */
function getInitialLang() {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === 'es' || stored === 'en') return stored;

  /*
    navigator.language devuelve el idioma configurado en el
    navegador, ej: "es-ES", "en-US", "en-GB".
    Tomamos solo los dos primeros caracteres para comparar.
  */
  const browserLang = (navigator.language || 'es').slice(0, 2).toLowerCase();
  return browserLang === 'en' ? 'en' : 'es';
}

/**
 * Aplica todas las traducciones del idioma dado al DOM.
 * Recorre todos los elementos con data-i18n y sustituye
 * su textContent con el valor del diccionario.
 * @param {'es'|'en'} lang
 */
function applyLang(lang) {
  const dict = translations[lang];

  /*
    querySelectorAll devuelve todos los elementos que tengan
    el atributo data-i18n, independientemente de su tipo o posición.
  */
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  /*
    Actualizar lang en <html> es fundamental para accesibilidad.
    Los lectores de pantalla usan este atributo para pronunciar
    el contenido correctamente.
  */
  document.documentElement.setAttribute('lang', lang);

  /* Actualizar el estado visual de los botones ES / EN */
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('lang-btn--active', isActive);
    /*
      aria-pressed indica si un botón toggle está activo.
      "true" = activo, "false" = inactivo.
    */
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  /* Guardar preferencia para la próxima visita */
  localStorage.setItem(LANG_KEY, lang);
}

/**
 * Cambia al idioma indicado si es diferente al actual.
 * @param {'es'|'en'} lang
 */
function setLang(lang) {
  if (!translations[lang]) return;
  applyLang(lang);
}


/* ── Inicialización ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Aplicar idioma inicial */
  applyLang(getInitialLang());

  /* Asignar eventos a los botones de idioma */
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
    });
  });
});


/* ── API pública ─────────────────────────────────────────── */
/*
  Exponemos setLang en window para que otros scripts (main.js)
  puedan usarla si necesitan cambiar el idioma programáticamente.
  Ejemplo: window.i18n.setLang('en')
*/
window.i18n = { setLang, getInitialLang };