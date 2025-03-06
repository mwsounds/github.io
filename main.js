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

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".galerie-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let currentIndex = 0; // Index de l'image actuelle

    // Fonction pour afficher une image sp�cifique sans r�-ouvrir la lightbox
    function showImage(index) {
        if (index < 0) {
            currentIndex = images.length - 1; // Retourne � la derni�re image
        } else if (index >= images.length) {
            currentIndex = 0; // Revient � la premi�re image
        } else {
            currentIndex = index;
        }

        // Affiche seulement l�image sans recharger la lightbox
        lightboxImg.src = images[currentIndex].src;
    }

    // Ouvrir la lightbox et afficher l'image cliqu�e
    images.forEach((image, index) => {
        image.addEventListener("click", function () {
            currentIndex = index;
            lightbox.style.display = "flex"; // Ouvre la lightbox
            showImage(currentIndex);
        });
    });

    // Navigation entre les images avec les fl�ches
    prevBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Emp�che la fermeture en cliquant sur la fl�che
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Emp�che la fermeture en cliquant sur la fl�che
        showImage(currentIndex + 1);
    });

    // Fermer la lightbox au clic sur la croix
    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    // Fermer la lightbox en cliquant en dehors de l�image
    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
            lightbox.style.display = "none";
        }
    });

    // Ajout du support clavier (fl�ches gauche/droite pour naviguer)
    document.addEventListener("keydown", function (e) {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowLeft") {
                showImage(currentIndex - 1);
            } else if (e.key === "ArrowRight") {
                showImage(currentIndex + 1);
            } else if (e.key === "Escape") {
                lightbox.style.display = "none"; // Ferme avec la touche �chap
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

    // Ouvrir la lightbox et afficher l'image en plein �cran
    images.forEach((image, index) => {
        image.addEventListener("click", function () {
            currentIndex = index;
            lightbox.style.display = "flex"; // Ouvre la lightbox
            updateImage(); // Affiche l'image cliqu�e
        });
    });

    // Fonction pour afficher une image sp�cifique sans fermer la lightbox
    function updateImage() {
        if (currentIndex < 0) {
            currentIndex = images.length - 1; // Retourne � la derni�re image
        } else if (currentIndex >= images.length) {
            currentIndex = 0; // Revient � la premi�re image
        }

        // Met � jour l�image en plein �cran
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.style.maxWidth = "90vw"; // Adapte � la largeur de l��cran
        lightboxImg.style.maxHeight = "90vh"; // Adapte � la hauteur de l��cran
        lightbox.style.alignItems = "center"; // Centre bien l�image
        lightbox.style.justifyContent = "center";
    }

    // Navigation entre les images avec les fl�ches
    prevBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Emp�che la fermeture en cliquant sur la fl�che
        currentIndex--; // Passe � l�image pr�c�dente
        updateImage();
    });

    nextBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Emp�che la fermeture en cliquant sur la fl�che
        currentIndex++; // Passe � l�image suivante
        updateImage();
    });

    // Fermer la lightbox au clic sur la croix
    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    // Fermer la lightbox en cliquant en dehors de l�image
    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
            lightbox.style.display = "none";
        }
    });

    // Ajout du support clavier (fl�ches gauche/droite pour naviguer)
    document.addEventListener("keydown", function (e) {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowLeft") {
                currentIndex--;
                updateImage();
            } else if (e.key === "ArrowRight") {
                currentIndex++;
                updateImage();
            } else if (e.key === "Escape") {
                lightbox.style.display = "none"; // Ferme avec la touche �chap
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

    // V�rification si les �l�ments existent
    if (!buttons.length || !sections.length) {
        console.error("�l�ments de la section 'Notre Mat�riel' non trouv�s.");
        return;
    }

    // Fonction pour activer une cat�gorie
    function activerCategorie(category) {
        // D�sactiver toutes les cat�gories et cacher toutes les sections
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
            setTimeout(() => activeSection.classList.add("active"), 10); // Ajoute l'animation apr�s un court d�lai
        }
    }

    // Ajouter l'�v�nement "click" sur chaque bouton
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.dataset.category;
            activerCategorie(category);
        });
    });

    // Activer la premi�re cat�gorie par d�faut
    if (buttons.length > 0) {
        activerCategorie(buttons[0].dataset.category);
    }
});


document.addEventListener("DOMContentLoaded", function () {
	// V�rifier si l'utilisateur est sur mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // D�sactiver compl�tement le curseur personnalis� sur mobile
    if (isMobile) {
        return;
    }
    //  Cr�ation du curseur principal
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    let posX = 0, posY = 0;
    let targetX = 0, targetY = 0;
    const smoothing = 1;
    let isOnMap = false; //  Variable pour g�rer la carte

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

    //  D�tection propre et imm�diate de l'entr�e/sortie de la carte
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
                cursor.style.display = "none"; //  Masque imm�diatement sans latence
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
                cursor.style.display = "block"; //  R�affiche imm�diatement le curseur
                isOnMap = false;
            }
        });
    }

    //  Masquer le curseur personnalis� quand il quitte la fen�tre
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
            console.log("Bouton droit cliqu� !");
        });

        leftBtn.addEventListener("click", function () {
            console.log("Bouton gauche cliqu� !");
        });
    } else {
        console.error(" Les boutons de d�filement ne sont pas trouv�s.");
    }
});