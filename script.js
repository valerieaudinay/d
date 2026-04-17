// On attend que la page soit totalement chargée
document.addEventListener("DOMContentLoaded", () => {
    
    // === 1. GESTION DU THÈME (Ton code) ===
    const themeBtn = document.getElementById("themeToggle");
    
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
        });
    }

    // === 2. GESTION DU BOUTON REQUIRE KEY (Nouveau code) ===
    const keyToggle = document.getElementById("key-toggle");
    const keyLinkGroup = document.getElementById("key-link-group");

    // On vérifie si on est bien sur la page upload (pour éviter les erreurs sur index.html)
    if (keyToggle && keyLinkGroup) {
        keyToggle.addEventListener("change", function() {
            if (this.checked) {
                // Si coché, on affiche la case
                keyLinkGroup.style.display = "flex";
            } else {
                // Sinon on la cache
                keyLinkGroup.style.display = "none";
            }
        });
    }

});
