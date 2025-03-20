require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express(); // 🔥 Pehle app ko initialize kar
const port = process.env.PORT || 3001;

app.use(cors()); // ✅ Ab CORS use karo
app.use(express.json()); // ✅ JSON handling bhi add kar

app.get('/gdp/index.html', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'gdp-data.json');
        const data = await fs.readFile(filePath, 'utf8');

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            res.status(500).json({ error: 'Failed to parse GDP data.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read GDP data file.' });
    }
});

app.listen(port, () => {
    console.log(`✅ Server listening on port ${port}`);
});
