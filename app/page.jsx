"use client";
import Tournaments from "./components/Tournaments/Tournaments";
import Navbar from "./components/Navbar/Navbar";
import CreateTournament from "./components/Forms/CreateTournament";
import { useModal } from "./context/ModalContext";
import useFetch from "./hooks/useFetch";
import Loading from "./components/Loading/Loading";
import { useTournaments } from "./store/store";
import { useEffect } from "react";
import { socket } from "./socket/socket";

export default function Home() {
  const { setContent } = useModal();
  const { tournaments, setTournaments, updateTournament, addTournament, deleteTournament } = useTournaments();

  const { loading } = useFetch({ url: "/api/tournaments", cb: setTournaments });

  useEffect(() => {
    socket.on("add-tournament", (tournament) => addTournament(tournament));
    socket.on("update-tournament", (tournament) => updateTournament(tournament));
    socket.on("delete-tournament", (id) => deleteTournament(id));
    return () => {
      socket.off("add-tournament");
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
      <Tournaments tournaments={tournaments} />
    </main>
  );
};