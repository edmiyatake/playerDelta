import './PlayerCard.css';

export default function PlayerCard({ player }) {
    return (
        <div className="player-card">
            <img
                className="agent-img"
                src={`/assets/agents/${player.agent.toLowerCase()}.png`}
                alt={player.agent}
            />
            <div className="player-info">
                <h4 className="player-name">{player.name}</h4>
                <p className="player-stats">
                    {player.agent} • {player.rank}
                </p>
                <p className="player-stats">
                    KDA: {player.kda} | Win Rate: {player.winRate} | HS: {player.hs}
                </p>
            </div>
        </div>
    );
}