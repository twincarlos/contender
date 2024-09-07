import { beginDrawRound } from "@/app/actions/beginDrawRound";
import { teStore, msStore } from "@/app/store/store";

export function BeingDrawRoundButton({ round }) {
    const te = teStore(state => state.te);
    const setDrawRoundReady = msStore(state => state.setDrawRoundReady);
    async function handleBeginDrawRound() {
        const msIds = await beginDrawRound({ teId: te.id, round });
        setDrawRoundReady(msIds);
    };
    return <button onClick={handleBeginDrawRound}>Begin draw round</button>;
};