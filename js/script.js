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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Para que la animación ocurra solo una vez
            }
        });
    }, { threshold: 0.5 }); // Activa cuando el 50% del elemento es visible

    counters.forEach(counter => observer.observe(counter));
});
