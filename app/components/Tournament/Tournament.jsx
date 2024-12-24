import './Tournament.css';

export default function Tournament ({ tournament }) {
  return (
    <div className='tournament'>
      <p>{tournament.name}</p>
    </div>
  );
};