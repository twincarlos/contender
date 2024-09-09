import { beginGroups } from "@/app/actions/beginGroups";
import { egsStore, msStore, teStore, gmsStore } from "@/app/store/store";

export function BeginGroupsButton() {
    const te = teStore(state => state.te);
    const egs = egsStore(state => state.egs);
    const setGms = gmsStore(state => state.setGms);
    const setMs = msStore(state => state.setMs);
    const setEgsInProgress = egsStore(state => state.setEgsInProgress);

    async function handleBeginGroups() {
        const data = await beginGroups(te.id);
        setEgsInProgress();
        setGms(data.gms);
        setMs(data.ms);
    };

    const egsArray = Object.values(egs);
    if (egsArray.length === 0) return null;
    for (const eg of egsArray) if (eg.status !== "upcoming") return null;

    return <button onClick={handleBeginGroups}>Begin groups</button>;
};