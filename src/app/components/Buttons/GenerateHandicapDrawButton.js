import { teStore, dmsStore, egsStore } from "@/app/store/store";

export function GenerateHandicapDrawButton({ setShowWindow }) {
    const te = teStore(state => state.te);
    const egs = egsStore(state => state.egs);
    const dms = dmsStore(state => state.dms);

    if (te.type !== "handicap") return null;
    const egsArray = Object.values(egs);
    if (egsArray.length === 0) return null;
    for (const eg of egsArray) if (eg.status !== "finished") return null;
    if (Object.values(dms).length > 0) return null;

    return <button onClick={() => setShowWindow("generate handicap draw")}>Generate draw</button>;
};