const BASE_URL = "http://localhost:3002"; // Backend ka URL

async function fetchGDPData() {
    try {
        const response = await fetch(`${BASE_URL}/gdp`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error("Error fetching GDP data:", error);
    }
}

function renderTable(data) {
    const chartDiv = document.getElementById("gdp-chart");
    let table = "<table><tr><th>Date</th><th>GDP Value</th></tr>";

    data.forEach(item => {
        table += `<tr><td>${item.date}</td><td>$${item.value.toLocaleString()}</td></tr>`;
    });

    table += "</table>";
    chartDiv.innerHTML = table;
}

// Fetch data on page load
fetchGDPData();
