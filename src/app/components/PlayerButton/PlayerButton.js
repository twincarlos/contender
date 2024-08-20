import "./PlayerButton.css";
import { playerCheckIn, playerVerify } from "@/app/actions/actions";
import { msStore } from "@/app/store/store";

export default function PlayerButton({ m, mp }) {
    const { setPlayerCheckIn, setPlayerVerify } = msStore(state => state);
    function handlePlayerCheckIn() {
        playerCheckIn(m.id, mp.id);
        setPlayerCheckIn({ mId: m.id, position: mp.position });
    };
    function handlePlayerVerify() {
        playerVerify(m.id, mp.id);
        setPlayerVerify({ mId: m.id, position: mp.position });
    };
    const playerButton = {
        "ready": <button disabled={mp.checkedIn} onClick={handlePlayerCheckIn}>check in</button>,
        "pending": <button disabled={mp.verified} onClick={handlePlayerVerify}>verify</button>,
    };
    return (m.status in playerButton) ? playerButton[m.status] : null;
};