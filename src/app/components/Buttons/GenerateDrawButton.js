import { generateDraw } from "@/app/actions/generateDraw";
import { teStore, dmsStore, msStore, egsStore } from "@/app/store/store";

export function GenerateDrawButton() {
    const te = teStore(state => state.te);
    const egs = egsStore(state => state.egs);
    const dms = dmsStore(state => state.dms);
    const setMs = msStore(state => state.setMs);
    const setDms = dmsStore(state => state.setDms);

    async function handleGenerateDraw() {
        const draw = await generateDraw({ teId: te.id, allowUnratedAdvance: false });
        setDms(draw);
        const ms = {};
        Object.values(draw).forEach(round => Object.values(round).forEach(dm => ms[dm.m.id] = dm.m));
        setMs(ms);
    };

    const egsArray = Object.values(egs);
    if (egsArray.length === 0) return null;
    for (const eg of egsArray) if (eg.status !== "finished") return null;
    if (Object.values(dms).length > 0) return null;

    return <button onClick={handleGenerateDraw}>Generate draw</button>;
};