# Daniel Marin Pacheco — Portfolio

> Portfolio personal de desarrollo backend con especialización en IA y Big Data.
> Disponible en: **[tunombre.github.io](https://tunombre.github.io)**

---

## Sobre este repositorio

Este repositorio contiene el código fuente de mi portfolio personal.
Construido con HTML, CSS y JavaScript puros — sin frameworks, sin dependencias,
sin pasos de compilación.

---

## Proyectos destacados

| Proyecto | Tecnologías | Descripción |
|---|---|---|
| [Sistema RAG sobre Autismo](https://github.com/tunombre/rag-autismo) | Python · LangChain · RAG | Pipeline de Retrieval-Augmented Generation para consultar documentación especializada con lenguaje natural |
| [Analizador de postura](https://github.com/tunombre/posture-analyzer) | Python · OpenCV · MediaPipe | Análisis de postura corporal en tiempo real mediante visión artificial |
| [API Spring Boot](https://github.com/tunombre/spring-boot-api) | Java · Spring Boot · REST | API REST con arquitectura limpia y documentación completa |

---

## Stack del portfolio

```
HTML5 semántico   — estructura y accesibilidad (WCAG 2.1 AA)
CSS3 puro         — variables, grid, animaciones, dark/light mode
JavaScript ES6+   — sin frameworks ni dependencias externas
GitHub Pages      — despliegue automático desde rama main
```

---

## Características

- Modo oscuro / claro con persistencia entre sesiones
- Bilingüe español / inglés sin recarga de página
- Totalmente responsivo (móvil, tablet, escritorio)
- Accesible: skip links, roles ARIA, focus visible, `prefers-reduced-motion`
- SEO: metadatos Open Graph y Twitter Card
- Filtrado de proyectos por categoría

---

## Estructura del proyecto

```
.
├── index.html
├── css/
│   ├── reset.css          # Normalización entre navegadores
│   ├── variables.css      # Design tokens (colores, fuentes, espaciado)
│   ├── base.css           # Estilos globales, nav, footer
│   ├── hero.css
│   ├── about.css
│   ├── skills.css
│   ├── projects.css
│   ├── experience.css
│   └── contact.css
├── js/
│   ├── darkmode.js        # Toggle oscuro/claro
│   ├── i18n.js            # Cambio de idioma ES/EN
│   └── main.js            # Typewriter, filtros, scroll spy
└── assets/
    ├── img/
    │   ├── favicon.svg
    │   └── photo.jpg
    ├── cv-es.pdf
    └── cv-en.pdf
```

---

## Desarrollo local

No hay pasos de instalación. Solo clona y abre:

```bash
git clone https://github.com/tunombre/tunombre.github.io
cd tunombre.github.io

# Opción A — extensión Live Server de VS Code (recomendado)
# Opción B — servidor Python integrado
python3 -m http.server 8080
# Visita http://localhost:8080
```

---

## Licencia

El código de este portfolio está bajo licencia [MIT](LICENSE).
El contenido (textos, imágenes, CV) es de mi propiedad y no puede
reproducirse sin permiso.

---

*Última actualización: 2025*