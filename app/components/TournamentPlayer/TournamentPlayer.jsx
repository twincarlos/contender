import Details from "../Details/Details";

export default function TournamentPlayer ({ tournamentPlayer }) {
  return (
    <div className="TournamentPlayer">
      <Details details={[tournamentPlayer.rating, tournamentPlayer.location, tournamentPlayer.club]} />
      <span className="tournament-player-name">{tournamentPlayer.name}</span>
    </div>
  );
};