async function fetchGDPData() {
    try {
        const response = await fetch('http://localhost:3005/gdp');
        if (!response.ok) {
            throw new Error('Failed to fetch GDP data');
        }
        const gdpData = await response.json();

        const gdpDataList = document.getElementById('gdpDataList');
        gdpDataList.innerHTML = '';

        gdpData.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${item.year}:</strong> ${item.gdp.toLocaleString()} USD`;
            gdpDataList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching GDP data:', error);
    }
}

fetchGDPData();
function updatePieChart(gdpData) {
    var ctx = document.getElementById('pieChart').getContext('2d');

    var labels = gdpData.map(item => item.year);
    var data = gdpData.map(item => item.gdp);

    if (window.pieChart) {
        window.pieChart.destroy(); // Destroy old chart before updating
    }

    window.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#FF5733', '#33FF57', '#3357FF', '#F0F033', '#FF33F0',
                    '#33F0FF', '#F033FF', '#57FF33', '#5733FF', '#F033F0'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + ' Trillion USD';
                        }
                    }
                }
            }
        }
    });
}

function addData() {
    var year = document.getElementById('yearInput').value;
    var gdpValue = parseFloat(document.getElementById('gdpInput').value);

    if (year && !isNaN(gdpValue)) {
        if (!window.pieChart) return; // Ensure the chart is loaded

        window.pieChart.data.labels.push(year);
        window.pieChart.data.datasets[0].data.push(gdpValue);
        window.pieChart.update();
    }
}

// Load GDP data when the page loads
document.addEventListener("DOMContentLoaded", fetchGDPData);

