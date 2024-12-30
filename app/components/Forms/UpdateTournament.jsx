"use client";
import "./Forms.css";
import { deleteTournament, updateTournament } from "@/app/actions/tournaments";
import useFormSubmit from "@/app/hooks/useFormSubmit";
import { socket } from "@/app/socket/socket";
import { useActionState } from "react";
import ConfirmButton from "../ConfirmButton/ConfirmButton";

export default function UpdateTournament({ tournament }) {
    const [updatedTournament, action, loading] = useActionState(updateTournament, undefined);

    useFormSubmit({
        data: updatedTournament, cb: (data) => {
            socket.emit("update-tournament", data);
        }
    });

    return (
        <form action={action}>
            <input type="hidden" name="tournament-id" value={tournament.id} />
            <label>
                <span>Tournament Name</span>
                <input type="text" name="tournament-name" defaultValue={tournament.name} />
            </label>
            <label>
                <span>Tournament Date</span>
                <input type="date" name="tournament-date" defaultValue={tournament.date} />
            </label>
            <label>
                <span>Enable Ranking</span>
                <input type="checkbox" name="enable-ranking" defaultChecked={tournament.ranked} defaultValue={tournament.ranked} />
            </label>
            <div className="form-buttons">
                <button type="submit" disabled={loading} className="primary">
                    Submit
                </button>
                <ConfirmButton name={"Delete Tournament"} cb={async () => {
                    await deleteTournament(tournament.id);
                    socket.emit("delete-tournament", tournament.id);
                }} />
            </div>
        </form>
    );
};