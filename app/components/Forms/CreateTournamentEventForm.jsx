"use client";
import "./Forms.css";
import { useActionState } from "react";
import { socket } from "@/app/socket/socket";
import useFormSubmit from "@/app/hooks/useFormSubmit";
import { createTournamentEvent } from "@/app/actions/tournamentEvents";

export default function CreateTournamentEventForm ({ tournamentId }) {
  const [tournamentEvent, action, loading] = useActionState(createTournamentEvent, undefined);

  useFormSubmit({
    data: tournamentEvent,
    cb: (tournamentEvent) => socket.emit("create-tournament-event", tournamentEvent)
  });

  return (
    <form action={action}>
      <input type="hidden" name="tournament-id" value={tournamentId} />
      <label>
        <span>Event Name</span>
        <input type="text" name="tournament-event-name" />
      </label>
      <label>
        <span>Event Date</span>
        <input type="date" name="tournament-event-date" />
      </label>
      <label>
        <span>Event Time</span>
        <input type="time" name="tournament-event-time" />
      </label>
      <label>
        <label>
          <span>Allow Unrated Players To Advance</span>
          <input type="checkbox" name="allow-unrated-advance" defaultChecked={false} defaultValue={false} />
        </label>
        <span>Event Format</span>
        <select name="tournament-event-format" defaultValue={"Singles"}>
          <option value="Singles">Singles</option>
          <option value="Doubles">Doubles</option>
          <option value="Teams">Teams</option>
          <option value="Handicap">Handicap</option>
        </select>
      </label>
      <label>
        <span>Teams Format</span>
        <select name="tournament-event-teams-format" defaultValue={"Snake"}>
          <option value="Snake">Snake</option>
          <option value="Olympic">Olympic</option>
        </select>
      </label>
      <div className="form-buttons">
        <button type="submit" disabled={loading} className="primary">
          Submit
        </button>
      </div>
    </form>
  );
};
