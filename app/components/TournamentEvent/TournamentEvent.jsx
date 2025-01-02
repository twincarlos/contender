import Details from "../Details/Details";
import Status from "../Status/Status";

export default function TournamentEvent ({ tournamentEvent }) {
    return (
        <div className="Event flex flex-direction--column align-items--flex-start">
            <Status status={tournamentEvent.status} />
            <span>{tournamentEvent.name}</span>
            <Details details={[tournamentEvent.date, tournamentEvent.time]} />
        </div>
    );
};