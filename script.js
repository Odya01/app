document.addEventListener('DOMContentLoaded', function() {
  // Menú móvil
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.main-nav');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      
      // Cambia las líneas del burger a X
      const burgerLines = menuToggle.querySelectorAll('.burger-line');
      burgerLines.forEach(function(line) {
        line.classList.toggle('active');
      });
    });
    
    // Cierra el menú al hacer clic en algún enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (navList.classList.contains('active')) {
          navList.classList.remove('active');
          
          // Restaura el burger
          const burgerLines = menuToggle.querySelectorAll('.burger-line');
          burgerLines.forEach(function(line) {
            line.classList.remove('active');
          });
        }
      });
    });
  }
  
  // Añadir clase activa al enlace actual
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(function(link) {
    const linkPath = link.getAttribute('href');
    if (currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });
});

const modal = document.getElementById('ageVerificationModal');
const confirmButton = document.getElementById('confirmButton');
const modalName = 'apps6'

window.onload = function () {
  if (modal) {
    if (localStorage.getItem(modalName) === 'true') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'flex';
      document.body.classList.add('modal-open');
    }
  }
};

if (confirmButton) {
  confirmButton.addEventListener('click', function () {
    if (modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      localStorage.setItem(modalName, 'true');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Abrir modal al hacer clic en la tarjeta de aplicación
  const appCards = document.querySelectorAll('.app-card');
  
  if (appCards.length > 0) {
    appCards.forEach(function(card) {
      card.addEventListener('click', function() {
        const appId = card.getAttribute('data-app-id');
        const detailModal = document.getElementById(appId + '-detail');
        
        if (detailModal) {
          detailModal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Evitar scroll en el body
        }
      });
    });
  }
  
  // Cerrar modal al hacer clic en el botón de cierre
  const closeButtons = document.querySelectorAll('.app-detail-close');
  
  if (closeButtons.length > 0) {
    closeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const modal = button.closest('.app-detail-overlay');
        
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = ''; // Restaurar scroll
        }
      });
    });
  }
  
  // Cerrar modal al hacer clic fuera del contenido
  const modals = document.querySelectorAll('.app-detail-overlay');
  
  if (modals.length > 0) {
    modals.forEach(function(modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = ''; // Restaurar scroll
        }
      });
    });
  }
  
  // Funcionalidad de los sliders de capturas de pantalla
  const sliders = document.querySelectorAll('.screenshots-slider');
  
  if (sliders.length > 0) {
    sliders.forEach(function(slider) {
      const container = slider.querySelector('.screenshots-container');
      const prevBtn = slider.querySelector('.slider-prev');
      const nextBtn = slider.querySelector('.slider-next');
      
      if (container && prevBtn && nextBtn) {
        // Botón siguiente
        nextBtn.addEventListener('click', function() {
          container.scrollBy({
            left: 300,
            behavior: 'smooth'
          });
        });
        
        // Botón anterior
        prevBtn.addEventListener('click', function() {
          container.scrollBy({
            left: -300,
            behavior: 'smooth'
          });
        });
      }
    });
  }
});

