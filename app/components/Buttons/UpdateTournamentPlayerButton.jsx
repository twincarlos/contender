"use client";
import { useModal } from "@/app/context/ModalContext";
import UpdateTournamentPlayer from "../Forms/UpdateTournamentPlayer";

export default function UpdateTournamentPlayerButton({ tournamentPlayer }) {
    const { setContent } = useModal();

    return (
        <button
            type="button"
            className="update-tournament-player-button"
            onClick={() => setContent({
                title: "Update Player",
                content: <UpdateTournamentPlayer tournamentPlayer={tournamentPlayer} />
            })}
        >
            <i className="fa-regular fa-pen-to-square" />
        </button>
    );
};