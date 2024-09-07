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

    useEffect(() => {
        if (componentRef.current) {
            setHeight(componentRef.current.getBoundingClientRect().height);
        }
    }, []);

    console.log(height);

    return (
        <section ref={componentRef} className="draw">
            {Object.keys(dms).sort((a, b) => b - a).map((round, index) => (
                <div key={round} className={`draw-round index-${index + 1} card`}>
                    <div className="draw-round-details">
                        <h1>{roundName(round)}</h1>
                        <BeingDrawRoundButton round={round} />
                    </div>
                    <DrawMatchList minHeight={height} round={round} />
                </div>
            ))}
        </section>
    );
};