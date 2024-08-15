"use client";
import "./Tournament.css";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import EventList from "../components/EventList/EventList";
import Window from "../components/Window/Window";
import { CreateEvent } from "../components/Forms/CreateEvent";

export default function Tournament({ params }) {
    const [showWindow, setShowWindow] = useState(false);
    const [tournament, setTournament] = useState(null);
    useEffect(() => {
        async function getTournament() {
            const res = await fetch(`/api/get-tournament/${params.tournamentId}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await res.json();
            setTournament(data);
        };
        getTournament();
    }, []);

    if (!tournament) return <p>loading</p>;

    return (
        <main className="tournament">
            <Header>
                <p>{tournament.name}</p>
                <button onClick={() => setShowWindow(true)}>Add event</button>
            </Header>
            <EventList events={Object.values(tournament.tournamentEvent)} />
            <Window showWindow={showWindow} setShowWindow={setShowWindow}>
                <CreateEvent tournament={tournament} setTournament={setTournament} />
            </Window>
        </main>
    );
};