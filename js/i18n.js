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
    about_edu:          'Formación',
    about_edu_val:      'DAM · Especialización IA & Big Data (2023)',
    about_lang:         'Idiomas',
    about_lang_val:     'Español (nativo) · Inglés (nivel medio)',
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
    proj2_desc:         'Sistema de análisis de postura en tiempo real durante ejercicio físico, usando visión por computador para detectar y corregir la posición corporal mediante landmarks articulares.',
    proj3_title:        'Proyecto Spring Boot',
    proj3_desc:         'API REST desarrollada con Spring Boot. Descripción pendiente de completar con los detalles del proyecto.',
    view_code:          'Ver código',
    view_demo:          'Ver demo',

    /* Experiencia */
    section_label_exp:  '04 · Experiencia',
    exp_title:          'Trayectoria',
    exp1_date:          '2023 — Presente',
    exp1_type:          'Formación',
    exp1_title:         'DAM · Especialización en IA y Big Data',
    exp1_org:           'Centro de estudios, España',
    exp1_desc:          'Desarrollo de aplicaciones multiplataforma con especialización en inteligencia artificial, modelos de lenguaje, Big Data y arquitecturas backend.',
    exp2_date:          '2024',
    exp2_type:          'Proyecto',
    exp2_title:         'Sistema RAG sobre Autismo',
    exp2_desc:          'Diseño e implementación de un pipeline RAG completo con ingesta de documentos, embeddings y generación con LLM.',
    exp3_date:          '2024',
    exp3_type:          'Proyecto',
    exp3_title:         'Analizador de postura con visión artificial',
    exp3_desc:          'Detección y análisis de postura corporal en tiempo real mediante Computer Vision y modelos de estimación de pose.',

    /* Contacto */
    section_label_contact: '05 · Contacto',
    contact_title:      'Hablemos',
    contact_intro:      '¿Tienes una oportunidad, un proyecto o simplemente quieres charlar sobre tecnología? Mi bandeja de entrada está abierta.',

    /* Footer */
    footer_built:       'Construido con',
    footer_by:          'por Tu Nombre ·',
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
    about_edu:          'Education',
    about_edu_val:      'DAM · AI & Big Data specialisation (2023)',
    about_lang:         'Languages',
    about_lang_val:     'Spanish (native) · English (intermediate)',
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
    proj2_desc:         'Real-time posture analysis system for physical exercise, using computer vision to detect and correct body position through joint landmarks.',
    proj3_title:        'Spring Boot project',
    proj3_desc:         'REST API built with Spring Boot. Description pending completion with full project details.',
    view_code:          'View code',
    view_demo:          'Live demo',

    /* Experience */
    section_label_exp:  '04 · Experience',
    exp_title:          'Journey',
    exp1_date:          '2023 — Present',
    exp1_type:          'Education',
    exp1_title:         'DAM · AI & Big Data specialisation',
    exp1_org:           'School, Spain',
    exp1_desc:          'Cross-platform application development with a focus on artificial intelligence, language models, Big Data, and backend architectures.',
    exp2_date:          '2024',
    exp2_type:          'Project',
    exp2_title:         'RAG System on Autism',
    exp2_desc:          'Design and implementation of a complete RAG pipeline including document ingestion, embeddings, and LLM-based generation.',
    exp3_date:          '2024',
    exp3_type:          'Project',
    exp3_title:         'Exercise posture analyser',
    exp3_desc:          'Real-time body posture detection and analysis using Computer Vision and pose estimation models.',

    /* Contact */
    section_label_contact: '05 · Contact',
    contact_title:      'Let\'s talk',
    contact_intro:      'Got an opportunity, a project, or just want to chat about tech? My inbox is open.',

    /* Footer */
    footer_built:       'Built with',
    footer_by:          'by Your Name ·',
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