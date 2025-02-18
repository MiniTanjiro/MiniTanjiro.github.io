const recompenses  = [
    "Boost XP x2, Rôle spécial",
    "Boost XP x 1,5",
    "Boost XP x 1,2",
]
const mois = "Février"

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

async function fetchUsersSaison() {
    try {
        const response = await fetch('./classement.json');
        if (!response.ok) throw new Error("Échec du chargement du fichier JSON");

        const users = await response.json();
        const container = document.getElementById("userContainerSaison");
        container.innerHTML = ""; 

        if (!users || users.length === 0) {
            container.innerHTML = `<div class="gifts">Le classement n'a pas encore été publié.</div>`;
            return;
        }

        const cadeauxDiv = document.createElement("div");
        cadeauxDiv.classList.add("gifts");
        cadeauxDiv.innerHTML = `
        <div class = "gifts-des">
            <h2>🎁 Récompenses du mois de ${mois} 🎁</h2>
            <p><b>🥇 1er :</b> ${recompenses[0]}<br><b>🥈 2ème :</b> ${recompenses[1]}<br><b>🥉 3ème :</b> ${recompenses[2]}</p>
        </div>
        `
        container.appendChild(cadeauxDiv);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");
        infoDiv.innerHTML = `<p class="description">Le classement est figé.</p>`;
        container.appendChild(infoDiv);

        users.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            }
            return b.level - a.level;
        });

        users.forEach((user, index) => {

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
            img.src = user.profil ? user.profil : "https://media.licdn.com/dms/image/v2/D5612AQHt-Y26_Im7IA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1714463825421?e=2147483647&v=beta&t=xv9clrh7m49h5p5l0wtCCluyzDp4pIadvSXh2tU-xhE";
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
            levelDiv.innerHTML = `<p>NIVEAU ${user.level}</p><p>XP: ${user.xp}</p><p>XP nécessaire : ${xpNecessairePourNiveau(user.level)}</p>`;

            mainDiv.appendChild(detailsDiv);
            mainDiv.appendChild(levelDiv);

            const progressDiv = document.createElement("div");
            progressDiv.classList.add("user-progress");
            const xpPercentage = Math.min((user.xp / xpNecessairePourNiveau(user.level)) * 100, 100);
            progressDiv.innerHTML = `
                <div class="progress-bar">
                    <div class="progress" style="width: ${xpPercentage}%;"><b>${Math.floor(xpPercentage)}%</b> <i>(${user.xp}XP/${xpNecessairePourNiveau(user.level)}XP)</i></div>
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

fetchUsersSaison()