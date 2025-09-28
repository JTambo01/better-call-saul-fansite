// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  const splashScreen = document.getElementById("splash-screen");
  const header = document.querySelector(".header");
  const phoneIcon = document.querySelector(".phone-icon");

  if (splashScreen) {
    const hideSplashScreen = () => {
      splashScreen.style.display = "none";
      header.classList.add("visible");
    };

    phoneIcon.addEventListener("click", (e) => {
      e.preventDefault();
      hideSplashScreen();
      document.querySelector("#home").scrollIntoView({
        behavior: "smooth",
      });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        hideSplashScreen();
      }
    });
  }

  // Elementos del DOM
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle del menú móvil
  mobileMenuBtn.addEventListener("click", function () {
    navList.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");
  });

  // Cerrar menú móvil al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navList.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    });
  });

  // Scroll suave para enlaces internos
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const linkUrl = new URL(link.href);
      const currentUrl = new URL(window.location.href);

      // Solo aplicar scroll suave para enlaces internos en la misma página
      if (
        linkUrl.hostname === currentUrl.hostname &&
        linkUrl.pathname === currentUrl.pathname &&
        link.hash
      ) {
        e.preventDefault();
        const targetSection = document.querySelector(link.hash);
        if (targetSection) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }
    });
  });

  // Animación de aparición de elementos al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observar elementos para animación
  const animatedElements = document.querySelectorAll(
    ".character-card, .episode-card, .news-card, .gallery-item"
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Efecto parallax para el hero
  window.addEventListener("scroll", function () {
    // El efecto parallax original movía toda la sección .hero, causando problemas de layout.
    // Se recomienda aplicar parallax al background-image de .hero con CSS para un mejor resultado.
    // Ejemplo en CSS:
    // .hero { background-attachment: fixed; }
    // Por simplicidad, se ha eliminado la funcionalidad JS.
  });

  // Lazy loading para imágenes
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Efecto de hover para las tarjetas
  const cards = document.querySelectorAll(
    ".character-card, .episode-card, .news-card"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Botón de "volver arriba"
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = "↑";
  backToTopBtn.className = "back-to-top";
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Mostrar/ocultar botón de volver arriba
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Mostrar/ocultar header según dirección de scroll (scroll down -> ocultar, scroll up -> mostrar)
  // Usa requestAnimationFrame para mejor rendimiento y evita interferir con el menú móvil abierto
  let lastScrollY = window.pageYOffset;
  let ticking = false;
  const SCROLL_THRESHOLD = 50; // no ocultar cuando estamos cerca del top

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const currentScrollY = window.pageYOffset;

        // Si el menú móvil está abierto, mantenemos el header visible
        if (navList && navList.classList.contains("active")) {
          header.classList.remove("hidden");
        } else if (currentScrollY <= SCROLL_THRESHOLD) {
          // Siempre mostrar cerca del top
          header.classList.remove("hidden");
        } else if (currentScrollY > lastScrollY) {
          // Scrolling down -> ocultar
          header.classList.add("hidden");
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up -> mostrar
          header.classList.remove("hidden");
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  });

  // Efecto de escritura para el título del hero
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Aplicar efecto de escritura al título del hero
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 150);
    }, 1000);
  }

  // Preloader
  window.addEventListener("load", function () {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }
  });

  // Efecto de partículas en el fondo (opcional)
  function createParticles() {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles";
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 20 + "s";
      particle.style.animationDuration = Math.random() * 10 + 10 + "s";
      particlesContainer.appendChild(particle);
    }
  }

  // Crear partículas si se desea
  // createParticles();

  console.log("🚀 Better Call Saul Fan Site cargado exitosamente!");
  console.log("⚖️ ¡Better Call Saul!");
});
