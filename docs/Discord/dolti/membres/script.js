
async function renderProfiles() {
    const container = document.getElementById('profiles-container');
    
    const response = await fetch('./moderateurs.json');
    const data = await response.json();

    for (let groupName in data) {
        const group = data[groupName];
        
        const groupElement = document.createElement('div');
        groupElement.classList.add('profile-group');
        
        const title = document.createElement('h3');
        title.textContent = groupName;
        groupElement.appendChild(title);
        
        for (let username in group) {
            const profileData = group[username];
            
            const profileElement = document.createElement('div');
            profileElement.classList.add('profile');
            
            const avatarDiv = document.createElement('div');
            avatarDiv.classList.add('user-avatar');
        
            
            const profilePhoto = document.createElement('img');
            profilePhoto.src = profileData.photo === '-' ? 'https://via.placeholder.com/50' : profileData.photo;
            profilePhoto.alt = `${username} Photo`;
            profilePhoto.classList.add('profile-photo');
            avatarDiv.appendChild(profilePhoto);
            
            profileElement.appendChild(avatarDiv);
            
            const nameDiv = document.createElement('div');
            nameDiv.classList.add('user-name');
            nameDiv.innerHTML = `<h4>${profileData.name}</h4><p class="user-username">@${profileData.username}</p>`;
            profileElement.appendChild(nameDiv);
            
            groupElement.appendChild(profileElement);
        }
        
        container.appendChild(groupElement);
    }
}

async function members() {
    const container = document.getElementById('membres-container');
    
    try {
        const response = await fetch("https://dolti.glitch.me/members");
        
        if (!response.ok) {
            throw new Error('Problème avec la récupération des données');
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
            throw new Error('Les données ne sont pas sous forme de tableau');
        }

        const groupElement = document.createElement('div');
        groupElement.classList.add('profile-group');
                
        data.forEach(profileData => {
            const profileElement = document.createElement('div');
            profileElement.classList.add('profile');
            
            const avatarDiv = document.createElement('div');
            avatarDiv.classList.add('user-avatar');
            
            const profilePhoto = document.createElement('img');
            profilePhoto.src = profileData.photo === '-' ? 'https://via.placeholder.com/50' : profileData.photo;
            profilePhoto.alt = `${profileData.username} Photo`;
            profilePhoto.classList.add('profile-photo');
            avatarDiv.appendChild(profilePhoto);
            
            profileElement.appendChild(avatarDiv);
            
            const nameDiv = document.createElement('div');
            nameDiv.classList.add('user-name');
            nameDiv.innerHTML = `<h4>${profileData.name}</h4><p class="user-username">@${profileData.username}</p>`;
            profileElement.appendChild(nameDiv);
            
            groupElement.appendChild(profileElement);
        });

        container.appendChild(groupElement);
        
        document.getElementById("memberCount").innerText = data.length;

    } catch (error) {
        console.error('Erreur :', error);
        container.innerHTML = 'Impossible de charger les membres.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProfiles();
    members();
});
