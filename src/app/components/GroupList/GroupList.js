"use client";
import "./GroupList.css";
import GroupCard from "../GroupCard/GroupCard";
import { memo } from "react";

export default memo(function GroupList({ egs }) {
    return (
        <section className="group-list">
            {
                Object.values(egs).map(eg => (
                    <GroupCard key={eg.id} eg={eg} />
                ))
            }
        </section>
    );
});