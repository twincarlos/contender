"use client";
import "./Forms.css";
import { useActionState } from "react";
import { socket } from "@/app/socket/socket";
import useFormSubmit from "@/app/hooks/useFormSubmit";
import { deleteTournamentPlayer, updateTournamentPlayer } from "@/app/actions/tournamentPlayers";
import ConfirmButton from "../Buttons/ConfirmButton";

export default function UpdateTournamentPlayer({ tournamentPlayer }) {
  const [updatedTournamentPlayer, action, loading] = useActionState(updateTournamentPlayer, undefined);

  useFormSubmit({
    data: updatedTournamentPlayer,
    cb: (tournamentPlayer) => socket.emit("update-tournament-player", tournamentPlayer)
  });

  return (
    <form action={action}>
      <input type="hidden" name="tournament-player-id" value={tournamentPlayer.id} />
      <label>
        <span>Player Name</span>
        <input type="text" name="tournament-player-name" defaultValue={tournamentPlayer.name} />
      </label>
      <label>
        <span>Player Rating</span>
        <input type="number" name="tournament-player-rating" defaultValue={tournamentPlayer.rating} />
      </label>
      <label>
        <span>Player DOB</span>
        <input type="date" name="tournament-player-dob" defaultValue={tournamentPlayer.dob} />
      </label>
      <label>
        <span>Player Location</span>
        <input type="text" name="tournament-player-location" defaultValue={tournamentPlayer.location} />
      </label>
      <label>
        <span>Player Club</span>
        <input type="text" name="tournament-player-club" defaultValue={tournamentPlayer.club} />
      </label>
      <div className="form-buttons">
        <button type="submit" disabled={loading} className="primary">
          Submit
        </button>
        <ConfirmButton
          name={"Delete Player"}
          cb={async () => {
            await deleteTournamentPlayer(tournamentPlayer.id);
            socket.emit("delete-tournament-player", {
              tournamentId: tournamentPlayer.tournamentId,
              tournamentPlayerId: tournamentPlayer.id
            });
          }}
        />
      </div>
    </form>
  );
};