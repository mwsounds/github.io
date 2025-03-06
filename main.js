document.addEventListener("DOMContentLoaded", function () {
    console.log("üîÑ Tentative de chargement des avis Google...");

    const placeId = "ChIJySKD7QJTkUcRKSW1ZjYewRs"; // Place ID MW Sounds
    const avisContainer = document.querySelector(".avis-container");

    if (!window.google || !window.google.maps || !google.maps.places) {
        console.error("‚ùå Google Maps API non charg√©e !");
        avisContainer.innerHTML = "<p>Impossible de charger les avis.</p>";
        return;
    }

    console.log("‚úÖ Google Maps API charg√©e avec succ√®s !");

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({ placeId: placeId }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            avisContainer.innerHTML = ""; // Nettoyer avant d'afficher les avis

            place.reviews.slice(0, 3).forEach(review => { // Afficher 3 avis max
                const avisElement = document.createElement("div");
                avisElement.classList.add("avis");
                avisElement.innerHTML = `
                    <h3>${review.author_name}</h3>
                    <p>‚≠ê ${review.rating} / 5</p>
                    <p>"${review.text}"</p>
                `;
                avisContainer.appendChild(avisElement);
            });

            console.log("‚úÖ Avis Google charg√©s avec succ√®s !");
        } else {
            console.error("‚ùå Erreur API Google Places :", status);
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
        points[0].classList.add("active"); // Active le premier √©l√©ment
        setInterval(showNextPoint, 3000); // Change toutes les 3 secondes
    } else {
        console.error("‚ùå Aucun √©l√©ment trouv√© dans 'Nos Points Forts' !");
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

    // D√©filement vers la droite
    rightBtn.addEventListener("click", () => {
        index = (index + 1) % cards.length;
        updateCarousel();
    });

    // D√©filement vers la gauche
    leftBtn.addEventListener("click", () => {
        index = (index - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    updateCarousel(); // Alignement initial
});

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".galerie-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let currentIndex = 0; // Index de l'image actuelle

    // Fonction pour afficher une image spÈcifique sans rÈ-ouvrir la lightbox
    function showImage(index) {
        if (index < 0) {
            currentIndex = images.length - 1; // Retourne ‡ la derniËre image
        } else if (index >= images.length) {
            currentIndex = 0; // Revient ‡ la premiËre image
        } else {
            currentIndex = index;
        }

        // Affiche seulement líimage sans recharger la lightbox
        lightboxImg.src = images[currentIndex].src;
    }

    // Ouvrir la lightbox et afficher l'image cliquÈe
    images.forEach((image, index) => {
        image.addEventListener("click", function () {
            currentIndex = index;
            lightbox.style.display = "flex"; // Ouvre la lightbox
            showImage(currentIndex);
        });
    });

    // Navigation entre les images avec les flËches
    prevBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // EmpÍche la fermeture en cliquant sur la flËche
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // EmpÍche la fermeture en cliquant sur la flËche
        showImage(currentIndex + 1);
    });

    // Fermer la lightbox au clic sur la croix
    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    // Fermer la lightbox en cliquant en dehors de líimage
    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
            lightbox.style.display = "none";
        }
    });

    // Ajout du support clavier (flËches gauche/droite pour naviguer)
    document.addEventListener("keydown", function (e) {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowLeft") {
                showImage(currentIndex - 1);
            } else if (e.key === "ArrowRight") {
                showImage(currentIndex + 1);
            } else if (e.key === "Escape") {
                lightbox.style.display = "none"; // Ferme avec la touche …chap
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".galerie-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let currentIndex = 0; // Index de l'image actuelle

    // Ouvrir la lightbox et afficher l'image en plein Ècran
    images.forEach((image, index) => {
        image.addEventListener("click", function () {
            currentIndex = index;
            lightbox.style.display = "flex"; // Ouvre la lightbox
            updateImage(); // Affiche l'image cliquÈe
        });
    });

    // Fonction pour afficher une image spÈcifique sans fermer la lightbox
    function updateImage() {
        if (currentIndex < 0) {
            currentIndex = images.length - 1; // Retourne ‡ la derniËre image
        } else if (currentIndex >= images.length) {
            currentIndex = 0; // Revient ‡ la premiËre image
        }

        // Met ‡ jour líimage en plein Ècran
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.style.maxWidth = "90vw"; // Adapte ‡ la largeur de líÈcran
        lightboxImg.style.maxHeight = "90vh"; // Adapte ‡ la hauteur de líÈcran
        lightbox.style.alignItems = "center"; // Centre bien líimage
        lightbox.style.justifyContent = "center";
    }

    // Navigation entre les images avec les flËches
    prevBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // EmpÍche la fermeture en cliquant sur la flËche
        currentIndex--; // Passe ‡ líimage prÈcÈdente
        updateImage();
    });

    nextBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // EmpÍche la fermeture en cliquant sur la flËche
        currentIndex++; // Passe ‡ líimage suivante
        updateImage();
    });

    // Fermer la lightbox au clic sur la croix
    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    // Fermer la lightbox en cliquant en dehors de líimage
    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
            lightbox.style.display = "none";
        }
    });

    // Ajout du support clavier (flËches gauche/droite pour naviguer)
    document.addEventListener("keydown", function (e) {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowLeft") {
                currentIndex--;
                updateImage();
            } else if (e.key === "ArrowRight") {
                currentIndex++;
                updateImage();
            } else if (e.key === "Escape") {
                lightbox.style.display = "none"; // Ferme avec la touche …chap
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const menuLinks = document.querySelectorAll("nav ul li a");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active"); // Affiche ou cache le menu
    });

    // Fermer le menu quand on clique sur un lien
    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            menu.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".category-btn");
    const sections = document.querySelectorAll(".materiel-content");

    // VÈrification si les ÈlÈments existent
    if (!buttons.length || !sections.length) {
        console.error("…lÈments de la section 'Notre MatÈriel' non trouvÈs.");
        return;
    }

    // Fonction pour activer une catÈgorie
    function activerCategorie(category) {
        // DÈsactiver toutes les catÈgories et cacher toutes les sections
        buttons.forEach(btn => btn.classList.remove("active"));
        sections.forEach(section => {
            section.classList.remove("active");
            section.style.display = "none"; // Cache la section
        });

        // Activer le bon bouton et afficher la bonne section
        const activeButton = document.querySelector(`[data-category="${category}"]`);
        const activeSection = document.getElementById(category);

        if (activeButton && activeSection) {
            activeButton.classList.add("active");
            activeSection.style.display = "block"; // Affiche la section
            setTimeout(() => activeSection.classList.add("active"), 10); // Ajoute l'animation aprËs un court dÈlai
        }
    }

    // Ajouter l'ÈvÈnement "click" sur chaque bouton
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.dataset.category;
            activerCategorie(category);
        });
    });

    // Activer la premiËre catÈgorie par dÈfaut
    if (buttons.length > 0) {
        activerCategorie(buttons[0].dataset.category);
    }
});


