const API_BASE_URL = "https://api.paladium.games/v1/paladium/player/profile";
const API_AUTH_TOKEN = "fdecd0b1-a916-4e54-87a9-35d2747ae32d";

// Fonction générique pour effectuer une requête API
async function fetchFromApi(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_AUTH_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    return { error: error.message };
  }
}

async function shopInfo(uuid) {
  try {
    const response = await fetch(`https://api.paladium.games/v1/paladium/shop/market/players/${uuid}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_AUTH_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    return { error: error.message };
  }
}

async function playerInfo(playerName) {
  return fetchFromApi(playerName);
}

async function friends(uuid) {
  return fetchFromApi(`${uuid}/friends`);
}

async function levels(uuid) {
  return fetchFromApi(`${uuid}/jobs`);
}

async function monture(uuid) {
  return fetchFromApi(`${uuid}/mount`);
}

async function pet(uuid) {
  return fetchFromApi(`${uuid}/pet`);
}

async function achievements(uuid) {
  return fetchFromApi(`${uuid}/achievements`);
}

async function displayResult() {
  const username = document.getElementById("username").value;
  const resultContainer = document.getElementById("result-container");

  try {
    const playerData = await playerInfo(username);

    if (playerData.error) {
      resultContainer.textContent = `Erreur : ${playerData.error}`;
      return;
    }

    const [friendsData, levelsData, montureData, petData, shopData, achievementsData] = await Promise.all([
      friends(playerData.uuid),
      levels(playerData.uuid),
      monture(playerData.uuid),
      pet(playerData.uuid),
      shopInfo(playerData.uuid),
      achievements(playerData.uuid),
    ]);

    console.log(playerData, friendsData, levelsData, montureData, petData, shopData, achievementsData);

    const timestamp = new Date(playerData.firstJoin);

    let date = null;

    if(timestamp) {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      date = new Intl.DateTimeFormat('fr-FR', options).format(timestamp)
    }
     
    resultContainer.innerHTML = `
    <p><u>Infos sur le joueur <strong>${username}</strong> :</u></p>
    <p>Alliance : ${playerData.alliance || "Non renseignée"}</p>
    <p>Description : ${playerData.description || "Aucune"}</p>
    <p>A rejoint la première fois le : ${date || "Jamais"}</p>
    <p>Argent : ${playerData.money}$</p>
    <p>Grade : ${playerData.rank}</p>
    <p>Liste des amis : ${friendsData.data.map(player => player.name).join(', ')} (${friendsData.totalCount})</p>
    
    <div class="info-container">
      <p class="toggle-text">
        Voir les infos sur les métiers du joueur
        <span class="arrow">&#x2193;</span> <!-- flèche vers le bas -->
      </p>
      <div class="info-text">
        <p>Alchimiste : Niveau ${levelsData.alchemist?.level || "1"} <i>(${Math.floor(levelsData.alchemist?.xp || 0)} XP)</i></p>
        <p>Fermier : Niveau ${levelsData.farmer?.level || "1"} <i>(${Math.floor(levelsData.farmer?.xp || 0)} XP)</i></p>
        <p>Chasseur : Niveau ${levelsData.hunter?.level || "1"} <i>(${Math.floor(levelsData.hunter?.xp || 0)} XP)</i></p>
        <p>Mineur : Niveau ${levelsData.miner?.level || "1"} <i>(${Math.floor(levelsData.miner?.xp || 0)} XP)</i></p>
        <p><font size="2">Soit ${
          Math.floor(
            (levelsData.alchemist?.xp || 0) +
            (levelsData.farmer?.xp || 0) +
            (levelsData.hunter?.xp || 0) +
            (levelsData.miner?.xp || 0)
          )
        } XP gagnées !</font></p>
      </div>
    </div>

    <div class="info-container">
      <p class="toggle-text">
        Voir les infos sur la monture du joueur
        <span class="arrow">&#x2193;</span> <!-- flèche vers le bas -->
      </p>
      <div class="info-text">
        <p>${montureData.mountType === 0 ? "Aucune" : 
          `
            <p>Type : ${montureData.mountType === 1 ? "Dancarok" : montureData.mountType === 2 ? "Ravirok" : "Tedarok"}</p>
            <p>Dégâts : ${montureData.damage}</p>
            <p>Nourriture : ${montureData.food}</p>
            <p>Pourcentage d'XP partagé : ${montureData.sharedXpPercent}%</p>
            <p>XP total : ${montureData.xp} XP</p>
          `
          }
        </p>
      </div>
    </div>

    <div class="info-container">
      <p class="toggle-text">
        Voir les infos sur le pet du joueur
        <span class="arrow">&#x2193;</span> <!-- flèche vers le bas -->
      </p>
      <div class="info-text">
        <p>${petData.error ? "Aucun" : 
          `
            <p>Skin : ${petData.currentSkin.split('_') .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
            <p>Bonheur : ${petData.happiness}</p>
            <p>XP total : ${petData.experience} XP</p>
            <br>

            <p><u>Skills débloqués</u></p>
            <p>${
              Array.isArray(petData.skills)
              ? petData.skills.map(skill => `<p>${skill.id.split('_') .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} <i>(Débloqué le ${new Intl.DateTimeFormat('fr-FR', {year: 'numeric',month: '2-digit',day: '2-digit'}).format(new Date(skill.lastChange))}</i>)</p>`).join('')
              : "Aucun skill trouvé."
            }</p>
          `
          }
        </p>
      </div>
    </div>

    <div class="info-container">
      <p class="toggle-text">
        Voir les infos sur le shop du joueur
        <span class="arrow">&#x2193;</span> <!-- flèche vers le bas -->
      </p>
      <div class="info-text">
        <p>${shopData.totalCount === 0 ? "Aucun item en vente par le joueur" : 
          `
            <p><i>Nombre d'items en vente : ${shopData.totalCount}</i></p>
            <p>${
              Array.isArray(shopData.data)
              ? shopData.data.map(shop => `<p>Item : ${shop.item.name} x${shop.item.quantity}</p><p>Prix : ${shop.price}$ / ${shop.pricePb}PB</p>`).join('<br>')
              : "Aucun item au shop trouvé."
            }</p>
          `
          }
        </p>
      </div>
    </div>
  `;

  document.querySelectorAll('.toggle-text').forEach(toggle => {
    toggle.addEventListener('click', function () {
      const container = this.closest('.info-container'); 
      const infoText = container.querySelector('.info-text'); 
  
      container.classList.toggle('open');
      
      const arrow = container.querySelector('.arrow');
      if (container.classList.contains('open')) {
        arrow.style.transform = "rotate(180deg)"; 
      } else {
        arrow.style.transform = "rotate(0deg)"; 
      }
  
      if (container.classList.contains('open')) {
        infoText.style.display = "block"; 
      } else {
        infoText.style.display = "none";
      }
    });
  });

  } catch (e) {}
}
