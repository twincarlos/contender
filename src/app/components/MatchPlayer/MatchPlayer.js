import "./MatchPlayer.css";
import PlayerCard from "../PlayerCard/PlayerCard";
import PlayerButton from "../PlayerButton/PlayerButton";
import { useOptimistic, startTransition } from "react";
import { epsStore } from "@/app/store/store";
import { usePlayer } from "@/app/context/PlayerContext";

export default function MatchPlayer({ egId, m, mp, updateGameScore, dm, allowPlayerUpdate }) {
    const [optimisticMp, setOptimisticMp] = useOptimistic(mp, (state, { n, score }) => ({
        ...state,
        [`score${n}`]: score
    }));
    async function updateMp({ position, n, score }) {
        startTransition(() => setOptimisticMp({ n, score }));
        await updateGameScore({ position, n, score });
    };
    const ep = epsStore(state => state.eps[optimisticMp.eventPlayerId]);
    const { playerId } = usePlayer();
    return (
        <div className={`match-player match-player-${optimisticMp.position} ${optimisticMp.isWinner ? "match-player-winner" : ""}`}>
            <div className="match-player-header">
                <PlayerCard tp={ep.tp} />
                {
                    optimisticMp.isWinner ? <i className="fa-solid fa-trophy" /> : null
                }
                <PlayerButton playerId={playerId} egId={egId} m={m} mp={optimisticMp} dm={dm} />
            </div>
            <div className="match-player-body">
                <p>{optimisticMp.games}</p>
                {
                    [1, 2, 3, 4, 5, 6, 7].map(n => (
                        (n <= 5 || m.bestOf === 7) && (
                            <input
                                key={n}
                                type="number"
                                value={optimisticMp[`score${n}`] || ""}
                                disabled={m.status === "upcoming" || m.status === "ready" || m.status === "finished" || allowPlayerUpdate === false}
                                onChange={e => updateMp({
                                    position: optimisticMp.position,
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