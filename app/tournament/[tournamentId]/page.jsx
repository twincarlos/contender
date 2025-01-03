"use client";
import Loading from "@/app/components/Loading/Loading";
import useFetch from "@/app/hooks/useFetch";
import { useTournament, useTournamentPlayers, useTournamentEvents } from "@/app/store/store";
import { redirect, useParams } from "next/navigation";
import { socket } from "@/app/socket/socket";
import { useEffect } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { useModal } from "@/app/context/ModalContext";
import UpdateTournament from "@/app/components/Forms/UpdateTournament";
import CreateTournamentPlayer from "@/app/components/Forms/CreateTournamentPlayer";
import Tabs from "@/app/components/Tabs/Tabs";
import List from "@/app/components/List/List";
import TournamentPlayer from "@/app/components/TournamentPlayer/TournamentPlayer";
import UpdateTournamentPlayerButton from "@/app/components/Buttons/UpdateTournamentPlayerButton";
import TournamentEvent from "@/app/components/TournamentEvent/TournamentEvent";
import CreateTournamentEvent from "@/app/components/Forms/CreateTournamentEvent";

export default function Tournament() {
  const { tournamentId } = useParams();
  const { setContent } = useModal();
  const { tournament, setTournament, updateTournament } = useTournament();
  const { tournamentPlayers, setTournamentPlayers, createTournamentPlayer, updateTournamentPlayer, deleteTournamentPlayer } = useTournamentPlayers();
  const { tournamentEvents, setTournamentEvents, createTournamentEvent, updateTournamentEvent, deleteTournamentEvent } = useTournamentEvents();

  const { loading } = useFetch({
    url: `/api/tournament/${tournamentId}`, cb: ({ tournament, tournamentPlayers, tournamentEvents }) => {
      setTournament(tournament);
      setTournamentPlayers(tournamentPlayers);
      setTournamentEvents(tournamentEvents);
    }
  });

  useEffect(() => {
    socket.emit("join-tournament", tournamentId);

    socket.on("update-single-tournament", (tournament) => updateTournament(tournament));
    socket.on("delete-single-tournament", () => redirect("/"));

    socket.on("create-tournament-player", (tournamentPlayer) => createTournamentPlayer(tournamentPlayer));
    socket.on("update-tournament-player", (tournamentPlayer) => updateTournamentPlayer(tournamentPlayer));
    socket.on("delete-tournament-player", (tournamentPlayerId) => deleteTournamentPlayer(tournamentPlayerId));

    socket.on("create-tournament-event", (tournamentEvent) => createTournamentEvent(tournamentEvent));
    socket.on("update-tournament-event", (tournamentEvent) => updateTournamentEvent(tournamentEvent));
    socket.on("delete-tournament-event", (tournamentEventId) => deleteTournamentEvent(tournamentEventId));
    return () => {
      socket.off("update-single-tournament");
      socket.off("delete-single-tournament");

      socket.off("create-tournament-player");
      socket.off("update-tournament-player");
      socket.off("delete-tournament-player");

      socket.off("create-tournament-event");
      socket.off("update-tournament-event");
      socket.off("delete-tournament-event");
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
                  content: <CreateTournamentEvent tournamentId={tournament.id} />,
                  title: "Add Event",
                })
              }
              className="tertiary"
            >
              <i className="fa-solid fa-plus" /> Add Event
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
                <TournamentPlayer tournamentPlayer={tournamentPlayer} />
              </div>
            )}
            searchBy={(tournamentPlayer, keyword) => {
              if (tournamentPlayer.name.toLowerCase().includes(keyword.toLowerCase())) return true;
              if (tournamentPlayer.club && tournamentPlayer.club.toLowerCase().includes(keyword.toLowerCase())) return true;
              if (tournamentPlayer.location && tournamentPlayer.location.toLowerCase().includes(keyword.toLowerCase())) return true;
              return false;
            }}
          />
        },
        {
          name: "Events",
          content: <List
            identifier={"id"}
            items={Object.values(tournamentEvents)}
            renderItem={(tournamentEvent) => (
              <TournamentEvent tournamentEvent={tournamentEvent} />
            )}
            searchBy={(tournamentEvent, keyword) => tournamentEvent.name.toLowerCase().includes(keyword.toLowerCase())}
          />
        }
      ]}
      />
    </main>
  );
};