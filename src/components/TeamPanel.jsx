import PlayerCard from './PlayerCard';
import './TeamPanel.css';

export default function TeamPanel({ teamName, teamColor, players }) {
    return (
        <div className={`team-panel ${teamColor}`}>
            {players.map((player, index) => (
                <PlayerCard key={index} player={player} />
            ))}
        </div>
    );
}
