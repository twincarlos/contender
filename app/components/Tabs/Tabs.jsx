"use client";
import "./Tabs.css";
import { useState } from "react";

export default function Tabs({ tabs }) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    return (
        <div className="Tabs flex flex-direction--column gap">
            <div className="tab-names">
                {
                    tabs.map((tab, idx) => (
                        <button
                            key={idx}
                            className={`tab ${selectedTabIndex == idx ? "selected-tab" : ""}`}
                            onClick={() => setSelectedTabIndex(idx)}>
                            {tab.name}
                        </button>
                    ))
                }
            </div>
            <div className="tab-content">
                {tabs[selectedTabIndex].content}
            </div>
        </div>
    );
};