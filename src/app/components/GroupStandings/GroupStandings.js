"use client";
import "./GroupStandings.css";
import PlayerCard from "../PlayerCard/PlayerCard";
import { epsStore } from "@/app/store/store";

export default function GroupStandings({ gps }) {
    const eps = epsStore(state => state.eps);
    return (
        <div className="group-standings">
            {gps.map(gp => {
                const ep = eps[gp.eventPlayerId];
                return (
                    <div key={gp.id} className="group-player-standing">
                        <PlayerCard tp={ep.tp} />
                        <div className="group-player-stats">
                            <p>0 - 0</p>
                            <p>#{gp.position}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};