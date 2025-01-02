export default function Details({ details }) {
  const allDetails = details.filter(detail => detail !== null && detail !== undefined);
  if (allDetails.length === 0) return null;
  return (
    <div className="Details">
      {allDetails.map((detail, idx) => {
        return (
          <span
            key={idx}
            className="detail caption"
          >
            {`${detail}${idx < allDetails.length - 1 ? " • " : ""}`}
          </span>
        )
      })}
    </div>
  );
};