"use client";
import "./GroupList.css";
import GroupCard from "../GroupCard/GroupCard";
import { egsStore } from "@/app/store/store";
import { useState } from "react";

export default function GroupList({ swapPlayers, swapPlayersData, setSwapPlayersData }) {
    const [showGroupList, setShowGroupList] = useState(true);
    const egs = egsStore(state => state.egs);
    return (
        <section>
            <div className="page-expand-buttons">
                <button onClick={() => setShowGroupList(!showGroupList)}><i className={`fa-solid fa-chevron-${showGroupList ? "up" : "down"}`} /></button>
                <h2>Groups</h2>
            </div>
            {
                showGroupList && (
                    <div className="group-list">
                        {
                            Object.values(egs).map(eg => (
                                <GroupCard
                                    key={eg.id}
                                    eg={eg}
                                    swapPlayers={swapPlayers}
                                    swapPlayersData={swapPlayersData}
                                    setSwapPlayersData={setSwapPlayersData}
                                />
                            ))
                        }
                    </div>
                )
            }
        </section>
    );
};