import TeamPanel from './TeamPanel';
import players from '../data/players';
import './MatchScreen.css';

export default function MatchScreen() {
    const blueTeam = players.filter(p => p.team === 'Blue');
    const redTeam = players.filter(p => p.team === 'Red');

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
