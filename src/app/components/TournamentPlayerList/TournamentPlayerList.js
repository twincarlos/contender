import "./TournamentPlayerList.css";
import PlayerCard from "../PlayerCard/PlayerCard";

export default function TournamentPlayerList({ tps }) {
    return (
        <section className="player-list-section">
            <div className="player-list">
                {Object.values(tps).map(tp => <PlayerCard key={tp.id} tp={tp} />)}
            </div>
        </section>
    );
};