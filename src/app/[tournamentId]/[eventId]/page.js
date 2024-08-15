"use client";
import { useEffect } from "react";
import "./Event.css";
import { useStore } from "@/app/store/store";

export default function Event({ params }) {
    const tournament = useStore(state => state.tournament);
    const setTournament = useStore(state => state.setTournament);
    useEffect(() => { !tournament && setTournament(params.tournamentId) }, []);
    if (!tournament) return <p>loading</p>;

    return (
        <main className="event">
            Event
        </main>
    );
};