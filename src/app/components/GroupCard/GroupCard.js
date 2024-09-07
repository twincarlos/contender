"use client";
import "./GroupCard.css";
import MatchList from "../MatchList/MatchList";
import GroupStandings from "../GroupStandings/GroupStandings";
import Status from "../Status/Status";
import { gmsStore, gpsStore } from "@/app/store/store";
import { useState, memo } from "react";

export default memo(function GroupCard({ eg }) {
    const gps = gpsStore(state => state.gps[eg.id]);
    const gms = gmsStore(state => state.gms[eg.id]);
    const [showMatchList, setShowMatchList] = useState(false);

    return (
        <div className="group-card card">
            <div className="group-header card-header">
                <p className="group-detail">Group {eg.number}</p>
                <Status status={eg.status} />
            </div>
            <GroupStandings gps={Object.values(gps)} />
            <div className="show-matches-button"><button onClick={() => setShowMatchList(!showMatchList)}><i className={`fa-solid fa-chevron-${showMatchList ? "up" : "down"}`} /> Matches</button></div>
            {showMatchList && <MatchList ms={Object.values(gms).sort((a, b) => a.sequence - b.sequence)} />}
        </div>
    );
});