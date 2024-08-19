import "./GroupCard.css";
import MatchCard from "@/app/components/MatchCard/MatchCard";

export default function GroupCard({ eg }) {
    return (
        <div className="group-card card">
            <div className="group-header card-header">
                <p>Group {eg.number}</p>
            </div>
            <div className="group-body card-body">
                {
                    eg.gps.map(gp => (
                        <p key={gp.id}>
                            {gp.eps.tps.name}
                        </p>
                    ))
                }
            </div>
            <div className="group-body card-body">
                { eg.gms.map(gm => <MatchCard key={gm.id} m={gm} />) }
            </div>
        </div>
    );
};