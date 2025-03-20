document.addEventListener("DOMContentLoaded", function () {
    const stockTableBody = document.querySelector("#stock-table tbody");
    const searchInput = document.querySelector("#search");
    const watchlist = document.querySelector("#watchlist");
    const stockInfo = document.querySelector("#stock-info");
    const gdpChartCanvas = document.getElementById("gdp-chart");
    let gdpChart;

    let stocks = [
        { name: "AAPL", price: 150, change: 1.2 },
        { name: "GOOGL", price: 2800, change: -0.5 },
        { name: "AMZN", price: 3400, change: 2.1 }
    ];

    function addStockToTable(stock) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${stock.name}</td>
            <td>$${stock.price}</td>
            <td class="${stock.change >= 0 ? 'positive' : 'negative'}">${stock.change}%</td>
            <td>
                <button class="add">Add</button>
            </td>
        `;
        row.querySelector(".add").addEventListener("click", function () {
            addToWatchlist(stock);
        });
        stockTableBody.appendChild(row);
    }

    function addToWatchlist(stock) {
        const li = document.createElement("li");
        li.innerHTML = `${stock.name} - $${stock.price} <button class="remove">Remove</button>`;
        li.querySelector(".remove").addEventListener("click", function () {
            li.remove();
        });
        watchlist.appendChild(li);
    }

    function filterStocks() {
        const searchValue = searchInput.value.toLowerCase();
        stockTableBody.innerHTML = "";
        stocks.forEach(stock => {
            if (stock.name.toLowerCase().includes(searchValue)) {
                addStockToTable(stock);
            }
        });
    }

    function fetchGDPData() {
        fetch("http://localhost:3001/gdp")
            .then(response => response.json())
            .then(data => {
                renderGDPChart(data);
            })
            .catch(error => console.error("Error fetching GDP data:", error));
    }

    function renderGDPChart(data) {
        const ctx = gdpChartCanvas.getContext("2d");
        if (gdpChart) gdpChart.destroy();

        gdpChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: data.map(item => item.date),
                datasets: [{
                    label: "GDP (in USD)",
                    data: data.map(item => item.value),
                    borderColor: "blue",
                    borderWidth: 2
                }]
            }
        });
    }

    stocks.forEach(addStockToTable);
    searchInput.addEventListener("input", filterStocks);
    fetchGDPData();
});
