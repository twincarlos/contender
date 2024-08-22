import "./MatchList.css";
import MatchCard from "../MatchCard/MatchCard";

export default function MatchList({ ms }) {
    return (
        <div className="match-list">
            { ms.map(m => <MatchCard key={m.id} egId={m.eventGroupId} mId={m.matchId || m.id} />) }
        </div>
    )
};