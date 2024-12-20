import Details from '../Details/Details';
import './Player.css';

export default function Player ({ player }) {
  if (!player) return <div>BYE</div>
  return (
    <div className='player'>
      <Details details={[player.rating, player.location, player.club]} />
      <span className='player-name'>{player.name}</span>
    </div>
  );
};