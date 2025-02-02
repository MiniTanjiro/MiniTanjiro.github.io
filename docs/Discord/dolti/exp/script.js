function xpNecessairePourNiveau(niveau) {
    return Math.floor(50 * Math.pow(niveau, 1.5));
}

function createBubble(container) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    bubble.style.left = Math.floor(Math.random() * 100) + "%";
    bubble.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(bubble);
}


const globalBtn = document.getElementById('globalBtn');
const seasonBtn = document.getElementById('seasonBtn');
const indicator = document.querySelector('.toggle-indicator');
const globalContainer = document.getElementById('userContainer');
const seasonContainer = document.getElementById('userContainerSaison');

globalBtn.addEventListener('click', () => {
    indicator.style.left = '0%';
    globalBtn.classList.add('active');
    seasonBtn.classList.remove('active');

    globalContainer.style.display = 'block';
    seasonContainer.style.display = 'none';
});

seasonBtn.addEventListener('click', () => {
    indicator.style.left = '50%'; 
    seasonBtn.classList.add('active');
    globalBtn.classList.remove('active');

    seasonContainer.style.display = 'block';
    globalContainer.style.display = 'none';
});

async function fetchUsers() {
    try {
        const response = await fetch("https://dolti.glitch.me/users");
        const users = await response.json();
        const container = document.getElementById("userContainer");
        container.innerHTML = ""; 

        users.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            }
            return b.level - a.level;
        });

        users.forEach((user, index) => {
            if(!user.profil || !user.name) return;
 
            const xpMax = xpNecessairePourNiveau(user.level)
            const xpPercentage = Math.min((user.xp / xpMax) * 100, 100);

            const card = document.createElement("div");
            card.classList.add("user-card");

            const mainDiv = document.createElement("div");
            mainDiv.classList.add("user-main");

            const detailsDiv = document.createElement("div");
            detailsDiv.classList.add("user-details");

            const avatarDiv = document.createElement("div");
            avatarDiv.classList.add("user-avatar");

            const topDiv = document.createElement("div");
            topDiv.classList.add("user-top");
            topDiv.textContent = `TOP ${index + 1}`;

            const img = document.createElement("img");
            img.src = user.profil;
            img.alt = "Avatar";

            avatarDiv.appendChild(topDiv);
            avatarDiv.appendChild(img);

            const nameDiv = document.createElement("div");
            nameDiv.classList.add("user-info-name");
            nameDiv.innerHTML = `<h3>${user.name}</h3><p>@${user.username}</p>`;

            detailsDiv.appendChild(avatarDiv);
            detailsDiv.appendChild(nameDiv);

            const levelDiv = document.createElement("div");
            levelDiv.classList.add("user-info-level");
            levelDiv.innerHTML = `<p>NIVEAU ${user.level}</p><p>XP: ${user.xp}</p><p>XP nécessaire : ${xpMax}</p>`;

            mainDiv.appendChild(detailsDiv);
            mainDiv.appendChild(levelDiv);

            const progressDiv = document.createElement("div");
            progressDiv.classList.add("user-progress");
            progressDiv.innerHTML = `
                <div class="progress-bar">
                    <div class="progress" style="width: ${xpPercentage}%;"><b>${Math.floor(xpPercentage)}%</b> <i>(${user.xp}XP/${xpMax}XP)</i></div>
                </div>
            `;

            const progressCompleted = progressDiv.querySelector(".progress");
            for (let i = 0; i < 5; i++) {
                createBubble(progressCompleted);
            }

            card.appendChild(mainDiv);
            card.appendChild(progressDiv);

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
}

fetchUsers();

async function fetchUsersSaison() {
    try {
        const response = await fetch("https://dolti.glitch.me/users");
        const users = await response.json();
        const container = document.getElementById("userContainerSaison");
        container.innerHTML = ""; 

        const countdownDiv = document.createElement("div");
        countdownDiv.classList.add("countdown");
        countdownDiv.innerHTML = `
            <p class="ci">Temps restant avant la fin de la saison</p>
            <span id="jours">00</span>:
            <span id="heures">00</span>:
            <span id="minutes">00</span>:
            <span id="secondes">00</span>
            <div class = "description">
                <h2>🔥 Comment ça marche ? 🔥</h2>
                <p>📅 <strong>Chaque 1er du mois</strong>, une <strong>nouvelle saison</strong> démarre ! Tout le monde repart de zéro avec les <strong>mêmes chances</strong> de briller. 🌟<br>
                🏆 À la <strong>fin de la saison</strong>, les <strong>3 meilleurs</strong> décrochent des <strong>récompenses exclusives</strong> ! 🎁💰<br>
                Prêt à te hisser au sommet ? 💪😏</p>
            </div>
        `;

        container.appendChild(countdownDiv); 

        users.sort((a, b) => {
            if (a.Levelsaison === b.Levelsaison) {
                return b.XPsaison - a.XPsaison;
            }
            return b.Levelsaison - a.Levelsaison;
        });

        users.forEach((user, index) => {
            if (!user.profil || !user.name || !user.Levelsaison || !user.XPsaison) return;

            const card = document.createElement("div");
            card.classList.add("user-card");

            const mainDiv = document.createElement("div");
            mainDiv.classList.add("user-main");

            const detailsDiv = document.createElement("div");
            detailsDiv.classList.add("user-details");

            const avatarDiv = document.createElement("div");
            avatarDiv.classList.add("user-avatar");

            const topDiv = document.createElement("div");
            topDiv.classList.add("user-top");
            topDiv.textContent = `TOP ${index + 1}`;

            const img = document.createElement("img");
            img.src = user.profil;
            img.alt = "Avatar";

            avatarDiv.appendChild(topDiv);
            avatarDiv.appendChild(img);

            const nameDiv = document.createElement("div");
            nameDiv.classList.add("user-info-name");
            nameDiv.innerHTML = `<h3>${user.name}</h3><p>@${user.username}</p>`;

            detailsDiv.appendChild(avatarDiv);
            detailsDiv.appendChild(nameDiv);

            const levelDiv = document.createElement("div");
            levelDiv.classList.add("user-info-level");
            levelDiv.innerHTML = `<p>NIVEAU ${user.Levelsaison}</p><p>XP: ${user.XPsaison}</p><p>XP nécessaire : ${xpNecessairePourNiveau(user.Levelsaison)}</p>`;

            mainDiv.appendChild(detailsDiv);
            mainDiv.appendChild(levelDiv);

            const progressDiv = document.createElement("div");
            progressDiv.classList.add("user-progress");
            const xpPercentage = Math.min((user.XPsaison / xpNecessairePourNiveau(user.Levelsaison)) * 100, 100);
            progressDiv.innerHTML = `
                <div class="progress-bar">
                    <div class="progress" style="width: ${xpPercentage}%;"><b>${Math.floor(xpPercentage)}%</b> <i>(${user.XPsaison}XP/${xpNecessairePourNiveau(user.Levelsaison)}XP)</i></div>
                </div>
            `;

            const progressCompleted = progressDiv.querySelector(".progress");
            for (let i = 0; i < 5; i++) {
                createBubble(progressCompleted);
            }

            card.appendChild(mainDiv);
            card.appendChild(progressDiv);

            container.appendChild(card);
        });

        startCountdown();
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
}

fetchUsersSaison()

function getNextFirstOfMonth() {
    const now = new Date();
    let nextMonth = now.getMonth() + 1;
    let nextYear = now.getFullYear();

    if (nextMonth === 12) {
        nextMonth = 0; // Janvier
        nextYear += 1;
    }

    return new Date(nextYear, nextMonth, 1, 0, 0, 0); // 1er du mois à minuit
}

function updateCountdown() {
    const now = new Date();
    const targetDate = getNextFirstOfMonth();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.querySelector(".countdown").innerHTML = "Nouvelle période commencée !";
        return;
    }

    const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
    const heures = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const secondes = Math.floor((diff / 1000) % 60);

    document.getElementById("jours").textContent = jours.toString().padStart(2, "0");
    document.getElementById("heures").textContent = heures.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("secondes").textContent = secondes.toString().padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown(); 