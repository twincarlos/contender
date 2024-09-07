"use client";
import "./GroupStandings.css";
import PlayerCard from "../PlayerCard/PlayerCard";
import { epsStore } from "@/app/store/store";

export default function GroupStandings({ gps }) {
    const eps = epsStore(state => state.eps);
    const positions = {
        1: <i className="position position-1 fa-solid fa-1" />,
        2: <i className="position position-2 fa-solid fa-2" />,
        3: <i className="position position-3 fa-solid fa-3" />,
        4: <i className="position position-4 fa-solid fa-4" />,
        5: <i className="position position-5 fa-solid fa-5" />,
        6: <i className="position position-6 fa-solid fa-6" />,
        7: <i className="position position-7 fa-solid fa-7" />,
        8: <i className="position position-8 fa-solid fa-8" />,
        9: <i className="position position-9 fa-solid fa-9" />,
        10: <p className="position position-10">10</p>,
        11: <p className="position position-11">11</p>,
        12: <p className="position position-12">12</p>
    };
    return (
        <div className="group-standings">
            {gps.map(gp => {
                const ep = eps[gp.eventPlayerId];
                return (
                    <div key={gp.id} className="group-player-standing">
                        <PlayerCard tp={ep.tp} />
                        { gp.position && positions[gp.position] }
                    </div>
                )
            })}
        </div>
    );
};