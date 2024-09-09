import swapGroupPlayers from "@/app/actions/swapGroupPlayers";
import { gpsStore } from "@/app/store/store";

export function ConfirmSwapButton({ swapPlayers, swapPlayersData, setSwapPlayersData }) {
    const swapGps = gpsStore(state => state.swapGps);
    async function handleSwapPlayers() {
        await swapGroupPlayers({ gp1: swapPlayersData.player1, gp2: swapPlayersData.player2 });
        swapGps({ gp1: swapPlayersData.player1, gp2: swapPlayersData.player2 });
        setSwapPlayersData({
            player1: null,
            player2: null
        });
    };
    if (!swapPlayers) return null;
    return (
        <button
            disabled={!swapPlayersData.player1 || !swapPlayersData.player2}
            onClick={handleSwapPlayers}
        >
            <i className="fa-solid fa-shuffle" />
        </button>
    );
};