import './Player.css';
import Details from '../Details/Details';
import { usePlayerStore } from '../../store/store';

export default function Player ({ playerId }) {
  
  if (!playerId) return <div>BYE</div>;
  const { getPlayerById } = usePlayerStore();
  const player = getPlayerById(playerId);
  return (
    <div className='player'>
      <Details details={[player.rating, player.location, player.club]} />
      <span className='player-name'>{player.name}</span>
    </div>
  );
};