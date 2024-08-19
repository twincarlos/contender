import "./MatchPlayer.css";

export default function MatchPlayer({ m, mp, updateScore }) {
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
                        (n <= 5 || m.bestOf === 7) && (
                            <input
                                key={n}
                                type="number"
                                value={mp[`score${n}`] || ""}
                                onChange={e => updateScore({
                                    mId: m.id,
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
};