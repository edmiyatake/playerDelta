import players from './data/players';

export default function App() {
  const blueTeam = players.filter(p => p.team === "Blue");
  const redTeam = players.filter(p => p.team === "Red");

  return (
    <div>
      <h1>PlayerDelta</h1>
      <h2>Blue Team</h2>
      <ul>
        {blueTeam.map((player, index) => (
          <li key={index}>{player.name} - {player.agent}</li>
        ))}
      </ul>

      <h2>Red Team</h2>
      <ul>
        {redTeam.map((player, index) => (
          <li key={index}>{player.name} - {player.agent}</li>
        ))}
      </ul>
    </div>
  );
}
