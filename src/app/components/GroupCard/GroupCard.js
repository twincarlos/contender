"use client";
import "./GroupCard.css";
import { useStore } from "@/app/store/store";

export default function GroupCard({ egId }) {
    const eg = useStore(state => state.te.egs[egId]);
    return (
        <div className="group-card card">
            <div className="group-header card-header">
                <p>Group {eg.number}</p>
            </div>
            <div className="group-body card-body">
                {
                    Object.values(eg.gps).map(gp => (
                        <p key={gp.id}>
                            {gp.ep.tp.name}
                        </p>
                    ))
                }
            </div>
        </div>
    );
};