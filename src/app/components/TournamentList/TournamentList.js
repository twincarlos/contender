"use client";
import "./TournamentList.css";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Window from "../Window/Window";
import TournamentCard from "../TournamentCard/TournamentCard";
import { CreateTournament } from "../Forms/CreateTournament";

export default function TournamentList() {
    const [tournaments, setTournaments] = useState([]);
    const [showWindow, setShowWindow] = useState(false);

    useEffect(() => {
        async function getTournaments() {
            const res = await fetch("/api/get-tournaments", {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await res.json();
            setTournaments(data);
        };
        getTournaments();
    }, []);

    return (
        <section>
            <Header>
                <p>Tournaments</p>
                <button onClick={() => setShowWindow(true)}>Create tournament</button>
            </Header>
            <div className="tournament-list">
                { tournaments.map(tournament => <TournamentCard tournament={tournament} key={tournament.id} />) }
            </div>
            <Window showWindow={showWindow} setShowWindow={setShowWindow}>
                <CreateTournament tournaments={tournaments} setTournaments={setTournaments} />
            </Window>
        </section>
    );
};