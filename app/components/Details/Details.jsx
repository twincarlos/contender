export default function Details({ details }) {
  return (
    <div className="Details">
      {details.map((detail, idx) => {
        if (detail === null || detail === undefined) return null;
        if (idx === 0) return <span className="detail caption" key={idx}>{detail}</span>
        return <span className="detail caption" key={idx}> • {detail}</span>
      })}
    </div>
  );
};