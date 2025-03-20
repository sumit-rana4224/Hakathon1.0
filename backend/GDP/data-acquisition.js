require('dotenv').config();
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const cron = require('node-cron');

const DATA_FILE_PATH = path.join(__dirname, 'gdp-data.json');

async function fetchData() {
  try {
    const apiUrl = process.env.WORLD_BANK_API_URL;
    console.log('Fetching data from:', apiUrl);

    if (!apiUrl) {
      console.error('Error: WORLD_BANK_API_URL is not defined in .env');
      return;
    }

    const response = await axios.get(apiUrl);

    if (!response.data || !Array.isArray(response.data)) {
      console.error('Error: Invalid response data from API');
      return;
    }

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
    if (error.response) {
      console.error('📢 API Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Schedule data fetching (customizable via .env, default: daily at midnight)
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '0 0 * * *';
cron.schedule(CRON_SCHEDULE, fetchData);

console.log(`⏳ Scheduled task to run at: ${CRON_SCHEDULE}`);

// Fetch data immediately when the script starts
fetchData();
