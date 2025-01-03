"use client";
import Loading from "@/app/components/Loading/Loading";
import useFetch from "@/app/hooks/useFetch";
import { useTournament, useTournamentPlayers, useTournamentEvents } from "@/app/store/store";
import { redirect, useParams } from "next/navigation";
import { socket } from "@/app/socket/socket";
import { useEffect } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Tabs from "@/app/components/Tabs/Tabs";
import List from "@/app/components/List/List";
import TournamentPlayer from "@/app/components/TournamentPlayer/TournamentPlayer";
import UpdateTournamentPlayerButton from "@/app/components/Buttons/UpdateTournamentPlayerButton";
import TournamentEvent from "@/app/components/TournamentEvent/TournamentEvent";
import CreateTournamentPlayerButton from "@/app/components/Buttons/CreateTournamentPlayerButton";
import CreateTournamentEventButton from "@/app/components/Buttons/CreateTournamentEventButton";
import UpdateTournamentButton from "@/app/components/Buttons/UpdateTournamentButton";

export default function Tournament () {
  const { tournamentId } = useParams();
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
            <CreateTournamentPlayerButton tournamentId={tournamentId} />
          </li>
          <li>
            <CreateTournamentEventButton tournamentId={tournamentId} />
          </li>
          <li>
            <UpdateTournamentButton tournament={tournament} />
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