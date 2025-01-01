"use client";
import "./Forms.css";
import { useActionState } from "react";
import useFormSubmit from "@/app/hooks/useFormSubmit";
import { createTournament } from "../../actions/tournaments";
import { socket } from "@/app/socket/socket";

export default function CreateTournament() {
  const [tournament, action, loading] = useActionState(createTournament, undefined);

  useFormSubmit({
    data: tournament,
    cb: (tournament) => socket.emit("create-tournament", tournament)
  });

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
      <div className="form-buttons">
        <button type="submit" disabled={loading} className="primary">
          Submit
        </button>
      </div>
    </form>
  );
}
