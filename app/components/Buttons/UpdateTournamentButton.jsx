"use client";
import { useModal } from "@/app/context/ModalContext";
import UpdateTournamentForm from "../Forms/UpdateTournamentForm";

export default function UpdateTournamentButton({ tournament }) {
    const { setContent } = useModal();

    return (
        <button
            onClick={() =>
                setContent({
                    content: <UpdateTournamentForm tournament={tournament} />,
                    title: "Update Tournament",
                })
            }
            type="button"
            className="tertiary"
        >
            <i className="fa-solid fa-gears" /> Update Tournament
        </button>
    );
};