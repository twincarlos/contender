import Score from "../Score/Score";
import "./Scoreboard.css";

export default function Scoreboard({ playerId1, playerId2, matchBestOf }) {
  function buildArray() {
    const arr = [];
    for (let i = 1; i <= matchBestOf; i++) arr.push(i);
    return arr;
  };
  const arr = buildArray();
  return (
    <div className="scoreboard">
      <div className="scores game-scores">
        <span className="game-score score score-1">2</span>
        <span className="game-score score score-2">1</span>
      </div>
      {arr.map((n) => {
        return (
          <div className="scores" key={n}>
            <Score playerId={playerId1} gameNumber={n} />
            <Score playerId={playerId2} gameNumber={n} />
          </div>
        );
      })}
    </div>
  );
};