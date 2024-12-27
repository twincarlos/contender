"use client";
import { updateTournament } from "@/app/actions/tournaments";
import useFormSubmit from "@/app/hooks/useFormSubmit";
import { socket } from "@/app/socket/socket";
import { useActionState } from "react";

export default function UpdateTournament({ tournament }) {
  const [tournament, action, loading] = useActionState(updateTournament, undefined);

  useFormSubmit({ data: tournament, cb: (data) => {
    socket.emit("update-tournament", { tournament: data });
  }});

    return (
        <form action={action}>
            <label>
                <span>Tournament Name</span>
                <input type="text" name="tournament-name" />
            </label>
            <label>
                <span>Tournament Date</span>
                <input type="date" name="tournament-date" />
            </label>
            <label>
                <span>Enable Ranking</span>
                <input type="checkbox" name="enable-ranking" />
            </label>
            <button disabled={loading} className="primary">
                Submit
            </button>
        </form>
    );
};