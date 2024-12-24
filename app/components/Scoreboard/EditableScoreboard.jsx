import updateMatchScoreAndStatus from './updateMatchScoreAndStatus';

export default function EditableScoreboard({ match, setMatch }) {
  return (
    <div className="scoreboard">
      <div className="scores game-scores">
        <span className="game-score score score-1">
          {match.matchScore.score1}
        </span>
        <span className="game-score score score-2">
          {match.matchScore.score2}
        </span>
      </div>
      {Object.values(match.scores).map((score, idx) => {
        return (
          <div className="scores" key={idx}>
            <input
              className="score"
              type="number"
              min={0}
              value={match.scores[idx + 1].score1}
              onChange={(e) =>
                updateMatchScoreAndStatus({
                  score: Number(e.target.value),
                  playerNumber: 1,
                  gameNumber: idx + 1,
                  match,
                  setMatch,
                })
              }
            />
            <input
              className="score"
              type="number"
              min={0}
              value={match.scores[idx + 1].score2}
              onChange={(e) =>
                updateMatchScoreAndStatus({
                  score: Number(e.target.value),
                  playerNumber: 2,
                  gameNumber: idx + 1,
                  match,
                  setMatch,
                })
              }
            />
          </div>
        );
      })}
    </div>
  );
};