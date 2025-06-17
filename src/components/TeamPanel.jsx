import PlayerCard from './PlayerCard';
import './TeamPanel.css'; // optional for styling

export default function TeamPanel({ teamName, teamColor, players }) {
    return (
        <div className={`team-panel ${teamColor}`}>
            {players.map((player, index) => (
                <PlayerCard key={index} player={player} />
            ))}
        </div>
    );
}
