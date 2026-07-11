'use strict';

/* ── 1. SCROLL PROGRESS BAR ── */
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
  const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
  const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* ── 2. STICKY HEADER DARKENS ON SCROLL ── */
const siteHeader = document.getElementById('site-header');
function updateHeader() {
  if (!siteHeader) return;
  if ((document.documentElement.scrollTop || document.body.scrollTop) > 60) {
    siteHeader.classList.add('is-scrolled');
  } else {
    siteHeader.classList.remove('is-scrolled');
  }
}
window.addEventListener('scroll', updateHeader, { passive: true });

/* ── 3. SECTION FADE-IN ON SCROLL ── */
window.addEventListener('load', function () {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('section, .section-marquee-target').forEach(function (el) {
    if (el.closest('.site-header, .site-footer')) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;
    el.classList.add('will-fade');
    observer.observe(el);
  });
});

/* ── 4. WELCOME SCREEN ── */
document.addEventListener('DOMContentLoaded', function () {
  const welcomeScreen = document.getElementById('welcome-screen');
  const visitBtn = document.getElementById('visit-website');
  if (!welcomeScreen) return;

  const shown = sessionStorage.getItem('welcomeShown');
  if (!shown) {
    welcomeScreen.style.display = 'flex';
    sessionStorage.setItem('welcomeShown', '1');
  }

  if (visitBtn) {
    visitBtn.addEventListener('click', function () {
      welcomeScreen.style.display = 'none';
    });
  }

  welcomeScreen.addEventListener('click', function (e) {
    if (e.target === welcomeScreen) {
      welcomeScreen.style.display = 'none';
    }
  });
});

/* ── 5. OFF-CANVAS MENU ── */
document.addEventListener('DOMContentLoaded', function () {
  const openBtn  = document.getElementById('open-menu');
  const closeBtn = document.getElementById('close-menu');
  const menu     = document.getElementById('off-canvas-menu');
  const overlay  = menu ? menu.querySelector('.off-canvas-overlay') : null;

  function openMenu() {
    if (!menu) return;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openBtn)  openBtn.addEventListener('click',  function (e) { e.preventDefault(); openMenu(); });
  if (closeBtn) closeBtn.addEventListener('click',  closeMenu);
  if (overlay)  overlay.addEventListener('click',   closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) closeMenu();
  });
});

/* ── 6. RANDOM BLINK ON OFF-CANVAS "OTHER" ITEMS ── */
document.addEventListener('DOMContentLoaded', function () {
  const others = document.querySelectorAll('.off-canvas .other-item');
  if (!others.length) return;

  setInterval(function () {
    others.forEach(el => el.classList.remove('parpadeando'));
    const random = others[Math.floor(Math.random() * others.length)];
    random.classList.add('parpadeando');
    setTimeout(function () { random.classList.remove('parpadeando'); }, 1000);
  }, 2000);
});

/* ── 7. VIDEO POPUP ── */
document.addEventListener('DOMContentLoaded', function () {
  const openVideoBtn  = document.getElementById('open-video');
  const closeVideoBtn = document.getElementById('close-video');
  const videoPopup    = document.getElementById('video-popup');
  const popupOverlay  = videoPopup ? videoPopup.querySelector('.video-popup-overlay') : null;
  const popupVideo    = videoPopup ? videoPopup.querySelector('video') : null;

  function openVideo(e) {
    e.preventDefault();
    if (!videoPopup) return;
    videoPopup.classList.add('is-open');
    videoPopup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (popupVideo) popupVideo.play().catch(() => {});
  }
  function closeVideo() {
    if (!videoPopup) return;
    videoPopup.classList.remove('is-open');
    videoPopup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (popupVideo) { popupVideo.pause(); popupVideo.currentTime = 0; }
  }

  if (openVideoBtn)  openVideoBtn.addEventListener('click',  openVideo);
  if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeVideo);
  if (popupOverlay)  popupOverlay.addEventListener('click',  closeVideo);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && videoPopup && videoPopup.classList.contains('is-open')) closeVideo();
  });
});

/* ── 8. HERO BACKGROUND CHANGE ON WORD HOVER ── */
document.addEventListener('DOMContentLoaded', function () {
  const hero = document.querySelector('.section-hero');
  if (!hero) return;
  const originalBg = window.getComputedStyle(hero).backgroundImage;

  document.querySelectorAll('.word-item').forEach(function (span) {
    span.addEventListener('mouseenter', function () {
      const newBg = span.getAttribute('data-bg');
      if (newBg) {
        hero.style.backgroundImage = 'url(' + newBg + ')';
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
      }
    });
    span.addEventListener('mouseleave', function () {
      hero.style.backgroundImage = originalBg;
    });
  });
});

