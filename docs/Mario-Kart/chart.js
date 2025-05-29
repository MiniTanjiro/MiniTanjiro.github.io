const labels = [
    "Super Mario Kart", "Mario Kart 64", "Super Circuit", "Double Dash", "Mario Kart DS",
    "Mario Kart Wii", "MK7", "MK8", "MK8 Deluxe", "Mario Kart World"
];

const ventes = [
    8.76, 7.00, 5.91, 3.76, 23.60, 37.38, 18.99, 8.46, 67.35, 0
];

const ctx = document.getElementById('ventesChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Ventes (en millions)',
            data: ventes,
            backgroundColor: 'rgba(255, 204, 0, 0.8)', 
            borderColor: '#e60012', 
            borderWidth: 2,
            hoverBackgroundColor: '#ffcc00',
            hoverBorderColor: '#222222'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#222222',
                    font: {
                        family: 'Rubik',
                        size: 14
                    }
                }
            },
            tooltip: {
                backgroundColor: '#fff4b2',
                titleColor: '#222222',
                bodyColor: '#222222',
                borderColor: '#e60012',
                borderWidth: 1
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#222222',
                    font: {
                        family: 'Rubik'
                    }
                },
                grid: {
                    color: '#cccccc'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#222222',
                    font: {
                        family: 'Rubik'
                    }
                },
                grid: {
                    color: '#cccccc'
                },
                title: {
                    display: true,
                    text: 'Millions d’exemplaires',
                    color: '#222222',
                    font: {
                        family: 'Rubik',
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        }
    }
});