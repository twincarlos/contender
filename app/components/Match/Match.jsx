import Card from '../Card/Card';
import SinglesMatch from './SinglesMatch/SinglesMatch';
import EditableSinglesMatch from './SinglesMatch/EditableSinglesMatch';
import './Match.css';

export default function Match ({ match }) {
  const editable = true;
  if (match.type === 'Singles') {
    return (
      <Card>
        <div className='Match'>
          <div className='match-header'>
          </div>
          { editable ? <EditableSinglesMatch matchId={1} /> : <SinglesMatch match={match} /> }
        </div>
      </Card>
    );
  };
};