/* ── 9. MARQUEE ANIMATION (GSAP) ── */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof gsap === 'undefined') return;

  requestAnimationFrame(function () {
    document.querySelectorAll('.marquee-container').forEach(function (container) {
      const marquee = container.querySelector('.marquee');
      const isImageMarquee = container.classList.contains('imagenes');
      if (!marquee) return;

      const baseHTML = marquee.innerHTML;
      const cloneLimit = window.innerWidth * 2;
      let clones = 0;

      while (marquee.offsetWidth < cloneLimit && clones < 10) {
        marquee.innerHTML += baseHTML;
        clones++;
      }

      const totalWidth = marquee.offsetWidth;
      const isMobile = window.innerWidth < 768;
      const duration = isMobile ? 7.5 : 30;

      const animation = gsap.to(marquee, {
        x: -totalWidth / 2,
        duration: duration,
        ease: 'linear',
        repeat: -1
      });

      if (isImageMarquee) {
        marquee.querySelectorAll('.cassette-img').forEach(function (img) {
          img.addEventListener('mouseenter', function () {
            animation.pause();
            const rot = Math.floor(Math.random() * 21) - 10;
            gsap.to(img, { rotate: rot, duration: 0.15, ease: 'power2.out' });
          });
          img.addEventListener('mouseleave', function () {
            animation.play();
            gsap.to(img, { rotate: 0, duration: 0.15, ease: 'power2.out' });
          });
        });
      }
    });
  });
});

/* ── 10. MAGNIFIER / LUPA EFFECT ── */
document.addEventListener('DOMContentLoaded', function () {
  const zonaLupa    = document.getElementById('zonaLupa');
  const imagenHover = document.getElementById('imagenHover');
  if (!zonaLupa || !imagenHover) return;

  zonaLupa.addEventListener('mousemove', function (e) {
    const rect = zonaLupa.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    imagenHover.style.clipPath = 'circle(100px at ' + x + 'px ' + y + 'px)';
  });
  zonaLupa.addEventListener('mouseleave', function () {
    imagenHover.style.clipPath = 'circle(0px at 0 0)';
  });
});

/* ── 11. MAKA FRIENDS – GAME TOGGLE ── */
document.addEventListener('DOMContentLoaded', function () {
  const btnJugar      = document.getElementById('btn-jugar');
  const contenedorInfo  = document.getElementById('contenedor-info');
  const contenedorJuego = document.getElementById('contenedor-juego');
  const btnCerrar     = document.getElementById('btn-cerrar');
  if (!btnJugar) return;

  btnJugar.addEventListener('click', function () {
    contenedorInfo.style.display  = 'none';
    contenedorJuego.style.display = 'block';
  });
  btnCerrar.addEventListener('click', function () {
    contenedorJuego.style.display = 'none';
    contenedorInfo.style.display  = 'flex';
  });
});

/* ── 12. CAROUSEL (SWIPER) ── */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof Swiper === 'undefined') return;
  new Swiper('.carousel-swiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 500,
  });
});

/* ── 13. EMPTY HREF LINKS – PREVENT DEFAULT ── */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href=""], a[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });
});

/* ── 14. AUDIO HOVER (si el usuario lo ha autorizado) ── */
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('audioHoverAllowed') !== 'true') return;

  const audioMap = {
    'audio-hover-1': '/wp-content/uploads/audio1.mp3',
    'audio-hover-2': '/wp-content/uploads/audio2.mp3',
    'audio-hover-3': '/wp-content/uploads/audio3.mp3'
  };

  const audioPlayers = {};
  for (const className in audioMap) {
    const audio = new Audio(audioMap[className]);
    audio.preload = 'auto';
    audioPlayers[className] = audio;
  }

  for (const className in audioMap) {
    document.querySelectorAll('.' + className).forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        const audio = audioPlayers[className];
        if (!audio.paused) audio.currentTime = 0;
        audio.play().catch(function () {});
      });
      el.addEventListener('mouseleave', function () {
        const audio = audioPlayers[className];
        audio.pause();
        audio.currentTime = 0;
      });
    });
  }
});