// Función autoejecutable para evitar conflictos con otros scripts
(function() {
  // Esperar a que el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', function() {
    // Verificar si la sección de testimonios existe en la página actual
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (!testimonialsSection) return;
    
    // Obtener elementos necesarios
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    // Variables de control
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 5000; // 5 segundos
    
    // Inicialización
    function init() {
      if (!testimonialsSlider || slides.length === 0) return;
      
      // Crear puntos de navegación
      createDots();
      
      // Mostrar el primer slide
      showSlide(0);
      
      // Iniciar el autoplay
      startAutoPlay();
      
      // Añadir event listeners
      addEventListeners();
    }
    
    // Crear puntos de navegación para cada slide
    function createDots() {
      if (!dotsContainer) return;
      
      slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.slide = index;
        
        dot.addEventListener('click', () => {
          showSlide(index);
          resetAutoPlay();
        });
        
        dotsContainer.appendChild(dot);
      });
    }
    
    // Mostrar slide específico
    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      // Desactivar slide actual
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Activar nuevo slide
      slides[index].classList.add('active');
      
      // Actualizar puntos de navegación
      updateDots(index);
      
      // Actualizar índice actual
      currentSlide = index;
    }
    
    // Actualizar puntos de navegación
    function updateDots(index) {
      const dots = document.querySelectorAll('.dot');
      
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    // Ir al slide siguiente
    function nextSlide() {
      showSlide(currentSlide + 1);
    }
    
    // Ir al slide anterior
    function prevSlide() {
      showSlide(currentSlide - 1);
    }
    
    // Iniciar reproducción automática
    function startAutoPlay() {
      // Limpiar intervalo existente si hay alguno
      if (slideInterval) {
        clearInterval(slideInterval);
      }
      
      // Establecer nuevo intervalo
      slideInterval = setInterval(nextSlide, slideDelay);
    }
    
    // Reiniciar reproducción automática
    function resetAutoPlay() {
      clearInterval(slideInterval);
      startAutoPlay();
    }
    
    // Detener reproducción automática
    function stopAutoPlay() {
      clearInterval(slideInterval);
    }
    
    // Añadir event listeners
    function addEventListeners() {
      if (prevButton) {
        prevButton.addEventListener('click', () => {
          prevSlide();
          resetAutoPlay();
        });
      }
      
      if (nextButton) {
        nextButton.addEventListener('click', () => {
          nextSlide();
          resetAutoPlay();
        });
      }
      
      // Detener autoplay al hacer hover
      if (testimonialsSlider) {
        testimonialsSlider.addEventListener('mouseenter', stopAutoPlay);
        testimonialsSlider.addEventListener('mouseleave', startAutoPlay);
        
        // Prevenir arrastre de imágenes
        const avatarImages = testimonialsSlider.querySelectorAll('.avatar-img');
        avatarImages.forEach(img => {
          img.addEventListener('dragstart', e => e.preventDefault());
        });
      }
      
      // Manejo de eventos táctiles para dispositivos móviles
      let touchStartX = 0;
      let touchEndX = 0;
      
      if (testimonialsSlider) {
        testimonialsSlider.addEventListener('touchstart', e => {
          touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        testimonialsSlider.addEventListener('touchend', e => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
        }, { passive: true });
      }
      
      // Manejar deslizamiento
      function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
          // Deslizamiento a la izquierda (siguiente slide)
          nextSlide();
          resetAutoPlay();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
          // Deslizamiento a la derecha (slide anterior)
          prevSlide();
          resetAutoPlay();
        }
      }
      
      // Manejar cambios de visibilidad de la página
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          // Pausa el autoplay cuando la página no está visible
          stopAutoPlay();
        } else {
          // Reanuda el autoplay cuando la página vuelve a ser visible
          startAutoPlay();
        }
      });
    }
    
    // Iniciar el slider
    init();
  });
})();


document.addEventListener('DOMContentLoaded', function() {
  // Verificar si estamos en la página about
  const valuesTabs = document.querySelector('.values-tabs-nav');
  if (!valuesTabs) return;
  
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Asignar eventos de clic a todos los botones de tab
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Desactivar todos los tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Activar el tab seleccionado
      this.classList.add('active');
      document.getElementById(tabId + '-content').classList.add('active');
    });
  });
});

// JavaScript para la funcionalidad de FAQ en la página About
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página about y existe la sección FAQ
    const faqSection = document.querySelector('.faq-section');
    if (!faqSection) return;
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Añadir evento click a cada pregunta
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        // Comprobar si el ítem ya está activo
        const isActive = item.classList.contains('active');
        
        // Cerrar todos los ítems abiertos
        faqItems.forEach(faqItem => {
          faqItem.classList.remove('active');
        });
        
        // Si el ítem no estaba activo, abrirlo
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
    
    // Abrir el primer ítem por defecto
    if (faqItems.length > 0) {
      faqItems[0].classList.add('active');
    }
  });
})();

