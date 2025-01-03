"use client";
import { useModal } from "@/app/context/ModalContext";
import CreateTournamentForm from "../Forms/CreateTournamentForm";

export default function CreateTournamentButton() {
    const { setContent } = useModal();
    return (
        <button
            onClick={() =>
                setContent({
                    content: <CreateTournamentForm />,
                    title: "Create Tournament",
                })
            }
            className="tertiary"
            type="button"
        >
            <i className="fa-solid fa-plus" /> Create Tournament
        </button>
    );
};