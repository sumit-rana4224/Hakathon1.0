async function fetchGDPData() {
    try {
        const response = await fetch('http://localhost:3005/gdp'); // Replace with your server's URL
        if (!response.ok) {
            throw new Error('Failed to fetch GDP data');
        }
        const gdpData = await response.json();

        // Get the list element
        const gdpDataList = document.getElementById('gdpDataList');

        // Clear any existing content
        gdpDataList.innerHTML = '';

        // Populate the list with fetched data
        gdpData.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${item.year}:</strong> ${item.gdp.toLocaleString()} USD`;
            gdpDataList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching GDP data:', error);
    }
}

// Call the function to fetch and display data
fetchGDPData();