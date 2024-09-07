import { beginGroups } from "@/app/actions/beginGroups";
import { egsStore, msStore, teStore } from "@/app/store/store";

export function BeginGroupsButton() {
    const te = teStore(state => state.te);
    const egs = egsStore(state => state.egs);
    const setEgsInProgress = egsStore(state => state.setEgsInProgress);
    const setGroupMatchesReady = msStore(state => state.setGroupMatchesReady);

    async function handleBeginGroups() {
        await beginGroups(te.id);
        setGroupMatchesReady();
        setEgsInProgress();
    };

    const egsArray = Object.values(egs);
    if (egsArray.length === 0) return null;
    for (const eg of egsArray) if (eg.status !== "upcoming") return null;

    return <button onClick={handleBeginGroups}>Begin groups</button>;
};