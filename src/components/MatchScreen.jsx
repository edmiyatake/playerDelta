import { useEffect, useState } from 'react';
import TeamPanel from './TeamPanel';
import './MatchScreen.css';

export default function MatchScreen() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const usernames = [
        { region: 'na', id: 'Coree#NA2', team: 'Blue' },
        { region: 'na', id: 'Sleepy#jimin', team: 'Blue' },
        { region: 'na', id: 'lina#na1', team: 'Blue' },
        { region: 'na', id: 'sam#na1', team: 'Blue' },
        { region: 'na', id: 'maya#na1', team: 'Blue' },
        { region: 'na', id: 'tom#na1', team: 'Red' },
        { region: 'na', id: 'jin#na1', team: 'Red' },
        { region: 'na', id: 'alina#na1', team: 'Red' },
        { region: 'na', id: 'chris#na1', team: 'Red' },
        { region: 'na', id: 'ivy#na1', team: 'Red' },
    ];

    useEffect(() => {
        async function fetchAllPlayers() {
            try {
                const responses = await Promise.all(
                    usernames.map(async ({ region, id, team }) => {
                        try {
                            const encodedId = encodeURIComponent(id);
                            const res = await fetch(`http://localhost:3001/api/player/${region}/${encodedId}`);
                            const data = await res.json();

                            const player = data.data;
                            const current = player.current_data || {};

                            return {
                                name: `${player.name}#${player.tag}`,
                                rank: current.currenttierpatched || 'Unranked',
                                elo: current.elo ?? '-',
                                rr: current.ranking_in_tier ?? '-',
                                mmrDiff: current.mmr_change_to_last_game ?? 0,
                                team,
                            };
                        } catch (err) {
                            console.error(`Error fetching stats for ${id}`, err);
                            return {
                                name: id,
                                rank: 'N/A',
                                elo: '-',
                                rr: '-',
                                mmrDiff: '-',
                                team,
                            };
                        }
                    })
                );
                setPlayers(responses);
            } catch (err) {
                setError('Failed to load player stats');
            } finally {
                setLoading(false);
            }
        }

        fetchAllPlayers();
    }, []);

    const blueTeam = players.filter(p => p.team === 'Blue');
    const redTeam = players.filter(p => p.team === 'Red');

    if (loading) return <p>Loading match data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="match-screen">
            <div className="map-header">
                <h2 className="map-name">ASCENT</h2>
            </div>

            <TeamPanel teamName="Defending" teamColor="blue" players={blueTeam} />

            <div className="vs-section">
                <p className="vs-text">VS</p>
                <p className="mode">COMPETITIVE</p>
            </div>

            <TeamPanel teamName="Attacking" teamColor="red" players={redTeam} />
        </div>
    );
}
