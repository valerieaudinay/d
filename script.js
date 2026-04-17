// ==========================================
// VÉRIFICATION DE LA CONNEXION (Démarrage)
// ==========================================
window.onload = function() {
    verifierEtatConnexion();
};

function verifierEtatConnexion() {
    // On vérifie dans le navigateur si l'utilisateur est connecté
    let estConnecte = localStorage.getItem("utilisateurConnecte") === "true";

    if (estConnecte) {
        // Mode Connecté : On cache Connexion/Inscription, on affiche Favoris et Upload
        document.getElementById("btn-login").style.display = "none";
        document.getElementById("btn-register").style.display = "none";
        
        document.getElementById("btn-favoris").style.display = "block";
        document.getElementById("btn-upload-nav").style.display = "block";
        document.getElementById("btn-logout").style.display = "block";
    } else {
        // Mode Déconnecté : L'inverse
        document.getElementById("btn-login").style.display = "block";
        document.getElementById("btn-register").style.display = "block";
        
        document.getElementById("btn-favoris").style.display = "none";
        document.getElementById("btn-upload-nav").style.display = "none";
        document.getElementById("btn-logout").style.display = "none";
    }
}

// ==========================================
// GESTION CONNEXION / DÉCONNEXION
// ==========================================
function seConnecter(event) {
    event.preventDefault(); // Empêche la page de se recharger
    
    // On simule que la connexion a réussi
    localStorage.setItem("utilisateurConnecte", "true");
    
    fermerMenuAuth();
    verifierEtatConnexion();
    alert("Connexion réussie ! Vous pouvez maintenant publier des scripts et ajouter des favoris.");
}

function seDeconnecter() {
    // On supprime la connexion
    localStorage.setItem("utilisateurConnecte", "false");
    verifierEtatConnexion();
    alert("Vous avez été déconnecté.");
}

// ==========================================
// GESTION DES FENÊTRES (MODALS)
// ==========================================

// Fenêtre de Connexion / Inscription
function ouvrirMenuAuth(onglet) {
    document.getElementById("modal-auth").style.display = "block";
    changerOngletAuth(onglet);
}

function fermerMenuAuth() {
    document.getElementById("modal-auth").style.display = "none";
}

// Changer entre "Connexion" et "S'inscrire"
function changerOngletAuth(onglet) {
    if (onglet === 'login') {
        document.getElementById("form-login").style.display = "block";
        document.getElementById("form-register").style.display = "none";
        document.getElementById("tab-login").classList.add("active");
        document.getElementById("tab-register").classList.remove("active");
    } else {
        document.getElementById("form-login").style.display = "none";
        document.getElementById("form-register").style.display = "block";
        document.getElementById("tab-login").classList.remove("active");
        document.getElementById("tab-register").classList.add("active");
    }
}

// Fenêtre d'Upload (SÉCURISÉE)
function ouvrirMenuUpload() {
    let estConnecte = localStorage.getItem("utilisateurConnecte") === "true";
    
    if (estConnecte) {
        // S'il est connecté, on ouvre le formulaire d'upload
        document.getElementById("modal-upload").style.display = "block";
    } else {
        // S'il N'EST PAS connecté, on le bloque et on ouvre la fenêtre de connexion
        alert("⚠️ Vous devez créer un compte ou vous connecter pour publier un script !");
        ouvrirMenuAuth('register');
    }
}

function fermerMenuUpload() {
    document.getElementById("modal-upload").style.display = "none";
}

// Fermer les fenêtres si on clique dans le vide noir
window.onclick = function(event) {
    let modalUpload = document.getElementById("modal-upload");
    let modalAuth = document.getElementById("modal-auth");
    
    if (event.target == modalUpload) {
        modalUpload.style.display = "none";
    }
    if (event.target == modalAuth) {
        modalAuth.style.display = "none";
    }
}

// ==========================================
// THÈME JOUR / NUIT
// ==========================================
function changerTheme() {
    document.body.classList.toggle("light-mode");
}
