import { egsStore } from "@/app/store/store";

export function SwapPlayersButton({ swapPlayers, setSwapPlayers, setSwapPlayersData }) {
    const egs = egsStore(state => state.egs);

    const egsArray = Object.values(egs);
    if (egsArray.length === 0) return null;
    for (const eg of egsArray) if (eg.status !== "upcoming") return null;

    async function handleSwapPlayers() {
        setSwapPlayers(true);
    };

    async function handleCancelSwapPlayers() {
        setSwapPlayersData({
            player1: null,
            player2: null
        });
        setSwapPlayers(false);
    };
    
    if (swapPlayers) return <button onClick={handleCancelSwapPlayers}>Cancel swap</button>;
    else return <button onClick={handleSwapPlayers}>Swap players</button>
};