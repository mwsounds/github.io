// JavaScript Document

document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".why-scroll-container");
    const firstCard = document.querySelector(".why-card"); // Première carte

    // Déplacer le scroll au niveau de la première carte au chargement
    if (scrollContainer && firstCard) {
        scrollContainer.scrollLeft = firstCard.offsetLeft - 30; // Décalage pour centrage
    }

    // Activer le scroll horizontal avec la molette de la souris
    scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
    });
});