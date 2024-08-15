"use client";
import "./GroupCard.css";
import { useStore } from "@/app/store/store";

export default function GroupCard({ groupId }) {
    const group = useStore(state => state.event.eventGroup[groupId]);
    return (
        <div className="group-card card">
            <div className="group-header card-header">
                <p>Group {group.number}</p>
            </div>
            <div className="group-body card-body">
                {
                    Object.values(group.groupPlayer).map(groupPlayer => (
                        <p key={groupPlayer.id}>
                            {groupPlayer.eventPlayer.tournamentPlayer.name}
                        </p>
                    ))
                }
            </div>
        </div>
    );
};