import { beginDrawRound } from "@/app/actions/beginDrawRound";
import { msStore } from "@/app/store/store";

export function BeingDrawRoundButton({ round }) {
    const setDrawRoundReady = msStore(state => state.setDrawRoundReady);
    async function handleBeginDrawRound() {
        const msIds = await beginDrawRound({ round });
        setDrawRoundReady(msIds);
    };
    return <button onClick={handleBeginDrawRound}>Begin draw round</button>;
};