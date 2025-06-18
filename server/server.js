import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/player/:username', async (req, res) => {
    const { username } = req.params;

    if (!username.includes('#')) {
        return res.status(400).json({ error: 'Use format Name#Tag' });
    }

    const [name, tag] = username.split('#');

    try {
        // 1. Get PUUID
        const accountRes = await axios.get(
            `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`,
            {
                headers: {
                    'X-Riot-Token': process.env.RIOT_API_KEY
                }
            }
        );

        const { puuid, gameName, tagLine } = accountRes.data;

        // 2. Get MMR (rank) info
        const mmrRes = await axios.get(
            `https://na.api.riotgames.com/val/ranked/v1/mmr/na/${puuid}`,
            {
                headers: {
                    'X-Riot-Token': process.env.RIOT_API_KEY
                }
            }
        );

        const mmr = mmrRes.data;

        res.json({
            name: gameName,
            tag: tagLine,
            puuid,
            rank: mmr.currenttierpatched,
            rr: mmr.ranking_in_tier,
            mmrChange: mmr.mmr_change_to_last_game
        });
    } catch (err) {
        console.error('Riot API error:', err.response?.status, err.response?.data);
        res.status(err.response?.status || 500).json({ error: 'Riot API error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
