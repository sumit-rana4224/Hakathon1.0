require('dotenv').config();
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const cron = require('node-cron');

const API_URL = "https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key=14776393dfc245b46ebcd998f3fc3591&file_type=json";
const DATA_FILE_PATH = path.join(__dirname, 'inflation-data.json');

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
    })).filter(item => item.value !== null); // Filter out missing values

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(inflationData, null, 2));
    console.log(`✅ Inflation data saved successfully to ${DATA_FILE_PATH}`);
  } catch (error) {
    console.error('❌ Error fetching data:', error.message);
    if (error.response) {
      console.error('📢 API Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Schedule daily data fetching at midnight
cron.schedule('0 0 * * *', fetchData);

console.log('⏳ Scheduled task to run daily at midnight');
fetchData(); // Run immediately
