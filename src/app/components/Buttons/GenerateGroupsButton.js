import { generateGroups } from "@/app/actions/generateGroups";
import { egsStore, gmsStore, gpsStore, msStore, teStore, epsStore } from "@/app/store/store";

export function GenerateGroupsButton() {
    const te = teStore(state => state.te);
    const setEgs = egsStore(state => state.setEgs);
    const setGps = gpsStore(state => state.setGps);
    const setGms = gmsStore(state => state.setGms);
    const setMs = msStore(state => state.setMs);
    const eps = epsStore(state => state.eps);
    const egs = egsStore(state => state.egs);

    async function handleGenerateGroups() {
        const data = await generateGroups({ teId: te.id, preferGroupsOf: 4 });
        setEgs(data.egs);
        setGps(data.gps);
        setGms(data.gms);
        setMs(data.ms);
    };

    if (Object.values(eps).length < 3) return null;
    if (Object.values(egs).length > 0) return null;

    return <button onClick={handleGenerateGroups}>Generate groups</button>;
};