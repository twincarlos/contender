"use client";
import "./MatchPlayer.css";
import { useStore } from "@/app/store/store";
import { memo } from "react";

export default memo(function MatchPlayer({ m, mp, updateScore }) {
    return (
        <div className={`match-player match-player-${mp.position}`}>
            <div className="match-player-header">
                <div className="match-player-info">
                    <div className="match-player-details">
                        {mp.eps.tps.rating}
                    </div>
                    <p>{mp.eps.tps.name}</p>
                </div>
                <div className="match-player-winner">
                    <h1>W</h1>
                </div>
            </div>
            <div className="match-player-body">
                <p>{mp.games}</p>
                {
                    [1, 2, 3, 4, 5, 6, 7].map(n => (
                        (n <= 5 || m.bestOf === 7) && (
                            <input
                                key={n}
                                type="number"
                                value={mp[`score${n}`] || ""}
                                onChange={e => updateScore({
                                    msId: m.id,
                                    mpPosition: mp.position,
                                    n,
                                    score: e.target.value
                                })}
                            />
                        )))
                }
            </div>
        </div>
    );
});