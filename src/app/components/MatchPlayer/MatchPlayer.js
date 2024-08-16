import "./MatchPlayer.css";

export default function MatchPlayer({ mp }) {
    return (
        <div className={`match-player match-player-${mp.position}`}>
            <div className="match-player-header">
                <div className="match-player-info">
                    <div className="match-player-details">
                        { mp.ep.tp.rating }
                    </div>
                    <p>{ mp.ep.tp.name }</p>
                </div>
                <div className="match-player-winner">
                    <h1>W</h1>
                </div>
            </div>
            <div className="match-player-body">
                <p>{mp.games}</p>
                <input type="number" value={mp.score1 || "11"} disabled />
                <input type="number" value={mp.score2 || "11"} disabled />
                <input type="number" value={mp.score3 || "11"} disabled />
                <input type="number" value={mp.score4 || "11"} disabled />
                <input type="number" value={mp.score5 || "11"} disabled />
                <input type="number" value={mp.score6 || "11"} disabled />
                <input type="number" value={mp.score7 || "11"} disabled />
            </div>
        </div>
    );
};