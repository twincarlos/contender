"use client";
import "./MatchCard.css";
import MatchPlayer from "@/app/components/MatchPlayer/MatchPlayer";
import { memo } from "react";
import { msStore } from "@/app/store/store";

export default memo(function MatchCard({ m }) {
    const gm = msStore(state => state.ms[m.id]);
    const updateScore = msStore(state => state.updateScore);
    return (
        <div className="match-card card">
            <MatchPlayer m={gm} mp={gm.mps.top} updateScore={updateScore} />
            <MatchPlayer m={gm} mp={gm.mps.bottom} updateScore={updateScore} />
        </div>
    );
});