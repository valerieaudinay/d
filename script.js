document.addEventListener("DOMContentLoaded", () => {
    // Gestion du thème
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
        });
    }

    // Vérification de la session au démarrage
    verifierEtatConnexion();
    chargerVraiesStatistiques();
});

// ==========================================
// SYSTÈME DE NOTIFICATIONS PRO (TOAST)
// ==========================================
function afficherNotification(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;

    container.appendChild(toast);

    // Animation d'entrée
    setTimeout(() => toast.classList.add("show"), 10);

    // Disparition automatique après 3 secondes
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// LOGIQUE D'AUTHENTIFICATION STRICTE
// ==========================================
function validerInscription(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const pseudo = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    // Vérifications de sécurité (Front-end)
    if (pseudo.length < 3) return afficherNotification("Le pseudo doit faire au moins 3 caractères.", "error");
    if (password.length < 6) return afficherNotification("Le mot de passe doit faire au moins 6 caractères.", "error");
    if (!email.includes("@")) return afficherNotification("L'email est invalide.", "error");

    // Enregistrement dans la "Base de données" locale (En attendant ton Python)
    const utilisateur = { pseudo: pseudo, email: email, password: password };
    localStorage.setItem("db_user", JSON.stringify(utilisateur));
    
    // Connecter l'utilisateur automatiquement après inscription
    localStorage.setItem("session_active", "true");
    
    fermerMenuAuth();
    verifierEtatConnexion();
    afficherNotification(`Bienvenue ${pseudo} ! Compte créé avec succès.`, "success");
}

function validerConnexion(event) {
    event.preventDefault();

    const emailSaisi = document.getElementById("login-email").value.trim();
    const passwordSaisi = document.getElementById("login-password").value.trim();

    // On récupère le compte enregistré
    const compteEnregistre = JSON.parse(localStorage.getItem("db_user"));

    if (!compteEnregistre) {
        return afficherNotification("Aucun compte trouvé. Veuillez vous inscrire.", "error");
    }

    // Vérification stricte des identifiants
    if (emailSaisi === compteEnregistre.email && passwordSaisi === compteEnregistre.password) {
        localStorage.setItem("session_active", "true");
        fermerMenuAuth();
        verifierEtatConnexion();
        afficherNotification("Connexion réussie !", "success");
    } else {
        afficherNotification("Email ou mot de passe incorrect.", "error");
    }
}

function seDeconnecter() {
    localStorage.removeItem("session_active");
    verifierEtatConnexion();
    afficherNotification("Vous êtes déconnecté.", "success");
}

// ==========================================
// GESTION DE L'INTERFACE SELON LA CONNEXION
// ==========================================
function verifierEtatConnexion() {
    const estConnecte = localStorage.getItem("session_active") === "true";

    if (estConnecte) {
        document.getElementById("btn-login-header").style.display = "none";
        document.getElementById("btn-register-header").style.display = "none";
        document.getElementById("btn-favoris-header").style.display = "block";
        document.getElementById("btn-logout-header").style.display = "block";
    } else {
        document.getElementById("btn-login-header").style.display = "block";
        document.getElementById("btn-register-header").style.display = "block";
        document.getElementById("btn-favoris-header").style.display = "none";
        document.getElementById("btn-logout-header").style.display = "none";
    }
}

function verifierEtOuvrirUpload() {
    const estConnecte = localStorage.getItem("session_active") === "true";
    if (estConnecte) {
        window.location.href = "upload.html"; // Redirige vers ta vraie page Upload
    } else {
        afficherNotification("Accès refusé. Vous devez vous connecter pour publier un script.", "error");
        ouvrirMenuAuth('login');
    }
}

// ==========================================
// GESTION DES FENÊTRES (MODALS)
// ==========================================
function ouvrirMenuAuth(onglet) {
    document.getElementById("modal-auth").style.display = "block";
    changerOngletAuth(onglet);
}

function fermerMenuAuth() {
    document.getElementById("modal-auth").style.display = "none";
}

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

// Fermer le modal en cliquant dans le vide
window.onclick = function(event) {
    const modalAuth = document.getElementById("modal-auth");
    if (event.target == modalAuth) modalAuth.style.display = "none";
}

// ==========================================
// STATISTIQUES (PRÊT POUR TON SERVEUR PYTHON)
// ==========================================
function chargerVraiesStatistiques() {
    /* ICI ON FERA L'APPEL VERS TON SERVEUR.
    Exemple de code futur :
    fetch('http://ton-serveur-python:6000/api/stats')
      .then(res => res.json())
      .then(data => {
          document.getElementById('real-online-users').innerText = data.online;
          document.getElementById('real-total-scripts').innerText = data.total;
      });
    */

    // En attendant, on met juste un placeholder "En cours..." ou un chiffre fixe pour le design
    document.getElementById('real-online-users').innerText = "124";
    document.getElementById('real-total-scripts').innerText = "8 492";
}
