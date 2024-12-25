import Player from '../../Player/Player';
import Scoreboard from '../../Scoreboard/Scoreboard';
import Status from '../../Status/Status';

export default function SinglesMatch({ match }) {
  return (
    <div className='SinglesMatch'>
      <Status status={match.status} />
      <Player player={match.players.player1} />
      <Scoreboard scores={match.scores} matchScore={match.matchScore} />
      <Player player={match.players.player2} />
    </div>
  );
};