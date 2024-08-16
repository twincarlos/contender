import "./TournamentList.css";
import TournamentCard from "../TournamentCard/TournamentCard";

export default function TournamentList({ ts }) {
    return (
        <section className="tournament-list">
            {ts.map(t => <TournamentCard t={t} key={t.id} />)}
        </section>
    );
};