document.addEventListener("DOMContentLoaded", function () {
	// VÈrifier si l'utilisateur est sur mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // DÈsactiver complËtement le curseur personnalisÈ sur mobile
    if (isMobile) {
        return;
    }
    //  CrÈation du curseur principal
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    let posX = 0, posY = 0;
    let targetX = 0, targetY = 0;
    const smoothing = 1;
    let isOnMap = false; //  Variable pour gÈrer la carte

    document.addEventListener("mousemove", function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateCursor() {
        if (!isOnMap) {
            posX += (targetX - posX) * smoothing;
            posY += (targetY - posY) * smoothing;
            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    //  DÈtection propre et immÈdiate de l'entrÈe/sortie de la carte
    const googleMap = document.querySelector("iframe");
    if (googleMap) {
        googleMap.addEventListener("mouseover", function (event) {
            const rect = googleMap.getBoundingClientRect();
            if (
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            ) {
                cursor.style.display = "none"; //  Masque immÈdiatement sans latence
                isOnMap = true;
            }
        });

        googleMap.addEventListener("mouseout", function (event) {
            const rect = googleMap.getBoundingClientRect();
            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                cursor.style.display = "block"; //  RÈaffiche immÈdiatement le curseur
                isOnMap = false;
            }
        });
    }

    //  Masquer le curseur personnalisÈ quand il quitte la fenÍtre
    document.addEventListener("mouseleave", function () {
        cursor.style.opacity = "0";
    });

    document.addEventListener("mouseenter", function () {
        if (!isOnMap) {
            cursor.style.opacity = "1";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const rightBtn = document.querySelector(".right-btn");
    const leftBtn = document.querySelector(".left-btn");

    if (rightBtn && leftBtn) {
        rightBtn.addEventListener("click", function () {
            console.log("Bouton droit cliquÈ !");
        });

        leftBtn.addEventListener("click", function () {
            console.log("Bouton gauche cliquÈ !");
        });
    } else {
        console.error(" Les boutons de dÈfilement ne sont pas trouvÈs.");
    }
});