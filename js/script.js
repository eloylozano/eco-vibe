document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener('click', () => {
    if (window.innerWidth <= 1000) {  // Verifica si la pantalla es menor o igual a 1000px
      nav.classList.toggle('active');  // Cambia la clase 'active' para mostrar u ocultar
    }
  });

  // También puedes agregar un evento para cerrar el menú si el tamaño de la ventana cambia
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
      nav.classList.remove('active');  // Elimina la clase activa si el tamaño es mayor a 1000px
    }
  });


  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 1000; // Duración de la animación en milisegundos
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString(); // Asegura que el número final sea exacto
      }
    };

    requestAnimationFrame(updateCounter);
  };

  // Observador para detectar cuando la sección está en pantalla
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Para que la animación ocurra solo una vez
        }
      });
    },
    { threshold: 0.5 }
  ); // Activa cuando el 50% del elemento es visible

  counters.forEach((counter) => observer.observe(counter));


  const cardsPerPage = 6; // Número de tarjetas por página
  const cards = document.querySelectorAll(".card"); // Seleccionar todas las tarjetas
  const paginationLinks = document.querySelectorAll(".page-link"); // Seleccionar los números de la paginación

  // Función para mostrar las tarjetas de la página seleccionada
  function showPage(pageNumber) {
    const startIndex = (pageNumber - 1) * cardsPerPage; // Índice de inicio
    const endIndex = startIndex + cardsPerPage; // Índice final

    // Iterar sobre las tarjetas y actualizar visibilidad
    cards.forEach((card, index) => {
      card.style.display =
        index >= startIndex && index < endIndex ? "block" : "none";
    });

    // Actualizar estilos de los enlaces de paginación
    paginationLinks.forEach((link, index) => {
      link.parentElement.classList.toggle("active", index === pageNumber - 1); // Marcar página activa
    });
  }

  // Agregar eventos de clic a los números de paginación
  paginationLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Evitar comportamiento por defecto
      showPage(index + 1); // Mostrar la página correspondiente
    });
  });

  // Mostrar la primera página al cargar
  showPage(1);


  (function(d){
    var s = d.createElement("script");
    /* uncomment the following line to override default position*/
     s.setAttribute("data-position", 2);
    /* uncomment the following line to override default size (values: small, large)*/
     s.setAttribute("data-size", "large");
    /* uncomment the following line to override default language (e.g., fr, de, es, he, nl, etc.)*/
    /* s.setAttribute("data-language", "null");*/
    /* uncomment the following line to override color set via widget (e.g., #053f67)*/
    s.setAttribute("data-color", "#95bf00");
    /* uncomment the following line to override type set via widget (1=person, 2=chair, 3=eye, 4=text)*/
    /* s.setAttribute("data-type", "1");*/
    /* s.setAttribute("data-statement_text:", "Our Accessibility Statement");*/
    /* s.setAttribute("data-statement_url", "http://www.example.com/accessibility";*/
    /* uncomment the following line to override support on mobile devices*/
    /* s.setAttribute("data-mobile", true);*/
    /* uncomment the following line to set custom trigger action for accessibility menu*/
    /* s.setAttribute("data-trigger", "triggerId")*/
    s.setAttribute("data-account", "nd23Ci8S63");
    s.setAttribute("src", "https://cdn.userway.org/widget.js");
    (d.body || d.head).appendChild(s);})(document)
});
