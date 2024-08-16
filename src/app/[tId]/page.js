"use client";
import "./Tournament.css";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import EventList from "../components/EventList/EventList";
import Window from "../components/Window/Window";
import { CreateEvent } from "../components/Forms/CreateEvent";

export default function Tournament({ params }) {
    const [showWindow, setShowWindow] = useState(false);
    const [t, setT] = useState(null);
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
        return () => getT();
    }, []);

    if (!t) return <p>loading</p>;

    return (
        <main className="tournament">
            <Header>
                <p>{t.name}</p>
                <button onClick={() => setShowWindow(true)}>Add event</button>
            </Header>
            <EventList tes={Object.values(t.tes)} />
            <Window showWindow={showWindow} setShowWindow={setShowWindow}>
                <CreateEvent t={t} setT={setT} />
            </Window>
        </main>
    );
};