"use client";
import { useModal } from "@/app/context/ModalContext";
import CreateTournamentPlayerForm from "../Forms/CreateTournamentPlayerForm";

export default function CreateTournamentPlayerButton({ tournamentId }) {
    const { setContent } = useModal();
    return (
        <button
            onClick={() =>
                setContent({
                    content: <CreateTournamentPlayerForm tournamentId={tournamentId} />,
                    title: "Add Player",
                })
            }
            className="tertiary"
            type="button"
        >
            <i className="fa-solid fa-plus" /> Add Player
        </button>
    );
};