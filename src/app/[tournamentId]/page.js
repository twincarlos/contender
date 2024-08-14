"use client";
import { tournamentStore } from "../store/tournament";
import { useEffect } from "react";
import Header from "../components/Header/Header";
import EventList from "../components/EventList/EventList";

export default function Tournament({ params }) {
    const tournament = tournamentStore(state => state.tournament);
    const setTournament = tournamentStore(state => state.setTournament);
    useEffect(() => { setTournament(params.tournamentId) }, []);
    if (!tournament.id) return <p>loading</p>;

    return (
        <main className="tournament">
            <Header>
                <p>{tournament.name}</p>
                <button>Add event</button>
            </Header>
            <EventList events={[]} />
        </main>
    );
};