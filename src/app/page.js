"use client";
import Header from "./components/Header/Header";
import Window from "./components/Window/Window";
import TournamentList from "./components/TournamentList/TournamentList";
import { CreateTournament } from "./components/Forms/CreateTournament";
import { useEffect, useState } from "react";

export default function Home() {
  const [ts, setTs] = useState(null);
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {
    async function getTs() {
      const res = await fetch("/api/get-tournaments", {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = await res.json();
      setTs(data);
    };
    return () => getTs();
  }, []);

  if (!ts) return null;

  return (
    <main>
      <Header>
        <button onClick={() => setShowWindow(true)}>Create tournament</button>
      </Header>
      <TournamentList ts={Object.values(ts)} />
      <Window showWindow={showWindow} setShowWindow={setShowWindow}>
        <CreateTournament ts={ts} setTs={setTs} />
      </Window>
    </main>
  );
};