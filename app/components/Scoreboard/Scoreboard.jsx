import "./Scoreboard.css";

export default function Scoreboard({ scores, matchScore }) {
  return (
    <div className="Scoreboard">
      <div className="scores game-scores">
        <span className="game-score score score-1">{matchScore.score1}</span>
        <span className="game-score score score-2">{matchScore.score2}</span>
      </div>
      {Object.values(scores).map((score, idx) => {
        return (
          <div className="scores" key={idx}>
            <span className="score">{scores[idx + 1].score1}</span>
            <span className="score">{scores[idx + 1].score2}</span>
          </div>
        );
      })}
    </div>
  );
};