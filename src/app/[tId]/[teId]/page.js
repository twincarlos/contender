"use client";
import "./Event.css";
import { useEffect, useState } from "react";
import { epsStore, teStore, egsStore, gpsStore, gmsStore, msStore, dmsStore } from "@/app/store/store";
import Draw from "@/app/components/Draw/Draw";
import Header from "@/app/components/Header/Header";
import EventPlayerList from "@/app/components/EventPlayerList/EventPlayerList";
import GroupList from "@/app/components/GroupList/GroupList";
import { GenerateHandicapDraw } from "@/app/components/Forms/GenerateHandicapDraw";
import AdminActions from "@/app/components/AdminActions/AdminActions";
import { ConfirmSwapButton } from "@/app/components/Buttons/ConfirmSwapButton";
import { GenerateGroupsButton } from "@/app/components/Buttons/GenerateGroupsButton";
import { BeginGroupsButton } from "@/app/components/Buttons/BeginGroupsButton";
import { CreateEventPlayerButton } from "@/app/components/Buttons/CreateEventPlayerButton";
import { GenerateDrawButton } from "@/app/components/Buttons/GenerateDrawButton";
import { CreateEventPlayer } from "@/app/components/Forms/CreateEventPlayer";
import { GenerateHandicapDrawButton } from "@/app/components/Buttons/GenerateHandicapDrawButton";
import { ReportAs } from "@/app/components/Forms/ReportAs";
import { ReportAsButton } from "@/app/components/Buttons/ReportAsButton";
import { arrayToObject } from "@/app/utils";
import Link from "next/link";
import Window from "@/app/components/Window/Window";
import { SwapPlayersButton } from "@/app/components/Buttons/SwapPlayersButton";

export default function Event({ params }) {
    const { te, setTe } = teStore(state => state);
    const { eps, setEps, addEp, } = epsStore(state => state);
    const setEgs = egsStore(state => state.setEgs);
    const setGps = gpsStore(state => state.setGps);
    const setGms = gmsStore(state => state.setGms);
    const setDms = dmsStore(state => state.setDms);
    const setMs = msStore(state => state.setMs);
    const [showWindow, setShowWindow] = useState(null);
    const [swapPlayers, setSwapPlayers] = useState(false);
    const [swapPlayersData, setSwapPlayersData] = useState({
        player1: null,
        player2: null
    });
    const [tab, setTab] = useState("groups");

    const window = {
        "add player": <CreateEventPlayer te={te} eps={eps && arrayToObject(Object.values(eps), "tournamentPlayerId")} addEp={addEp} />,
        "generate handicap draw": <GenerateHandicapDraw te={te} />,
        "report as": <ReportAs tId={params.tId} />
    };

    const tabs = {
        "players": <EventPlayerList />,
        "groups": <GroupList
            swapPlayers={swapPlayers}
            setSwapPlayers={setSwapPlayers}
            swapPlayersData={swapPlayersData}
            setSwapPlayersData={setSwapPlayersData}
        />,
        "draw": <Draw />
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
            setDms(data.dms);
            setMs(data.ms);
        };
        setTeData();
    }, []);

    if (!te) return <p>loading</p>;

    return (
        <main className="event">
            <Header>
                <Link className="back-button" href={`/${params.tId}`}><i className="fa-solid fa-arrow-left-long" /> Back</Link>
                <div className="header-body">
                    <h1>{te.name}</h1>
                </div>
            </Header>
            <AdminActions>
                {
                    !swapPlayers && (
                        <>
                            <GenerateDrawButton />
                            <GenerateHandicapDrawButton setShowWindow={setShowWindow} />
                            <GenerateGroupsButton />
                            <BeginGroupsButton />
                            <CreateEventPlayerButton setShowWindow={setShowWindow} />
                        </>
                    )
                }
                <SwapPlayersButton
                    swapPlayers={swapPlayers}
                    setSwapPlayers={setSwapPlayers}
                    setSwapPlayersData={setSwapPlayersData}
                />
                <ConfirmSwapButton
                    swapPlayers={swapPlayers}
                    swapPlayersData={swapPlayersData}
                    setSwapPlayersData={setSwapPlayersData}
                />
            </AdminActions>
            <ReportAsButton setShowWindow={setShowWindow} />
            <div className="tabs">
                <button className={`tab ${tab === "groups" ? "active" : ""}`} onClick={() => setTab("groups")}>Groups</button>
                <button className={`tab ${tab === "draw" ? "active" : ""}`} onClick={() => setTab("draw")}>Draw</button>
                <button className={`tab ${tab === "players" ? "active" : ""}`} onClick={() => setTab("players")}>Players</button>
            </div>
            { tabs[tab] }
            <Window showWindow={showWindow} setShowWindow={setShowWindow}>
                {window[showWindow]}
            </Window>
        </main>
    );
};