import "./Draw.css";
import { dmsStore } from "@/app/store/store";
import DrawRound from "../DrawRound/DrawRound";

export default function Draw() {
    const dms = dmsStore(state => state.dms);
    return (
        <section className="draw">
            { Object.keys(dms).sort((a, b) => b - a).map(round => <DrawRound key={round} round={round} />) }
        </section>
    );
};