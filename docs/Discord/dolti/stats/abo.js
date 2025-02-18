async function abos() {
    try {
        let response = await fetch("https://dolti.glitch.me/statistiques");
        let data = await response.json();
        let fullData = data.filter(entry => entry.type !== "vues" && entry.time !== "1738692421274");
        let filteredData = fullData.slice(-50);
        return { filteredData, fullData };
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return { filteredData: [], fullData: [] };
    }
}

function formatDate(timestamp) {
    let date = new Date(parseInt(timestamp));
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = String(date.getFullYear()).slice(-2);
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

async function updateGraph() {
    let { filteredData } = await abos();
    let labels = filteredData.map(entry => formatDate(entry.time));
    let aboData = filteredData.map(entry => parseInt(entry.nbm));
    let minAbos = Math.min(...aboData);
    let maxAbos = Math.max(...aboData);

    let lastTimestamp = filteredData[filteredData.length - 1]?.time || "Aucun";

    document.getElementById("lastScan").innerText = formatDate(lastTimestamp);
    document.getElementById("maxAbos").innerText = maxAbos;

    let ctx = document.getElementById('abos').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Abonnés',
                data: aboData,
                borderColor: "rgba(255, 215, 0)",
                backgroundColor: 'rgba(255, 215, 0, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: "#FFFFFF" }, grid: { color: "#FFFFFF" } },
                y: { min: minAbos, max: maxAbos, ticks: { color: "#FFFFFF" }, grid: { color: "#FFFFFF" } }
            },
            plugins: {
                legend: { labels: { color: "#FFFFFF" } }
            }
        }
    });
}

async function populateDateSelect() {
    let { fullData } = await abos();
    let dateSelect = document.getElementById("dateSelect");
    dateSelect.innerHTML = "";

    fullData.forEach(entry => {
        let option = document.createElement("option");
        option.value = entry.time;
        option.textContent = formatDate(entry.time);
        dateSelect.appendChild(option);
    });
}

async function searchDate() {
    let { fullData } = await abos();
    let selectedTime = document.getElementById("dateSelect").value;
    let foundEntry = fullData.find(entry => entry.time === selectedTime);

    if (foundEntry) {
        document.getElementById("searchResult").innerText =
            `📅 Le ${formatDate(foundEntry.time)}, Dolti avait ${foundEntry.nbm} abonnés.`;
    } else {
        document.getElementById("searchResult").innerText =
            "❌ Aucune donnée trouvée pour cette date.";
    }
}

async function last24hours() {
    let { fullData } = await abos();
    let filteredData = fullData.slice(-24);

    console.log(filteredData[0], filteredData[filteredData.length - 1])

    let difference = filteredData[filteredData.length - 1].nbm - filteredData[0].nbm

    const date1 = new Date(Number(filteredData[0].time));
    const date2 = new Date(Number(filteredData[filteredData.length - 1].time));
    
    const diffInMilliseconds = date2 - date1;
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    
    document.getElementById("lastHours").innerText = diffInHours;
    document.getElementById("aboLastHours").innerText = difference;
    document.getElementById("timeLastHours").innerText = `(Depuis le ${formatDate(filteredData[0].time)})`
}

last24hours()


window.onload = async function () {
    await populateDateSelect();
    await updateGraph();
};
