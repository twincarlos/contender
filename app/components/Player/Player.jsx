import './Player.css';
import Details from '../Details/Details';

export default function Player ({ player }) {
  if (!player) return <div>BYE</div>;
  
  return (
    <div className='Player'>
      <Details details={[player.rating, player.location, player.club]} />
      <span className='player-name'>{player.name}</span>
    </div>
  );
};