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