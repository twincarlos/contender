"use client";
import "./PlayerCard.css";
import { memo } from "react";

export default memo(function PlayerCard({ tp }) {
    return (
        <div className="player-card">
            <div className="player-details">
                <p>{tp.rating}</p>
                { tp.location && <p>{` • ${tp.location}`}</p> }
                { tp.club && <p>{` • ${tp.club}`}</p> }
            </div>
            <p className="player-name">{tp.name}</p>
        </div>
    );
});