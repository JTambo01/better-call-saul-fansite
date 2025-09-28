document.addEventListener("DOMContentLoaded", function () {
  // Modal para la galería de imágenes
  const galleryGrids = document.querySelectorAll(".gallery-grid");
  let currentModal = null;
  let currentImages = [];
  let currentIndex = 0;

  galleryGrids.forEach((grid) => {
    const images = Array.from(grid.querySelectorAll(".gallery-item img"));
    images.forEach((img, index) => {
      img.parentElement.addEventListener("click", (e) => {
        if (e.currentTarget.closest(".character-gallery")) {
          return;
        }
        e.preventDefault();
        currentImages = images.map((i) => ({ src: i.src, alt: i.alt }));
        currentIndex = index;
        openModal(currentImages[currentIndex]);
      });
    });
  });

  // Selección de personajes
  const characterItems = document.querySelectorAll(
    ".character-gallery .gallery-item"
  );
  characterItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.classList.add("selected");
    });
    item.addEventListener("mouseout", () => {
      item.classList.remove("selected");
    });
  });

  function openModal(image) {
    if (currentModal) {
      closeCurrentModal();
    }

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <button class="modal-prev">&lt;</button>
                <img src="${image.src}" alt="${image.alt}">
                <button class="modal-next">&gt;</button>
            </div>
        `;

    document.body.appendChild(modal);
    document.body.style.overflow = "hidden"; // Prevenir scroll del fondo
    currentModal = modal;

    // Event listeners
    modal.querySelector(".close").addEventListener("click", closeCurrentModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeCurrentModal();
      }
    });
    modal.querySelector(".modal-prev").addEventListener("click", showPrevImage);
    modal.querySelector(".modal-next").addEventListener("click", showNextImage);
    document.addEventListener("keydown", handleKeyPress);
  }

  function updateModalImage() {
    if (currentModal) {
      const img = currentModal.querySelector("img");
      const newImage = currentImages[currentIndex];
      img.src = newImage.src;
      img.alt = newImage.alt;
    }
  }

  function showPrevImage() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : currentImages.length - 1;
    updateModalImage();
  }

  function showNextImage() {
    currentIndex = currentIndex < currentImages.length - 1 ? currentIndex + 1 : 0;
    updateModalImage();
  }

  function closeCurrentModal() {
    if (currentModal) {
      currentModal.remove();
      currentModal = null;
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyPress);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Escape") {
      closeCurrentModal();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    }
  }

  // Carousel para Posters
  const carouselContainer = document.querySelector(".carousel-container");
  if (carouselContainer) {
    const carouselSlide = carouselContainer.querySelector(".carousel-slide");
    const carouselItems = carouselSlide.querySelectorAll(".gallery-item");
    const prevBtn = carouselContainer.querySelector(".carousel-prev");
    const nextBtn = carouselContainer.querySelector(".carousel-next");

    let carouselIndex = 0;
    const totalItems = carouselItems.length;

    function showItem(index) {
      if (index >= totalItems) {
        carouselIndex = 0;
      } else if (index < 0) {
        carouselIndex = totalItems - 1;
      } else {
        carouselIndex = index;
      }
      const offset = -carouselIndex * 100;
      carouselSlide.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.addEventListener("click", () => {
      showItem(carouselIndex + 1);
    });

    prevBtn.addEventListener("click", () => {
      showItem(carouselIndex - 1);
    });

    // Inicializar carrusel
    if (totalItems > 0) {
      showItem(0);
    }
  }
});