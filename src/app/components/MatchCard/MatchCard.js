import "./MatchCard.css";
import MatchPlayer from "@/app/components/MatchPlayer/MatchPlayer";
import { ByePlayer } from "../MatchPlayer/ByePlayer";
import { UpcomingPlayer } from "../MatchPlayer/UpcomingPlayer";
import { updateMScore } from "@/app/actions/updateMScore";
import { egsStore, msStore, teStore } from "@/app/store/store";
import { roundName } from "@/app/utils";
import Status from "../Status/Status";

export default function MatchCard({ egId, mId, dm }) {
    const m = msStore(state => state.ms[mId]);
    const updateScore = msStore(state => state.updateScore);
    const te = teStore(state => state.te);
    const eg = egsStore(state => state.egs[egId]);

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
                    games: 0,
                    checkedIn: false,
                    verified: false,
                    isWinner: false
                },
                bottom: {
                    ...m.mps.bottom,
                    [`score${n}`]: position === "bottom" ? score : m.mps.bottom[`score${n}`],
                    games: 0,
                    checkedIn: false,
                    verified: false,
                    isWinner: false
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
        if (isValid) {
            mData.status = "pending";
            if (mData.mps.top.games > mData.mps.bottom.games) mData.mps.top.isWinner = true;
            else mData.mps.bottom.isWinner = true;
        };
        updateScore(mData);
        updateMScore(mData);
    };

    return (
        <div className="match-card card">
            <div className="match-header card-header">
                <div className="match-details match-details-1">
                    <p>{te.name}</p>
                    { eg && <p> • Group {eg.number}</p> }
                    { dm && <p> • {roundName(dm.round)}</p> }
                </div>
                <div className="match-details match-details-2">
                    <Status status={m.status} />
                </div>
            </div>
            <div className="match-body">
                { m.mps.top.bye ? <ByePlayer /> : (m.mps.top.upcoming ? <UpcomingPlayer /> : <MatchPlayer updateGameScore={updateGameScore} egId={egId} m={m} mp={m.mps.top} updateScore={updateScore} dm={dm} />) }
                { m.mps.bottom.bye ? <ByePlayer /> : (m.mps.bottom.upcoming ? <UpcomingPlayer /> : <MatchPlayer updateGameScore={updateGameScore} egId={egId} m={m} mp={m.mps.bottom} updateScore={updateScore} dm={dm} />) }
            </div>
        </div>
    );
};