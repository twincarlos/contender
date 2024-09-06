import { generateDraw } from "@/app/actions/generateDraw";
import { dmsStore, msStore } from "@/app/store/store";
export function GenerateDrawButton({ teId }) {
    const setDms = dmsStore(state => state.setDms);
    const setMs = msStore(state => state.setMs);
    async function handleGenerateDraw() {
        const draw = await generateDraw({ teId, allowUnratedAdvance: false });
        setDms(draw);
        const ms = {};
        Object.values(draw).forEach(round => Object.values(round).forEach(dm => ms[dm.m.id] = dm.m));
        setMs(ms);
    };
    return <button onClick={handleGenerateDraw}>Generate draw</button>;
};