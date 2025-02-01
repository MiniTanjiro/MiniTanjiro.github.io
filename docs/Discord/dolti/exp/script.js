function xpNecessairePourNiveau(niveau) {
    const a = 50;   
    const b = 1.5; 
    return Math.floor(a * Math.pow(b, niveau)); 
}

function createBubble(container) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    bubble.style.left = Math.floor(Math.random() * 100) + "%";
    bubble.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(bubble);
}

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
            levelDiv.innerHTML = `<p>NIVEAU ${user.level}</p><p>XP: ${user.xp}</p>`;

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
