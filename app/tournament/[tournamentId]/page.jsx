"use client";
import Loading from "@/app/components/Loading/Loading";
import useFetch from "@/app/hooks/useFetch";
import { useTournament } from "@/app/store/store";
import { redirect, useParams } from "next/navigation";
import { socket } from "@/app/socket/socket";
import { useEffect } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { useModal } from "@/app/context/ModalContext";
import UpdateTournament from "@/app/components/Forms/UpdateTournament";

export default function Tournament() {
  const { tournamentId } = useParams();
  const { setContent } = useModal();
  const { tournament, setTournament, updateTournament } = useTournament();

  const { loading } = useFetch({ url: `/api/tournament/${tournamentId}`, cb: setTournament });

  useEffect(() => {
    socket.emit("join-tournament", tournamentId);
    socket.on("update-single-tournament", (tournament) => updateTournament(tournament));
    socket.on("delete-single-tournament", () => redirect("/"));
    return () => {
      socket.off("update-single-tournament");
      socket.off("delete-single-tournament");
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
    </main>
  );
};