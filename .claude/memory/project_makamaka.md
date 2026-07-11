---
name: project-makamaka-clone
description: Makamaka Beach Burger Café website clone — rewritten from WordPress/Elementor to clean HTML/CSS/JS
metadata:
  type: project
---

Clon del sitio makamaka.es. Reescrito desde WordPress/Elementor a HTML/CSS/JS puro.

**Why:** El usuario quería eliminar todas las dependencias de WordPress/Elementor y usar HTML, JS y CSS limpio.

**Archivos principales:**
- `index.html` — HTML semántico limpio (sin clases elementor-*)
- `style.css` — Todo el CSS consolidado
- `main.js` — Todo el JS en vanilla (sin jQuery)

**Assets locales (reutilizados):**
- `/wp-content/uploads/2025/05/` — imágenes, fuentes, audio
- `/wp-content/plugins/elementor/assets/lib/swiper/v8/` — Swiper v8 (librería slider)
- `/wp-content/uploads/elementor/google-fonts/css/` — Fuentes Google locales

**Funcionalidades implementadas:**
- Pantalla de bienvenida (welcome screen) — sessionStorage
- Header sticky con oscurecimiento al scroll
- Off-canvas menu con animaciones (menu respira, where rota, otros parpadean)
- Carousel Swiper (9 fotos)
- Hero con cambio de fondo al hover en palabras
- Marquees animados con GSAP
- Cassettes con hover pausado (GSAP)
- Galería polaroid (6 fotos con rotación CSS)
- Efecto lupa/magnifier
- Sección mapa (link a Google Maps)
- Popup de vídeo
- Juego toggle (iframe /juego/index.html)
- Barra de progreso de scroll
- Fade-in de secciones al scroll

**GIFs hover del hero** — NO existen localmente (solo en el servidor de producción):
- makamaka2.gif, beach.gif, pregunta2.gif, cafe.gif

**How to apply:** El usuario trabaja con este clon. Evitar referencias a clases `elementor-*`, `e-con`, `e-flex`, ni atributos `data-elementor-*`.
