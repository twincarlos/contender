import "./EventPlayerList.css";
import { epsStore } from "@/app/store/store";
import PlayerCard from "../PlayerCard/PlayerCard";

export default function EventPlayerList() {
    const eps = epsStore(state => state.eps);

    return (
        <section className="player-list-section">
            <div className="player-list">
                {Object.values(eps).map(ep => <PlayerCard key={ep.id} tp={ep.tp} />)}
            </div>
        </section>
    );
};