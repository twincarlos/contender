"use client";
import "./Tournament.css";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import EventList from "../components/EventList/EventList";
import Window from "../components/Window/Window";
import { CreateEvent } from "../components/Forms/CreateEvent";
import { CreateEventButton } from "../components/Buttons/CreateEventButton";
import { CreateTournamentPlayer } from "../components/Forms/CreateTournamentPlayer";
import { CreateTournamentPlayerButton } from "../components/Buttons/CreateTournamentPlayerButton";

export default function Tournament({ params }) {
    const [showWindow, setShowWindow] = useState(null);
    const [t, setT] = useState(null);
    const window = {
        "create event": <CreateEvent t={t} setT={setT} />,
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
                <p>{t.name}</p>
                <CreateTournamentPlayerButton setShowWindow={setShowWindow} />
                <CreateEventButton setShowWindow={setShowWindow} />
            </Header>
            <EventList tes={Object.values(t.tes)} />
            <Window showWindow={showWindow} setShowWindow={setShowWindow}>
                { window[showWindow] }
            </Window>
        </main>
    );
};