// JavaScript para la funcionalidad de la página de guías
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de guías
    const guidesSection = document.querySelector('.guides-list-section');
    if (!guidesSection) return;
    
    // Formatear fechas relativas en las tarjetas
    formatDates();
    
    // Configurar funcionalidad de los modales
    setupModals();
  });
  
  // Función para formatear las fechas según los días atrás
  function formatDates() {
    const today = new Date();
    
    // Formatear fechas en las tarjetas
    const dateTags = document.querySelectorAll('[data-days-ago]');
    
    dateTags.forEach(tag => {
      const daysAgo = parseInt(tag.getAttribute('data-days-ago'));
      const dateToShow = new Date(today);
      dateToShow.setDate(today.getDate() - daysAgo);
      
      tag.textContent = formatDate(dateToShow);
    });
  }
  
  // Función auxiliar para formatear la fecha
  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }
  
  // Configurar funcionalidad de los modales
  function setupModals() {
    const guideCards = document.querySelectorAll('.guide-card');
    const guideModals = document.querySelectorAll('.guide-modal');
    const closeButtons = document.querySelectorAll('.guide-modal-close');
    
    // Abrir modal al hacer clic en la tarjeta
    guideCards.forEach(card => {
      const guideId = card.getAttribute('data-guide-id');
      const readMoreBtn = card.querySelector('.guide-read-more');
      
      if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function(e) {
          e.preventDefault();
          openModal(guideId);
        });
      }
    });
    
    // Cerrar modal al hacer clic en el botón de cierre
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        closeModal();
      });
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    guideModals.forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    });
    
    // Cerrar modal al presionar ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
    
    // Función para abrir un modal específico
    function openModal(guideId) {
      const modal = document.getElementById(`modal-${guideId}`);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll en el body
      }
    }
    
    // Función para cerrar cualquier modal abierto
    function closeModal() {
      const openModal = document.querySelector('.guide-modal.active');
      if (openModal) {
        openModal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
      }
    }
  }
})();


// JavaScript para las secciones adicionales de la página de guías
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de guías
    const guidesPage = document.querySelector('.guides-list-section');
    if (!guidesPage) return;
    
    // Inicializar las pestañas de categorías
    initCategoryTabs();
    
    // Inicializar las preguntas frecuentes
    initFaqAccordion();
  });
  
  // Función para inicializar las pestañas de categorías
  function initCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    if (!categoryTabs.length) return;
    
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Obtener la categoría seleccionada
        const category = this.getAttribute('data-category');
        
        // Eliminar la clase active de todas las pestañas y paneles
        categoryTabs.forEach(t => t.classList.remove('active'));
        const allPanels = document.querySelectorAll('.category-panel');
        allPanels.forEach(p => p.classList.remove('active'));
        
        // Activar la pestaña seleccionada
        this.classList.add('active');
        
        // Activar el panel correspondiente
        const targetPanel = document.getElementById(`${category}-panel`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }
  
  // Función para inicializar el acordeón de preguntas frecuentes
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.guides-faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
      const question = item.querySelector('.guides-faq-question');
      
      question.addEventListener('click', function() {
        // Comprobar si el ítem ya está activo
        const isActive = item.classList.contains('active');
        
        // Cerrar todos los ítems abiertos
        faqItems.forEach(faqItem => {
          faqItem.classList.remove('active');
        });
        
        // Si el ítem no estaba activo, abrirlo
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
    
    // Abrir el primer ítem por defecto
    if (faqItems.length > 0) {
      faqItems[0].classList.add('active');
    }
  }
})();

