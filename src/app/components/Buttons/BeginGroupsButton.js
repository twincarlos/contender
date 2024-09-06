import { beginGroups } from "@/app/actions/beginGroups";
import { egsStore } from "@/app/store/store";
export function BeginGroupsButton({ te, setGroupMatchesReady }) {
    const setEgsInProgress = egsStore(state => state.setEgsInProgress);
    async function handleBeginGroups() {
        await beginGroups(te.id);
        setGroupMatchesReady();
        setEgsInProgress();
    };
    return <button onClick={handleBeginGroups}>Begin groups</button>;
};