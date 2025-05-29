async function sidebar(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("Fichier introuvable : " + path);
        const html = await response.text();
        document.getElementById('sidebar').innerHTML = html;
    } catch (err) {
        console.warn(`Échec de chargement de ${path}, tentative suivante...`, err);
        if (path !== "../sidebar.html") {

            sidebar("../sidebar.html");
        } else {
            console.error("Impossible de charger la sidebar.", err);
        }
    }

}

sidebar("sidebar.html");

document.getElementById('toggleSidebar')?.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-hidden');
});

async function setInfos(path) {
    if(!path || path.length <= 0) return;
    const infos = document.getElementById("informations");

    const res = await fetch("../infos.json");
    if (!res.ok) {
        return;
    }

    const json = await res.json();

    infos.innerHTML = `
    <ul>
        <li>
            
            <strong>Console :</strong> ${json[path].console}
                    
        </li>
                    
        <li>

            
            <strong>Date d'annonce :</strong> ${json[path].annonce}
        </li>

        <li>

            
            <strong>Date de sortie :</strong> ${json[path].sortie}
        </li>

        <li>

            
            <strong>Nombre d'exemplaires vendus :</strong> ${json[path].ventes}
        </li>
    </ul>`
}

document.addEventListener('DOMContentLoaded', () => {
    const fullPath = window.location.pathname;

    const lastSlashIndex = fullPath.lastIndexOf('/');

    if (lastSlashIndex !== -1) {
        const directoryPath = fullPath.substring(0, lastSlashIndex + 1);
        setInfos(directoryPath.replaceAll("/", ""))
    }
});