// JavaScript para la funcionalidad de la página de Ayuda
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de ayuda
    const helpPage = document.querySelector('.help-hero-section');
    if (!helpPage) return;
    
    // Inicializar las pestañas de problemas comunes
    initIssueTabs();
    
    // Inicializar los acordeones de problemas
    initIssueAccordions();
    
    // Inicializar el acordeón de FAQ
    initFaqAccordion();
    
    // Inicializar scroll suave para enlaces de ancla
    initSmoothScroll();
  });
  
  // Función para inicializar las pestañas de problemas comunes
  function initIssueTabs() {
    const issueTabs = document.querySelectorAll('.issue-tab');
    if (!issueTabs.length) return;
    
    issueTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Obtener el tipo de problema seleccionado
        const issueType = this.getAttribute('data-issue');
        
        // Eliminar la clase active de todas las pestañas y paneles
        issueTabs.forEach(t => t.classList.remove('active'));
        const allPanels = document.querySelectorAll('.issue-panel');
        allPanels.forEach(p => p.classList.remove('active'));
        
        // Activar la pestaña seleccionada
        this.classList.add('active');
        
        // Activar el panel correspondiente
        const targetPanel = document.getElementById(`${issueType}-panel`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }
  
  // Función para inicializar los acordeones de problemas
  function initIssueAccordions() {
    const issueItems = document.querySelectorAll('.issue-item');
    if (!issueItems.length) return;
    
    issueItems.forEach(item => {
      const header = item.querySelector('.issue-header');
      
      header.addEventListener('click', function() {
        // Comprobar si el ítem ya está activo
        const isActive = item.classList.contains('active');
        
        // Cerrar todos los ítems abiertos en el mismo panel
        const parentPanel = item.closest('.issue-panel');
        if (parentPanel) {
          const siblings = parentPanel.querySelectorAll('.issue-item');
          siblings.forEach(sibling => {
            sibling.classList.remove('active');
          });
        }
        
        // Si el ítem no estaba activo, abrirlo
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
    
    // Abrir el primer ítem de cada panel por defecto
    const issuePanels = document.querySelectorAll('.issue-panel');
    issuePanels.forEach(panel => {
      const firstItem = panel.querySelector('.issue-item');
      if (firstItem) {
        firstItem.classList.add('active');
      }
    });
  }
  
  // Función para inicializar el acordeón de FAQ
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.help-faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
      const question = item.querySelector('.help-faq-question');
      
      question.addEventListener('click', function() {
        // Comprobar si el ítem ya está activo
        const isActive = item.classList.contains('active');
        
        // Cerrar todos los ítems abiertos
        faqItems.forEach(faqItem => {
          faqItem.classList.remove('active');
        });
        
        // Si el ítem no estaba activo, abrirlo
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
    
    // Abrir el primer ítem por defecto
    if (faqItems.length > 0) {
      faqItems[0].classList.add('active');
    }
  }
  
  // Función para el scroll suave en los enlaces de ancla
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Obtener el destino del enlace
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          // Calcular la posición del elemento
          const headerOffset = 100; // Ajustar según la altura del header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Realizar el scroll suave
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
})();

// JavaScript para la funcionalidad de la página de Contacto
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de contacto
    const contactPage = document.querySelector('.contact-faq-section');
    if (!contactPage) return;
    
    // Inicializar el acordeón de FAQ
    initFaqAccordion();
  });
  
  // Función para inicializar el acordeón de FAQ
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.contact-faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
      const question = item.querySelector('.contact-faq-question');
      
      question.addEventListener('click', function() {
        // Comprobar si el ítem ya está activo
        const isActive = item.classList.contains('active');
        
        // Cerrar todos los ítems abiertos
        faqItems.forEach(faqItem => {
          faqItem.classList.remove('active');
        });
        
        // Si el ítem no estaba activo, abrirlo
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
    
    // Abrir el primer ítem por defecto
    if (faqItems.length > 0) {
      faqItems[0].classList.add('active');
    }
  }
})();