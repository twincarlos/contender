"use client";
import Navbar from "./components/Navbar/Navbar";
import { useModal } from "./context/ModalContext";
import useFetch from "./hooks/useFetch";
import Loading from "./components/Loading/Loading";
import { useTournaments } from "./store/store";
import { useEffect } from "react";
import { socket } from "./socket/socket";
import Tournament from "./components/Tournament/Tournament";
import Gallery from "./components/Gallery/Gallery";
import Card from "./components/Card/Card";
import Link from "next/link";
import CreateTournamentButton from "./components/Buttons/CreateTournamentButton";

export default function Home() {
  const { setContent } = useModal();
  const { tournaments, setTournaments, updateTournament, createTournament, deleteTournament } = useTournaments();

  const { loading } = useFetch({ url: "/api/tournaments", cb: setTournaments });

  useEffect(() => {
    socket.on("create-tournament", (tournament) => createTournament(tournament));
    socket.on("update-tournament", (tournament) => updateTournament(tournament));
    socket.on("delete-tournament", (id) => deleteTournament(id));
    return () => {
      socket.off("create-tournament");
      socket.off("update-tournament");
      socket.off("delete-tournament");
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <main>
      <Navbar>
        <h1>Tournaments</h1>
        <ul>
          <li>
            <CreateTournamentButton />
          </li>
        </ul>
      </Navbar>
      <Gallery
        identifier={"id"}
        items={Object.values(tournaments)}
        renderItem={(tournament) => (
          <Link href={`/tournament/${tournament.id}`}>
            <Card>
              <Tournament tournament={tournament} />
            </Card>
          </Link>
        )}
        searchBy={(tournament, keyword) => tournament.name.toLowerCase().includes(keyword.toLowerCase())}
      />
    </main>
  );
};