"use client";

import { useModal } from "@/app/context/ModalContext";
import CreateTournamentEventForm from "../Forms/CreateTournamentEventForm";

export default function CreateTournamentEventButton({ tournamentId }) {
    const { setContent } = useModal();
    return (
        <button
            onClick={() =>
                setContent({
                    content: <CreateTournamentEventForm tournamentId={tournamentId} />,
                    title: "Add Event",
                })
            }
            className="tertiary"
        >
            <i className="fa-solid fa-plus" /> Add Event
        </button>
    );
};