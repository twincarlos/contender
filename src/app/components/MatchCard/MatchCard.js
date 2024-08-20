import "./MatchCard.css";
import MatchPlayer from "@/app/components/MatchPlayer/MatchPlayer";
import { msStore } from "@/app/store/store";

export default function MatchCard({ mId }) {
    const m = msStore(state => state.ms[mId]);
    const updateScore = msStore(state => state.updateScore);

    function gameIsValid(score1, score2) {
        if (!score1 || !score2) return false;
        if (score1 < 0 || score2 < 0) return false;
        if (score1 === score2) return false;
        if (score1 < 11 && score2 < 11) return false;
        if ((Math.abs(score1 - score2) !== 2) && (score1 > 11 || score2 > 11)) return false;
        if ((Math.abs(score1 - score2) === 1)) return false;
        return true;
    };

    function updateGameScore({ n, score, position }) {
        let isValid = true;
        const mData = {
            ...m,
            status: "in progress",
            mps: {
                ...m.mps,
                top: {
                    ...m.mps.top,
                    [`score${n}`]: position === "top" ? score : m.mps.top[`score${n}`],
                    games: 0
                },
                bottom: {
                    ...m.mps.bottom,
                    [`score${n}`]: position === "bottom" ? score : m.mps.bottom[`score${n}`],
                    games: 0
                }
            }
        };
        for (let n = 1; n <= mData.bestOf; n++) {
            const matchIsAlreadyFinished = (mData.mps.top.games === (mData.bestOf === 5 ? 3 : 4)) || (mData.mps.bottom.games === (mData.bestOf === 5 ? 3 : 4));
            const topScore = mData.mps.top[`score${n}`];
            const bottomScore = mData.mps.bottom[`score${n}`];
            const checkGameIsValid = gameIsValid(topScore, bottomScore);
            if (matchIsAlreadyFinished) {
                if (topScore || bottomScore) {
                    isValid = false;
                };
            } else {
                if (checkGameIsValid) {
                    if (topScore > bottomScore) mData.mps.top.games++;
                    else mData.mps.bottom.games++;

                } else {
                    isValid = false;
                };
            };
        };
        if (isValid) mData.status = "pending";
        updateScore(mData);
    };

    return (
        <div className="match-card card">
            <p>{m.status}</p>
            <MatchPlayer updateGameScore={updateGameScore} m={m} mp={m.mps.top} updateScore={updateScore} />
            <MatchPlayer updateGameScore={updateGameScore} m={m} mp={m.mps.bottom} updateScore={updateScore} />
        </div>
    );
};