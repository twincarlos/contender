"use client";
import "./Draw.css";
import { dmsStore } from "@/app/store/store";
import DrawMatchList from "../DrawMatchList/DrawMatchList";
import { BeingDrawRoundButton } from "../Buttons/BeginDrawRoundButton";
import { useEffect, useState, useRef } from "react";
import { roundName } from "@/app/utils";

export default function Draw() {
    const dms = dmsStore(state => state.dms);
    const componentRef = useRef(null);
    const [height, setHeight] = useState(null);
    const [showDraw, setShowDraw] = useState(true);

    useEffect(() => {
        if (componentRef.current) {
            setHeight(componentRef.current.getBoundingClientRect().height);
        }
    }, [dms]);

    return (
        <section>
            <div className="page-expand-buttons">
                <button onClick={() => setShowDraw(!showDraw)}><i className={`fa-solid fa-chevron-${showDraw ? "up" : "down"}`} /></button>
                <h2>Draw</h2>
            </div>
            {
                showDraw && (
                    <div ref={componentRef} className="draw">
                        {Object.keys(dms).sort((a, b) => b - a).map((round, index) => (
                            <div key={round} className={`draw-round index-${index + 1} card`}>
                                <div className="draw-round-details">
                                    <h1>{roundName(round)}</h1>
                                    <BeingDrawRoundButton round={round} />
                                </div>
                                <DrawMatchList minHeight={height} round={round} />
                            </div>
                        ))}
                    </div>
                )
            }
        </section>
    );
};