import "./DrawMatchList.css";
import { dmsStore } from "@/app/store/store";
import MatchCard from "../MatchCard/MatchCard";

export default function DrawMatchList({ round, minHeight }) {
    const drawRound = dmsStore(state => state.dms[round]);
    return (
        <div style={{ minHeight }} className="draw-match-list">
            {Object.values(drawRound).map(dm => <MatchCard key={dm.id} mId={dm.m.id} dm={dm} />)}
        </div>
    );
};