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
                    <div className="qualify-players first-qualified-players">
                        <h3>Qualified first</h3>
                        <div className="player-list">
                            {
                                Object.values(gps.firstGps).map(gp => (
                                    <div key={gp.id}>
                                        <PlayerCard tp={gp.ep.tp} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="qualify-players second-qualified-players">
                        <h3>Qualified second</h3>
                        <div className="player-list">
                            {
                                Object.values(gps.secondGps).map(gp => (
                                    <div key={gp.id}>
                                        <PlayerCard tp={gp.ep.tp} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="qualify-players reentry-players">
                        <h3>Re-entries</h3>
                        <div className="player-list">
                            {
                                Object.values(gps.reEntryGps || {}).map(gp => (
                                    <div key={gp.id}>
                                        <PlayerCard tp={gp.ep.tp} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="qualify-players can-advance-players">
                    <h3>Not qualified:</h3>
                    <p>Click to re-enter</p>
                    <div className="player-list">
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
        </div>
    );
};