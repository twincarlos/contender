"use client";
import "./Forms.css";
import { useEffect, useState } from "react";
import { createEp } from "@/app/actions/create";
import PlayerCard from "../PlayerCard/PlayerCard";

export function CreateEventPlayer({ te, eps, addEp }) {
    const [tps, setTps] = useState({});
    const [keyword, setKeyword] = useState("");

    async function handleCreateEventPlayer(tp) {
        const data = await createEp({ tournamentEventId: te.id, tournamentPlayerId: tp.id });
        addEp({ ...data, tp });
        setTps(() => {
            const tpsData = { ...tps };
            delete tpsData[tp.id];
            return tpsData;
        });
    };

    useEffect(() => {
        async function getTps() {
            const res = await fetch(`/api/get-tournament-players/${te.tournamentId}/${te.id}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await res.json();
            setTps(data);
        };
        getTps();
    }, []);

    return (
        <div className="contender-form create-event-player">
            <p>Add player</p>
            <input type="text" value={keyword} onChange={e => setKeyword(e.target.value.toLocaleLowerCase())} />
            <div className="player-list">
                {
                    Object.values(tps).sort((a, b) => {
                        if (b.id in eps) return 1;
                        else if (a.id in eps) return -1;
                        else return b.rating - a.rating;
                    }).filter(tp => tp.name.toLocaleLowerCase().includes(keyword)).map(tp => (
                        <div key={tp.id} onClick={() => handleCreateEventPlayer(tp)}>
                            <PlayerCard tp={tp} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};