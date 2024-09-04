"use client";
import "./Event.css";
import { useEffect, useState } from "react";
import { epsStore, teStore, egsStore, gpsStore, gmsStore, msStore } from "@/app/store/store";
import Header from "@/app/components/Header/Header";
import GroupList from "@/app/components/GroupList/GroupList";
import { GenerateGroupsButton } from "@/app/components/Buttons/GenerateGroupsButton";
import { BeginGroupsButton } from "@/app/components/Buttons/BeginGroupsButton";
import { CreateEventPlayerButton } from "@/app/components/Buttons/CreateEventPlayerButton";
import { CreateEventPlayer } from "@/app/components/Forms/CreateEventPlayer";
import Window from "@/app/components/Window/Window";
import { arrayToObject } from "@/app/utils";

export default function Event({ params }) {
    const setGroupMatchesReady = msStore(state => state.setGroupMatchesReady);
    const { te, setTe } = teStore(state => state);
    const { eps, setEps, addEp, } = epsStore(state => state);
    const setEgs = egsStore(state => state.setEgs);
    const setGps = gpsStore(state => state.setGps);
    const setGms = gmsStore(state => state.setGms);
    const setMs = msStore(state => state.setMs);
    const [showWindow, setShowWindow] = useState(null);
    const window = {
        "add player": <CreateEventPlayer te={te} eps={eps && arrayToObject(Object.values(eps), "tournamentPlayerId")} addEp={addEp} />
    };

    useEffect(() => {
        async function setTeData() {
            const res = await fetch(`/api/get-event/${params.teId}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await res.json();
            setTe(data.te);
            setEps(data.eps);
            setEgs(data.egs);
            setGps(data.gps);
            setGms(data.gms);
            setMs(data.ms);
        };
        setTeData();
    }, []);

    if (!te) return <p>loading</p>;

    return (
        <main className="event">
            <Header>
                <p>{te.name}</p>
                <GenerateGroupsButton te={te} setEgs={setEgs} setGps={setGps} setGms={setGms} setMs={setMs} />
                <BeginGroupsButton te={te} setGroupMatchesReady={setGroupMatchesReady} />
                <CreateEventPlayerButton setShowWindow={setShowWindow} />
            </Header>
            <GroupList />
            <Window showWindow={showWindow} setShowWindow={setShowWindow}>
                { window[showWindow] }
            </Window>
        </main>
    );
};