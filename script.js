// On attend que la page soit totalement chargée
document.addEventListener("DOMContentLoaded", () => {
    
    // On cible le bouton avec l'ID "themeToggle"
    const themeBtn = document.getElementById("themeToggle");
    
    // Quand on clique sur le bouton...
    themeBtn.addEventListener("click", () => {
        // On ajoute ou on retire la classe "light-mode" au <body>
        document.body.classList.toggle("light-mode");
    });

});
