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
import Link from "next/link";

export default function Tournament({ params }) {
    const [showWindow, setShowWindow] = useState(null);
    const [t, setT] = useState(null);
    const window = {
        "create event": <CreateTournamentEvent t={t} setT={setT} />,
        "create tournament player": <CreateTournamentPlayer t={t} setT={setT} />
    };
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
            <TournamentPlayerList tps={t.tps} />
            <EventList tes={Object.values(t.tes)} />
            <Window showWindow={showWindow} setShowWindow={setShowWindow}>
                { window[showWindow] }
            </Window>
        </main>
    );
};