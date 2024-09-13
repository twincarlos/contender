"use client";
import "./Tournament.css";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Window from "../components/Window/Window";
import EventList from "../components/EventList/EventList";
import TournamentPlayerList from "../components/TournamentPlayerList/TournamentPlayerList";
import AdminActions from "../components/AdminActions/AdminActions";
import { CreateTournamentEvent } from "../components/Forms/CreateTournamentEvent";
import { CreateEventButton } from "../components/Buttons/CreateEventButton";
import { CreateTournamentPlayer } from "../components/Forms/CreateTournamentPlayer";
import { CreateTournamentPlayerButton } from "../components/Buttons/CreateTournamentPlayerButton";
import { ReportAs } from "../components/Forms/ReportAs";
import Link from "next/link";
import { ReportAsButton } from "../components/Buttons/ReportAsButton";

export default function Tournament({ params }) {
    const [showWindow, setShowWindow] = useState(null);
    const [t, setT] = useState(null);
    const [tab, setTab] = useState("events");
    useEffect(() => {
        async function getT() {
            const res = await fetch(`/api/get-tournament/${params.tId}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await res.json();
            setT(data);
        };
        getT();
    }, []);
    
    if (!t) return <p>loading</p>;

    const window = {
        "create event": <CreateTournamentEvent t={t} setT={setT} />,
        "create tournament player": <CreateTournamentPlayer t={t} setT={setT} />,
        "report as": <ReportAs tId={t.id} />
    };
    const tabs = {
        "players": <TournamentPlayerList tps={t.tps} />,
        "events": <EventList tes={Object.values(t.tes)} />
    };

    return (
        <main className="tournament">
            <Header>
                <Link className="back-button" href={"/"}><i className="fa-solid fa-arrow-left-long" /> Back</Link>
                <div className="header-body">
                    <h1>{t.name}</h1>
                </div>
            </Header>
            <AdminActions>
                <CreateTournamentPlayerButton setShowWindow={setShowWindow} />
                <CreateEventButton setShowWindow={setShowWindow} />
            </AdminActions>
            <ReportAsButton setShowWindow={setShowWindow} />
            <div className="tabs">
                <button className={`tab ${tab === "events" ? "active" : ""}`} onClick={() => setTab("events")}>Events</button>
                <button className={`tab ${tab === "players" ? "active" : ""}`} onClick={() => setTab("players")}>Players</button>
            </div>
            { tabs[tab] }
            <Window showWindow={showWindow} setShowWindow={setShowWindow}>
                { window[showWindow] }
            </Window>
        </main>
    );
};