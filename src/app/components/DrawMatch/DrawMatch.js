import "./DrawMatch.css";
import MatchCard from "../MatchCard/MatchCard";

export default function DrawMatch({ dm }) {
    return (
        <div>
            <MatchCard mId={dm.m.id} />
        </div>
    );
};