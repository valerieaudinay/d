// ==========================================
// THÈME JOUR / NUIT (SAUVEGARDÉ)
// ==========================================
function changerTheme() {
    let body = document.body;
    body.classList.toggle("light-mode");
    
    let btnTheme = document.querySelector(".theme-toggle");
    
    if (body.classList.contains("light-mode")) {
        btnTheme.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        btnTheme.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
}

// Vérifier le thème au chargement de la page
window.onload = function() {
    let themeSauvegarde = localStorage.getItem("theme");
    if (themeSauvegarde === "light") {
        document.body.classList.add("light-mode");
        document.querySelector(".theme-toggle").textContent = "☀️";
    }
    
    // Lancer la récupération des statistiques
    chargerStatistiques();
};

// ==========================================
// GESTION DU MENU D'UPLOAD
// ==========================================
function ouvrirMenuUpload() {
    document.getElementById("modal-upload").style.display = "block";
}

function fermerMenuUpload() {
    document.getElementById("modal-upload").style.display = "none";
}

// Fermer le menu si on clique dans le vide (hors de la boîte)
window.onclick = function(event) {
    let modal = document.getElementById("modal-upload");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ==========================================
// SYSTÈME DE STATISTIQUES "RÉELLES"
// ==========================================
function chargerStatistiques() {
    let affichageScripts = document.getElementById("total-scripts");
    let affichageJoueurs = document.getElementById("online-users");

    /* POUR TON SERVEUR PYTHON :
       Quand tu seras prêt à relier ça à ton serveur, tu effaceras le code en dessous
       et tu utiliseras un truc comme ça :
       
       fetch("https://ton-serveur-python.com/api/stats")
       .then(response => response.json())
       .then(data => {
           affichageScripts.textContent = data.total_scripts;
           affichageJoueurs.textContent = data.joueurs_en_ligne;
       });
    */

    // En attendant ton serveur, voici une simulation qui génère des nombres dynamiques
    // basés sur l'heure, pour faire "vivre" le site.
    
    let baseScripts = 1245; // Le nombre de base de scripts
    let baseJoueurs = 340;  // Le nombre de base de joueurs

    // Met à jour les chiffres toutes les 5 secondes pour simuler du trafic
    setInterval(() => {
        // Ajoute un peu de hasard (les joueurs montent et descendent, les scripts augmentent lentement)
        let joueursVariation = Math.floor(Math.random() * 15) - 5; // Entre -5 et +10
        
        baseJoueurs = Math.max(100, baseJoueurs + joueursVariation);
        
        affichageScripts.textContent = baseScripts.toLocaleString();
        affichageJoueurs.textContent = baseJoueurs.toLocaleString();
    }, 3000);

    // Premier affichage immédiat
    affichageScripts.textContent = baseScripts.toLocaleString();
    affichageJoueurs.textContent = baseJoueurs.toLocaleString();
}
