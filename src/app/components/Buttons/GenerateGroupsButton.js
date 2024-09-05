import { generateGroups } from "@/app/actions/generateGroups";

export function GenerateGroupsButton({ te, setEgs, setGps, setGms, setMs }) {
    async function handleGenerateGroups() {
        const data = await generateGroups({ teId: te.id, preferGroupsOf: 4 });
        setEgs(data.egs);
        setGps(data.gps);
        setGms(data.gms);
        setMs(data.ms);
    };
    return <button onClick={handleGenerateGroups}>Generate groups</button>;
};