"use client";
import { tournamentStore } from "../store/tournament";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import EventList from "../components/EventList/EventList";
import Window from "../components/Window/Window";
import { CreateEvent } from "../components/Forms/CreateEvent";

export default function Tournament({ params }) {
    const [showWindow, setShowWindow] = useState(false);
    const tournament = tournamentStore(state => state.tournament);
    const setTournament = tournamentStore(state => state.setTournament);
    const addEvent = tournamentStore(state => state.addEvent);
    useEffect(() => { setTournament(params.tournamentId) }, []);
    if (!tournament.id) return <p>loading</p>;

    return (
        <main className="tournament">
            <Header>
                <p>{tournament.name}</p>
                <button onClick={() => setShowWindow(true)}>Add event</button>
            </Header>
            <EventList events={Object.values(tournament.tournamentEvent)} />
            <Window showWindow={showWindow} setShowWindow={setShowWindow}>
                <CreateEvent tournamentId={params.tournamentId} addEvent={addEvent} />
            </Window>
        </main>
    );
};