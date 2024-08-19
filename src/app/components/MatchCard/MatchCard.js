import "./MatchCard.css";
import MatchPlayer from "@/app/components/MatchPlayer/MatchPlayer";
import { msStore } from "@/app/store/store";

export default function MatchCard({ mId }) {
    const m = msStore(state => state.ms[mId]);
    const updateScore = msStore(state => state.updateScore);
    return (
        <div className="match-card card">
            <MatchPlayer m={m} mp={m.mps.top} updateScore={updateScore} />
            <MatchPlayer m={m} mp={m.mps.bottom} updateScore={updateScore} />
        </div>
    );
};