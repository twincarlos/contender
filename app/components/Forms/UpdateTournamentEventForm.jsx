"use client";
import "./Forms.css";
import { useActionState } from "react";
import { socket } from "@/app/socket/socket";
import useFormSubmit from "@/app/hooks/useFormSubmit";
import { deleteTournamentEvent, updateTournamentEvent } from "@/app/actions/tournamentEvents";

export default function UpdateTournamentEventForm ({ tournamentEvent }) {
    const [updatedTournamentEvent, action, loading] = useActionState(updateTournamentEvent, undefined);

    useFormSubmit({
        data: updatedTournamentEvent,
        cb: (tournamentEvent) => socket.emit("update-tournament-event", tournamentEvent)
    });

    return (
        <form action={action}>
            <input type="hidden" name="tournament-event-id" value={tournamentEvent.id} />
            <label>
                <span>Event Name</span>
                <input type="text" name="tournament-event-name" defaultValue={tournamentEvent.name} />
            </label>
            <label>
                <span>Event Date</span>
                <input type="date" name="tournament-event-date" defaultValue={tournamentEvent.date} />
            </label>
            <label>
                <span>Event Time</span>
                <input type="time" name="tournament-event-time" defaultValue={tournamentEvent.time} />
            </label>
            <label>
                <label>
                    <span>Allow Unrated Players To Advance</span>
                    <input type="checkbox" name="allow-unrated-advance" defaultChecked={tournamentEvent.allowUnratedAdvance} defaultValue={tournamentEvent.allowUnratedAdvance} />
                </label>
                <span>Event Format</span>
                <select name="tournament-event-format" defaultValue={tournamentEvent.format}>
                    <option value="Singles">Singles</option>
                    <option value="Doubles">Doubles</option>
                    <option value="Teams">Teams</option>
                    <option value="Handicap">Handicap</option>
                </select>
            </label>
            <label>
                <span>Teams Format</span>
                <select name="tournament-event-teams-format" defaultValue={tournamentEvent.teamsFormat}>
                    <option value="Snake">Snake</option>
                    <option value="Olympic">Olympic</option>
                </select>
            </label>
            <div className="form-buttons">
                <button type="submit" disabled={loading} className="primary">
                    Submit
                </button>
                <ConfirmButton
                    name={"Update Event"}
                    cb={async () => {
                        await deleteTournamentEvent(tournamentEvent.id);
                        socket.emit("delete-tournament-event", {
                            tournamentEventId: tournamentEvent.id,
                            tournamentId: tournamentEvent.tournamentId
                        });
                    }}
                />
            </div>
        </form>
    );
};
