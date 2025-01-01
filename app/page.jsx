"use client";
import Navbar from "./components/Navbar/Navbar";
import CreateTournament from "./components/Forms/CreateTournament";
import { useModal } from "./context/ModalContext";
import useFetch from "./hooks/useFetch";
import Loading from "./components/Loading/Loading";
import { useTournaments } from "./store/store";
import { useEffect } from "react";
import { socket } from "./socket/socket";
import Tournament from "./components/Tournament/Tournament";

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
            <button
              onClick={() =>
                setContent({
                  content: <CreateTournament />,
                  title: "Create Tournament",
                })
              }
              className="tertiary"
            >
              <i className="fa-solid fa-plus" /> Create Tournament
            </button>
          </li>
        </ul>
      </Navbar>
      <Gallery>
        {Object.values(tournaments).map((tournament) => (
          <Tournament key={tournament.id} tournament={tournament} />
        ))}
      </Gallery>
    </main>
  );
};