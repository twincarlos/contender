import "./PlayerButton.css";
import { playerCheckIn } from "@/app/actions/actions";
import { msStore } from "@/app/store/store";

export default function PlayerButton({ m, mp }) {
    const setPlayerCheckIn = msStore(state => state.setPlayerCheckIn);
    function handlePlayerCheckIn() {
        playerCheckIn(m.id, mp.id);
        setPlayerCheckIn({ mId: m.id, position: mp.position });
    };
    const playerButton = {
        "ready": <button disabled={mp.checkedIn} onClick={handlePlayerCheckIn}>check in</button>,
        "pending": <button>verify</button>,
    };
    return (m.status in playerButton) ? playerButton[m.status] : null;
};