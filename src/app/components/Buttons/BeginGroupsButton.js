import { beginGroups } from "@/app/actions/beginGroups";
export function BeginGroupsButton({ te, setGroupMatchesReady }) {
    async function handleBeginGroups() {
        await beginGroups(te.id);
        setGroupMatchesReady();
    };
    return <button onClick={handleBeginGroups}>Begin groups</button>;
};