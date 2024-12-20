import './Score.css';
import { useScoreStore } from '../../store/store';

export default function Score ({ playerId, gameNumber }) {
  const { getGameScore } = useScoreStore();
  const score = getGameScore(playerId, gameNumber);
  return (
    <span className="score score-1">{score}</span>
  );
};