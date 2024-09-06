import { generateDraw } from "@/app/actions/generateDraw";
import { dmsStore, msStore } from "@/app/store/store";
import { arrayToObject } from "@/app/utils";
export function GenerateDrawButton({ teId }) {
    const setDms = dmsStore(state => state.setDms);
    const setMs = msStore(state => state.setMs);
    async function handleGenerateDraw() {
        const draw = await generateDraw({ teId, allowUnratedAdvance: false });
        setDms(draw);
        const ms = arrayToObject(Object.values(draw).map(round => Object.values(round).map(dm => dm.m)), "id");
        console.log(ms);
        setMs(ms);
    };
    return <button onClick={handleGenerateDraw}>Generate draw</button>;
};