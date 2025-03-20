const BASE_URL = "http://localhost:3001"; // Server ka URL

async function fetchGDPData() {
    try {
        const response = await fetch(`${BASE_URL}/gdp/index.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        renderChart(data);
    } catch (error) {
        console.error("❌ Error fetching data:", error);
    }
}

function renderChart(data) {
    const chartDiv = document.getElementById('gdp-chart');
    let table = '<table><tr><th>Date</th><th>Value</th></tr>';
    
    data.forEach(item => {
        table += `<tr><td>${item.date}</td><td>${item.value}</td></tr>`;
    });

    table += '</table>';
    chartDiv.innerHTML = table;
}

// ✅ Page load hone ke baad data fetch karega
document.addEventListener("DOMContentLoaded", fetchGDPData);
