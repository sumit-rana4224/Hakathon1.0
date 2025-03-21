require('dotenv').config();
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE_PATH = path.join(__dirname, 'inflation-data.json');

const API_URL = "https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key=14776393dfc245b46ebcd998f3fc3591&file_type=json";

// Middleware
app.use(cors());

// Fetch Data from API
async function fetchData() {
  try {
    console.log('⏳ Fetching Inflation Data from FRED API...');

    const response = await axios.get(API_URL);

    if (!response.data || !response.data.observations) {
      console.error('❌ Error: Invalid response data from API');
      return;
    }

    const inflationData = response.data.observations.map(item => ({
      date: item.date,
      value: item.value !== "." ? parseFloat(item.value) : null
    })).filter(item => item.value !== null);

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(inflationData, null, 2));
    console.log(`✅ Inflation data saved successfully.`);
  } catch (error) {
    console.error('❌ Error fetching data:', error.message);
    if (error.response) {
      console.error('📢 API Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Schedule Data Fetching (Runs Every 24 Hours)
cron.schedule('0 0 * * *', fetchData);
fetchData(); // Run immediately on startup

// API Endpoint to Get Inflation Data
app.get('/api/inflation', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to read Inflation Data.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
