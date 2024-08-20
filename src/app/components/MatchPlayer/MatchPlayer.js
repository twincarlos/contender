import "./MatchPlayer.css";
import PlayerCard from "../PlayerCard/PlayerCard";
import PlayerButton from "../PlayerButton/PlayerButton";

export default function MatchPlayer({ m, mp, updateGameScore }) {
    return (
        <div className={`match-player match-player-${mp.position}`}>
            <div className="match-player-header">
                <PlayerButton m={m} mp={mp} />
                <PlayerCard tp={mp.ep.tp} />
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
                                disabled={m.status !== "in progress"}
                                onChange={e => updateGameScore({
                                    position: mp.position,
                                    n,
                                    score: isNaN(e.target.value) ? null : Number(e.target.value)
                                })}
                            />
                        )))
                }
            </div>
        </div>
    );
};