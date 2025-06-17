import TeamPanel from './TeamPanel';
import players from '../data/players';
import './MatchScreen.css';

export default function MatchScreen() {
    const blueTeam = players.filter(p => p.team === 'Blue');
    const redTeam = players.filter(p => p.team === 'Red');

    return (
        <div className="match-screen">
            <TeamPanel teamName="Defending" teamColor="blue" players={blueTeam} />

            <div className="vs-section">
                <h2 className="map-name">ASCENT</h2>
                <p className="vs-text">VS</p>
                <p className="mode">COMPETITIVE</p>
            </div>

            <TeamPanel teamName="Attacking" teamColor="red" players={redTeam} />
        </div>
    );
}
