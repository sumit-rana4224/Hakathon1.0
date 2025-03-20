require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const cron = require('node-cron');


const app = express();
const port = process.env.PORT || 3002;
const DATA_FILE_PATH = path.join(__dirname, 'gdp-data.json');

app.use(cors());
app.use(express.static('public'));

async function fetchData() {
    try {
        const apiUrl = process.env.WORLD_BANK_API_URL;
        console.log('Fetching data from:', apiUrl);
        
        if (!apiUrl) {
            console.error('Error: WORLD_BANK_API_URL is not defined in .env');
            return;
        }
        
        const response = await axios.get(apiUrl);
        const data = response.data[1];
        
        if (!Array.isArray(data)) {
            console.error("Error: response.data[1] is not an array");
            return;
        }
        
        const gdpData = data
            .filter((item) => item.value !== null)
            .map((item) => ({ date: item.date, value: item.value }));
        
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(gdpData, null, 2));
        console.log('✅ GDP data fetched and saved successfully.');
    } catch (error) {
        console.error('❌ Error fetching data:', error.message);
    }
}

cron.schedule('0 0 * * *', fetchData);
console.log(`⏳ Scheduled task to run daily at midnight.`);

app.get('/gdp', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read GDP data file.' });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    fetchData();
});
