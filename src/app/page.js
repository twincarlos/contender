"use client";
import Header from "./components/Header/Header";
import Window from "./components/Window/Window";
import TournamentList from "./components/TournamentList/TournamentList";
import { CreateTournament } from "./components/Forms/CreateTournament";
import { useEffect, useState } from "react";

export default function Home() {
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

  if (!tournaments.length) return null;

  return (
    <main>
      <Header>
        <button onClick={() => setShowWindow(true)}>Create tournament</button>
      </Header>
      <TournamentList tournaments={tournaments} />
      <Window showWindow={showWindow} setShowWindow={setShowWindow}>
        <CreateTournament tournaments={tournaments} setTournaments={setTournaments} />
      </Window>
    </main>
  );
};