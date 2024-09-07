"use client";
import "./TournamentPlayerList.css";
import { useState } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";

export default function TournamentPlayerList({ tps }) {
    const [showPlayerList, setShowPlayerList] = useState(true);

    return (
        <section>
            <div className="page-expand-buttons">
                <button onClick={() => setShowPlayerList(!showPlayerList)}><i className={`fa-solid fa-chevron-${showPlayerList ? "up" : "down"}`} /></button>
                <h2>Players</h2>
            </div>
            {
                showPlayerList && (
                    <div className="tournament-player-list">
                        { Object.values(tps).map(tp => <PlayerCard key={tp.id} tp={tp} />) }
                    </div>
                )
            }
        </section>
    );
};