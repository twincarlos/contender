import "./TournamentList.css";
import TournamentCard from "../TournamentCard/TournamentCard";

export default function TournamentList({ tournaments }) {
    return (
        <section className="tournament-list">
            {tournaments.map(tournament => <TournamentCard tournament={tournament} key={tournament.id} />)}
        </section>
    );
};