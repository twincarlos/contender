import Card from '../Card/Card';
import Player from '../Player/Player';
import Scoreboard from '../Scoreboard/Scoreboard';
import Status from '../Status/Status';
import './Match.css';

export default function Match ({ match }) {
  if (match.type === 'Singles') {
    return (
      <Card>
        <div className='match'>
          <div className='match-header'>
            <Status status={match.status} />
          </div>
          <SinglesMatch match={match} />
        </div>
      </Card>
    );
  };
};

function SinglesMatch ({ match }) {
  return (
    <div className='singles-match'>
      <Player player={match.players.player1} />
      <Scoreboard scores={match.scores} />
      <Player player={match.players.player2} />
    </div>
  );
};