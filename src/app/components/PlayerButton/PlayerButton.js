import "./PlayerButton.css";
import { playerCheckIn } from "@/app/actions/playerCheckIn";
import { playerVerify } from "@/app/actions/playerVerify";
import { egsStore, msStore, gpsStore, epsStore } from "@/app/store/store";

export default function PlayerButton({ egId, m, mp, dm, playerId }) {
    const { setPlayerCheckIn, setPlayerVerify, advanceMatchPlayer } = msStore(state => state);
    const setEgStatus = egsStore(state => state.setEgStatus);
    const setGpPositions = gpsStore(state => state.setGpPositions);
    const ep = epsStore(state => state.eps[mp.eventPlayerId]);

    async function handlePlayerCheckIn() {
        const res = await playerCheckIn({ mId: m.id, mpId: mp.id});
        setPlayerCheckIn({ m: res.m, mp: res.mp });
    };

    async function handlePlayerVerify() {
        const res = await playerVerify({ egId, mId: m.id, mpId: mp.id, dm });
        setPlayerVerify({ m: res.m, mp: res.mp || res.dmp });
        if (res.eg) setEgStatus(res.eg);
        if (res.gps) setGpPositions(res.gps);
        if (res.dmp) advanceMatchPlayer(res.dmp);
    };

    if (playerId !== "admin" && playerId != ep.tournamentPlayerId) return null;

    const playerButton = {
        "ready": <button disabled={mp.checkedIn} onClick={handlePlayerCheckIn}>check in</button>,
        "pending": <button disabled={mp.verified} onClick={handlePlayerVerify}>verify</button>,
    };
    
    return (m.status in playerButton) ? playerButton[m.status] : null;
};