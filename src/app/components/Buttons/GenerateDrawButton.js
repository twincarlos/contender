import { generateDraw } from "@/app/actions/generateDraw";
export function GenerateDrawButton({ teId }) {
    async function handleGenerateDraw() {
        const res = await generateDraw({ teId, allowUnratedAdvance: false });
        console.log(res);
    };
    return <button onClick={handleGenerateDraw}>Generate draw</button>;
};