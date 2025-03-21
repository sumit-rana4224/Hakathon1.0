// Toggle Report Visibility
function toggleReport(reportId) {
    const report = document.getElementById(reportId);
    report.style.display = report.style.display === 'block' ? 'none' : 'block';
}

// Initialize Pie Chart
const ctx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024 (Estimate)'],
        datasets: [{
            data: [2.09, 2.29, 2.44, 2.69, 2.87, 2.87, 2.94, 3.10, 3.29, 3.46],
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F0F033', '#FF33F0', '#33F0FF', '#F033FF', '#57FF33', '#5733FF', '#F033F0'],
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
                        return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)} Trillion USD`;
                    }
                }
            }
        }
    }
});

// Add Data to Chart
function addData() {
    const year = document.getElementById('yearInput').value;
    const gdpValue = parseFloat(document.getElementById('gdpInput').value);

    if (year && !isNaN(gdpValue)) {
        pieChart.data.labels.push(year);
        pieChart.data.datasets[0].data.push(gdpValue);
        pieChart.update();
    }
}