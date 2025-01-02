import Status from "../Status/Status";
import Details from "../Details/Details";

export default function Tournament({ tournament }) {
  return (
    <div className="Tournament flex flex-direction--column align-items--flex-start gap">
      <Status status={tournament.status} />
      <p>{tournament.name}</p>
      <Details details={[tournament.date]} />
    </div>
  );
};