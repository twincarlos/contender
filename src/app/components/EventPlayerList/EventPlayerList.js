"use client";
import "./EventPlayerList.css";
import { useState } from "react";
import { epsStore } from "@/app/store/store";
import PlayerCard from "../PlayerCard/PlayerCard";

export default function EventPlayerList() {
    const [showPlayerList, setShowPlayerList] = useState(true);
    const eps = epsStore(state => state.eps);

    return (
        <section className="event-player-list-section">
            <div className="page-expand-buttons">
                <button onClick={() => setShowPlayerList(!showPlayerList)}><i className={`fa-solid fa-chevron-${showPlayerList ? "up" : "down"}`} /></button>
                <h2>Players</h2>
            </div>
            {
                showPlayerList && (
                    <div className="event-player-list">
                        { Object.values(eps).map(ep => <PlayerCard key={ep.id} tp={ep.tp} />) }
                    </div>
                )
            }
        </section>
    );
};