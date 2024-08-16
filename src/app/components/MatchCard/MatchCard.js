"use client";
import "./MatchCard.css";
import { useStore } from "@/app/store/store";
import MatchPlayer from "@/app/components/MatchPlayer/MatchPlayer";

export default function MatchCard({ mInfo }) {
    const m = useStore(state => {
        if (mInfo.stage = "groups") {
            return state.te.egs[mInfo.egId].gms[mInfo.gmId].m;
        } else {
            return state.te.td[mInfo.tdRound][mInfo.mId];
        };
    });

    return (
        <div className="match-card card">
            <MatchPlayer mBestOf={m.bestOf} mp={m.mps.top} />
            <MatchPlayer mBestOf={m.bestOf} mp={m.mps.bottom} />
        </div>
    );
};