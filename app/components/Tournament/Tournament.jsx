import Link from "next/link";
import Details from "../Details/Details";
import Card from "../Card/Card";
import Status from "../Status/Status";

export default function Tournament ({ tournament }) {
  return (
    <Link href={`/tournament/${tournament.id}`} className="Tournamnet">
      <Card>
        <div className="flex flex-direction--column align-items--flex-start gap">
          <Status status={tournament.status} />
          <p>{tournament.name}</p>
          <Details details={[tournament.date]} />
        </div>
      </Card>
    </Link>
  );
};