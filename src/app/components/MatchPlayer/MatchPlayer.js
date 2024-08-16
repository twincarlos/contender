"use client";
import "./MatchPlayer.css";
import { useStore } from "@/app/store/store";

export default function MatchPlayer({ mInfo, mBestOf, mp }) {
    const updateGmGameScore = useStore(state => state.updateGmGameScore);
    return (
        <div className={`match-player match-player-${mp.position}`}>
            <div className="match-player-header">
                <div className="match-player-info">
                    <div className="match-player-details">
                        {mp.ep.tp.rating}
                    </div>
                    <p>{mp.ep.tp.name}</p>
                </div>
                <div className="match-player-winner">
                    <h1>W</h1>
                </div>
            </div>
            <div className="match-player-body">
                <p>{mp.games}</p>
                {
                    [1, 2, 3, 4, 5, 6, 7].map(n => (
                        (n <= 5 || mBestOf === 7) && (
                            <input
                                key={n}
                                type="number"
                                value={mp[`score${n}`] || ""}
                                onChange={e => updateGmGameScore({
                                    egId: mInfo.egId,
                                    gmId: mInfo.gmId,
                                    mpPosition: mp.position,
                                    n,
                                    score: e.target.value
                                })}
                            />
                        )
                    ))
                }
            </div>
        </div>
    );
};