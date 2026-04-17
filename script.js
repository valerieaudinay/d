// ==========================================
// GESTION DU MENU D'UPLOAD
// ==========================================
function ouvrirMenuUpload() {
    document.getElementById("modal-upload").style.display = "block";
}

function fermerMenuUpload() {
    document.getElementById("modal-upload").style.display = "none";
}

// Fermer le menu si on clique dans le vide
window.onclick = function(event) {
    let modal = document.getElementById("modal-upload");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ==========================================
// GESTION DU BOUTON "REQUIRE KEY"
// ==========================================
function toggleKeyLink() {
    let checkBox = document.getElementById("key-toggle");
    let keyLinkGroup = document.getElementById("key-link-group");
    
    // Si la case est cochée, on affiche l'input pour mettre le lien
    if (checkBox.checked == true) {
        keyLinkGroup.style.display = "flex";
    } else {
        keyLinkGroup.style.display = "none";
    }
}

// ==========================================
// ANIMATION DES STATISTIQUES
// ==========================================
window.onload = function() {
    // Si tu veux relier ça à ton serveur Python plus tard pour avoir 
    // les vrais chiffres, c'est ici qu'il faudra le faire avec un "fetch".
    
    // Pour l'instant, on met les chiffres de ta capture d'écran 
    // et on les fait bouger un tout petit peu pour simuler l'activité.
    
    let baseScripts = 200612;
    let baseViews = 176140891;
    let baseUsers = 185200;

    let affichageScripts = document.getElementById("stat-scripts");
    let affichageViews = document.getElementById("stat-views");
    let affichageUsers = document.getElementById("stat-users");

    setInterval(() => {
        // Ajoute 1 vue aléatoirement
        if(Math.random() > 0.5) baseViews += Math.floor(Math.random() * 5);
        
        affichageScripts.textContent = baseScripts.toLocaleString('en-US');
        affichageViews.textContent = baseViews.toLocaleString('en-US');
        affichageUsers.textContent = baseUsers.toLocaleString('en-US');
    }, 2000);
};
