import "./GroupList.css";
import GroupCard from "../GroupCard/GroupCard";
import { egsStore } from "@/app/store/store";

export default function GroupList() {
    const egs = egsStore(state => state.egs);
    return (
        <section className="group-list">
            {
                Object.values(egs).map(eg => (
                    <GroupCard key={eg.id} eg={eg} />
                ))
            }
        </section>
    );
};