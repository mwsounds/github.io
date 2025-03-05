document.addEventListener("DOMContentLoaded", function () {
    console.log("🔄 Tentative de chargement des avis Google...");

    const placeId = "ChIJySKD7QJTkUcRKSW1ZjYewRs"; // Place ID MW Sounds
    const avisContainer = document.querySelector(".avis-container");

    if (!window.google || !window.google.maps || !google.maps.places) {
        console.error("❌ Google Maps API non chargée !");
        avisContainer.innerHTML = "<p>Impossible de charger les avis.</p>";
        return;
    }

    console.log("✅ Google Maps API chargée avec succès !");

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({ placeId: placeId }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            avisContainer.innerHTML = ""; // Nettoyer avant d'afficher les avis

            place.reviews.slice(0, 3).forEach(review => { // Afficher 3 avis max
                const avisElement = document.createElement("div");
                avisElement.classList.add("avis");
                avisElement.innerHTML = `
                    <h3>${review.author_name}</h3>
                    <p>⭐ ${review.rating} / 5</p>
                    <p>"${review.text}"</p>
                `;
                avisContainer.appendChild(avisElement);
            });

            console.log("✅ Avis Google chargés avec succès !");
        } else {
            console.error("❌ Erreur API Google Places :", status);
            avisContainer.innerHTML = "<p>Aucun avis disponible.</p>";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const points = document.querySelectorAll(".point");
    let index = 0;

    function showNextPoint() {
        points.forEach((point, i) => {
            point.classList.remove("active");
            if (i === index) {
                point.classList.add("active");
            }
        });

        index = (index + 1) % points.length; // Passe au suivant en boucle
    }

    if (points.length > 0) {
        points[0].classList.add("active"); // Active le premier élément
        setInterval(showNextPoint, 3000); // Change toutes les 3 secondes
    } else {
        console.error("❌ Aucun élément trouvé dans 'Nos Points Forts' !");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".why-scroll");
    const cards = document.querySelectorAll(".why-card");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    let index = 0; // Commence sur "Technologie de Pointe"

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 0; // Largeur + espace
        const containerWidth = document.querySelector(".why-scroll-container").offsetWidth;
        
        // Centrage fluide
        const translateX = -index * cardWidth + (containerWidth / 2) - (cardWidth / 2);
        scrollContainer.style.transform = `translateX(${translateX}px)`;
    }

    // Défilement vers la droite
    rightBtn.addEventListener("click", () => {
        index = (index + 1) % cards.length;
        updateCarousel();
    });

    // Défilement vers la gauche
    leftBtn.addEventListener("click", () => {
        index = (index - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    updateCarousel(); // Alignement initial
});