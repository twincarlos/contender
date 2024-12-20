import "./Scoreboard.css";

export default function Scoreboard({ scores }) {
  return (
    <div className="scoreboard">
      <div className="scores game-scores">
        <span className="game-score score score-1">2</span>
        <span className="game-score score score-2">1</span>
      </div>
      {Object.values(scores).map(({ score1, score2 }, idx) => {
        return (
          <div className="scores" key={idx}>
            <span className="score score-1">{score1}</span>
            <span className="score score-2">{score2}</span>
          </div>
        );
      })}
    </div>
  );
};