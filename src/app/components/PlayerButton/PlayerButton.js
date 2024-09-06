import "./PlayerButton.css";
import { playerCheckIn } from "@/app/actions/playerCheckIn";
import { playerVerify } from "@/app/actions/playerVerify";
import { egsStore, msStore, gpsStore } from "@/app/store/store";

export default function PlayerButton({ egId, m, mp }) {
    const { setPlayerCheckIn, setPlayerVerify } = msStore(state => state);
    const setEgStatus = egsStore(state => state.setEgStatus);
    const setGpPositions = gpsStore(state => state.setGpPositions);

    async function handlePlayerCheckIn() {
        const res = await playerCheckIn({ mId: m.id, mpId: mp.id});
        setPlayerCheckIn({ m: res.m, mp: res.mp });
    };

    async function handlePlayerVerify() {
        const res = await playerVerify({ egId, mId: m.id, mpId: mp.id });
        setPlayerVerify({ m: res.m, mp: res.mp });
        if (res.eg) setEgStatus(res.eg);
        if (res.gps) setGpPositions(res.gps);
    };

    const playerButton = {
        "ready": <button disabled={mp.checkedIn} onClick={handlePlayerCheckIn}>check in</button>,
        "pending": <button disabled={mp.verified} onClick={handlePlayerVerify}>verify</button>,
    };
    
    return (m.status in playerButton) ? playerButton[m.status] : null;
};