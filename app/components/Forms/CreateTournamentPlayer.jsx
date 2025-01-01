"use client";
import "./Forms.css";
import { useActionState } from "react";
import { socket } from "@/app/socket/socket";
import useFormSubmit from "@/app/hooks/useFormSubmit";
import { createTournamentPlayer } from "@/app/actions/tournamentPlayers";

export default function CreateTournamentPlayer({ tournamentId }) {
  const [tournamentPlayer, action, loading] = useActionState(createTournamentPlayer, undefined);

  useFormSubmit({
    data: tournamentPlayer,
    cb: (tournamentPlayer) => socket.emit("create-tournament-player", tournamentPlayer)
  });

  return (
    <form action={action}>
      <input type="hidden" name="tournament-id" value={tournamentId} />
      <input type="hidden" name="is-rated" value={false} />
      <label>
        <span>Player Name</span>
        <input type="text" name="tournament-player-name" />
      </label>
      <label>
        <span>Player Rating</span>
        <input type="number" name="tournament-player-rating" />
      </label>
      <label>
        <span>Player DOB</span>
        <input type="date" name="tournament-player-dob" />
      </label>
      <label>
        <span>Player Location</span>
        <input type="text" name="tournament-player-location" />
      </label>
      <label>
        <span>Player Club</span>
        <input type="text" name="tournament-player-club" />
      </label>
      <div className="form-buttons">
        <button type="submit" disabled={loading} className="primary">
          Submit
        </button>
      </div>
    </form>
  );
}
