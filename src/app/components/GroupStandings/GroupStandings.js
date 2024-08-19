"use client";
import "./GroupStandings.css";
import PlayerCard from "../PlayerCard/PlayerCard";

export default function GroupStandings({ gps }) {
    return (
        <div className="group-standings">
            {gps.map(gp => (
                <div className="group-player-standing">
                    <PlayerCard key={gp.id} tp={gp.ep.tp} />
                    <div className="group-player-stats">
                        <p>0 - 0</p>
                        <p>#1</p>
                    </div>
                </div>
            ))}
        </div>
    );
};