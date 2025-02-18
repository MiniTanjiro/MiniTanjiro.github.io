document.addEventListener("DOMContentLoaded", function() {
    // Récupère les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);

    // Extraire les valeurs des paramètres
    const textcolor = urlParams.get('textcolor'); // Couleur du texte
    const bordercolor = urlParams.get('bordercolor'); // Couleur de la bordure
    const progressbar = urlParams.get('progressbar'); // Couleur de la barre de progression
    const id = urlParams.get('id');
    const name = urlParams.get('name');
    const photo = urlParams.get('photo');
    const level = urlParams.get('level') || 10; // Par défaut 10
    const xp = urlParams.get('xp') || 500; // Par défaut 500
    const xpMax = urlParams.get('xpMax') || 700; // Par défaut 700

    // Affichage des paramètres dans la console pour le débogage
    console.log(`Text Color: ${textcolor}`);
    console.log(`Border Color: ${bordercolor}`);
    console.log(`Progress Bar Color: ${progressbar}`);
    console.log(`ID: ${id}`);
    console.log(`Name: ${name}`);
    console.log(`Photo: ${photo}`);
    console.log(`Level: ${level}`);
    console.log(`XP: ${xp}`);
    console.log(`XP Max: ${xpMax}`);

    // Récupère les éléments HTML concernés
    const card = document.querySelector(".user-card");
    const username = document.getElementById("name");
    const userNameTag = document.getElementById("username");
    const userPhoto = document.getElementById("photo");
    const userLevel = document.getElementById("level");
    const userXp = document.getElementById("xp");
    const userXpRequired = document.getElementById("xpRequired");
    const progressBar = document.getElementById("progress");

    // Mise à jour du contenu en fonction des paramètres
    if (name) {
        username.textContent = name;
        userNameTag.textContent = `@${name.toLowerCase().replace(/\s+/g, '')}`; // Format @username
    }

    if (photo) {
        userPhoto.src = photo; // Mettre à jour l'image de profil
    }

    if (textcolor) {
        // Appliquer la couleur du texte UNIQUEMENT aux éléments concernés
        username.style.color = textcolor;
        userNameTag.style.color = textcolor;
        userLevel.style.color = textcolor;
        userXp.style.color = textcolor;
        userXpRequired.style.color = textcolor;
    }

    if (bordercolor) {
        card.style.borderColor = bordercolor; // Appliquer la couleur de la bordure de la carte
    }

    // Mise à jour du niveau et de l'XP
    userLevel.textContent = `NIVEAU ${level}`;
    userXp.innerHTML = `XP: ${xp}`;
    userXpRequired.innerHTML = `XP nécessaire pour passer au niveau supérieur : ${xpMax - xp} <i>(${xpMax})</i>`;

    // Calcul du pourcentage d'XP pour la barre de progression
    const xpPercentage = (xp / xpMax) * 100;
    progressBar.style.width = `${xpPercentage}%`;
    progressBar.innerHTML = `<b>${Math.floor(xpPercentage)}%</b> <i>(${xp}XP/${xpMax}XP)</i>`;

    // Appliquer la couleur personnalisée à la barre de progression
    if (progressbar) {
        progressBar.style.backgroundColor = progressbar;
    }
});
