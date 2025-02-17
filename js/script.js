document.addEventListener("DOMContentLoaded", () => {
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
});
