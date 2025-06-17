import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/player/:region/:username', async (req, res) => {
    const { region, username } = req.params;
    const url = `https://public-api.tracker.gg/v2/valorant/standard/profile/${region}/${encodeURIComponent(username)}`;

    try {
        const response = await fetch(url, {
            headers: {
                'TRN-Api-Key': process.env.TRACKER_API_KEY
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch player data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
