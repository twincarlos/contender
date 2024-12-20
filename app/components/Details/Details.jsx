import "./Details.css";

export default function Details({ details }) {
  return (
    <div className="details">
      {details.map((detail, idx) => {
        if (!detail) return null;
        if (idx === 0) return <span key={idx}>{detail}</span>
        return <span key={idx}> • {detail}</span>
      })};
    </div>
  );
};