"use client";
import "./Forms.css";
import { useEffect, useState } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import { generateDraw } from "@/app/actions/generateDraw";
import { teStore, dmsStore, msStore, egsStore } from "@/app/store/store";

export function GenerateHandicapDraw() {
    const te = teStore(state => state.te);
    const setMs = msStore(state => state.setMs);
    const setDms = dmsStore(state => state.setDms);

    const [gps, setGps] = useState({
        firstGps: {},
        secondGps: {},
        thirdGps: {},
        reEntryGps: {}
    });

    useEffect(() => {
        async function getReEntryPlayers() {
            const res = await fetch(`/api/get-reentry-players/${te.id}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await res.json();
            setGps(data);
        };
        getReEntryPlayers();
    }, []);

    function handleReEntryPlayer(gp) {
        const gpsCopy = { ...gps };
        delete gpsCopy.thirdGps[gp.id];
        setGps({
            ...gpsCopy,
            reEntryGps: {
                ...gpsCopy.reEntryGps,
                [gp.id]: {
                    ...gp
                }
            }
        });
    };

    async function handleGenerateDraw() {
        const draw = await generateDraw({ teId: te.id, allowUnratedAdvance: te.allowUnratedAdvance, teType: te.type, reEntryPlayers: Object.values(gps.reEntryGps || {}).map(gp => gp.ep) });
        setDms(draw);
        const ms = {};
        Object.values(draw).forEach(round => Object.values(round).forEach(dm => ms[dm.m.id] = dm.m));
        setMs(ms);
    };

    return (
        <div className="contender-form generate-handicap-draw">
            <h1>Generate draw</h1>
            <button onClick={handleGenerateDraw}>Generate draw</button>
            <div className="generate-handicap-draw-body">
                <div className="qualified-players">
                    <div className="first-qualified-players">
                        {
                            Object.values(gps.firstGps).map(gp => (
                                <div key={gp.id}>
                                    <PlayerCard tp={gp.ep.tp} />
                                </div>
                            ))
                        }
                    </div>
                    <div className="second-qualified-players">
                        {
                            Object.values(gps.secondGps).map(gp => (
                                <div key={gp.id}>
                                    <PlayerCard tp={gp.ep.tp} />
                                </div>
                            ))
                        }
                    </div>
                    <div className="reentry-players">
                        {
                            Object.values(gps.reEntryGps || {}).map(gp => (
                                <div key={gp.id}>
                                    <PlayerCard tp={gp.ep.tp} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="can-advance-players">
                {
                            Object.values(gps.thirdGps).map(gp => (
                                <div onClick={() => handleReEntryPlayer(gp)} key={gp.id}>
                                    <PlayerCard tp={gp.ep.tp} />
                                </div>
                            ))
                        }
                </div>
            </div>
        </div>
    );
};