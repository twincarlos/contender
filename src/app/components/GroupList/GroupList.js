"use client";
import "./GroupList.css";
import { useStore } from "@/app/store/store";
import GroupCard from "../GroupCard/GroupCard";

export default function GroupList() {
    const groups = useStore(state => state.event.eventGroup);
    return (
        <section className="group-list">
            {
                Object.values(groups).map(group => (
                    <GroupCard key={group.id} groupId={group.id} />
                ))
            }
        </section>
    );
};