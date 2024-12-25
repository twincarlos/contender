import './Details.css';

export default function Details({ details }) {
  return (
    <div className='Details'>
      {details.map((detail, idx) => {
        if (!detail) return null;
        if (idx === 0) return <span className='detail caption' key={idx}>{detail}</span>
        return <span className='detail caption' key={idx}> • {detail}</span>
      })}
    </div>
  );
};