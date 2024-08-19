"use client";
import "./GroupList.css";
import { useStore } from "@/app/store/store";
import GroupCard from "../GroupCard/GroupCard";

export default function GroupList({ egs }) {
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