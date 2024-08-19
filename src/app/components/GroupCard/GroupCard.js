"use client";
import "./GroupCard.css";
import MatchCard from "@/app/components/MatchCard/MatchCard";
import { memo } from "react";

export default memo(function GroupCard({ eg }) {
    return (
        <div className="group-card card">
            <div className="group-header card-header">
                <p>Group {eg.number}</p>
            </div>
            {/* <div className="group-body card-body">
                {
                    Object.values(eg.gps).map(gp => (
                        <p key={gp.id}>
                            {gp.ep.tp.name}
                        </p>
                    ))
                }
            </div> */}
            <div className="group-body card-body">
                { Object.values(eg.gms).map(gm =>  <MatchCard key={gm.id} m={gm} />) }
            </div>
        </div>
    );
});