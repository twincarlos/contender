"use client";
import "./MatchCard.css";
import MatchPlayer from "@/app/components/MatchPlayer/MatchPlayer";

export default function MatchCard({ m }) {
    return (
        <div className="match-card card">
            <MatchPlayer m={m.eventGroupId ? { ...m, ...m.m } : m} mp={m.eventGroupId ? m.m.mps.top : m.mps.top} />
            <MatchPlayer m={m.eventGroupId ? { ...m, ...m.m } : m} mp={m.eventGroupId ? m.m.mps.bottom : m.mps.bottom} />
        </div>
    );
};