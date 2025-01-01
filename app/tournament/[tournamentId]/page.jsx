"use client";
import "./page.css";
import Loading from "@/app/components/Loading/Loading";
import useFetch from "@/app/hooks/useFetch";
import { useTournament, useTournamentPlayers } from "@/app/store/store";
import { redirect, useParams } from "next/navigation";
import { socket } from "@/app/socket/socket";
import { useEffect } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { useModal } from "@/app/context/ModalContext";
import UpdateTournament from "@/app/components/Forms/UpdateTournament";
import CreateTournamentPlayer from "@/app/components/Forms/CreateTournamentPlayer";
import Tabs from "@/app/components/Tabs/Tabs";
import List from "@/app/components/List/List";
import Player from "@/app/components/Player/Player";
import UpdateTournamentPlayerButton from "@/app/components/Buttons/UpdateTournamentPlayerButton";

export default function Tournament() {
  const { tournamentId } = useParams();
  const { setContent } = useModal();
  const { tournament, setTournament, updateTournament } = useTournament();
  const { tournamentPlayers, setTournamentPlayers, createTournamentPlayer, updateTournamentPlayer, deleteTournamentPlayer } = useTournamentPlayers();

  const { loading } = useFetch({
    url: `/api/tournament/${tournamentId}`, cb: ({ tournament, tournamentPlayers }) => {
      setTournament(tournament);
      setTournamentPlayers(tournamentPlayers);
    }
  });

  useEffect(() => {
    socket.emit("join-tournament", tournamentId);
    socket.on("update-single-tournament", (tournament) => updateTournament(tournament));
    socket.on("delete-single-tournament", () => redirect("/"));
    socket.on("create-tournament-player", (tournamentPlayer) => createTournamentPlayer(tournamentPlayer));
    socket.on("update-tournament-player", (tournamentPlayer) => updateTournamentPlayer(tournamentPlayer));
    socket.on("delete-tournament-player", (tournamentPlayerId) => deleteTournamentPlayer(tournamentPlayerId));
    return () => {
      socket.off("update-single-tournament");
      socket.off("delete-single-tournament");
      socket.off("create-tournament-player");
      socket.off("update-tournament-player");
      socket.off("delete-tournament-player");
    };
  }, [tournamentId]);

  if (loading) return <Loading />;

  return (
    <main>
      <Navbar>
        <h1>{tournament.name}</h1>
        <ul>
          <li>
            <button
              onClick={() =>
                setContent({
                  content: <CreateTournamentPlayer tournamentId={tournament.id} />,
                  title: "Add Player",
                })
              }
              className="tertiary"
            >
              <i className="fa-solid fa-plus" /> Add Player
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                setContent({
                  content: <UpdateTournament tournament={tournament} />,
                  title: "Update Tournament",
                })
              }
              className="tertiary"
            >
              <i className="fa-solid fa-gears" /> Update Tournament
            </button>
          </li>
        </ul>
      </Navbar>
      <Tabs tabs={[
        {
          name: "Players",
          content: <List
            identifier={"id"}
            items={Object.values(tournamentPlayers)}
            renderItem={(tournamentPlayer) => (
              <div className="flex">
                <UpdateTournamentPlayerButton tournamentPlayer={tournamentPlayer} />
                <Player player={tournamentPlayer} />
              </div>
            )}
          />
        }
      ]}
      />
    </main>
  );
};