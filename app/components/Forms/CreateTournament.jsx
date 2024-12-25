"use client";
import "./Forms.css";
import { useActionState, useEffect } from "react";
import { createTournament } from "../../actions/tournaments";

export default function CreateTournament({ setTournaments }) {
  const [tournament, action, loading] = useActionState(createTournament, undefined);

  useEffect(() => {
    if (tournament) {
      setTournaments(tournaments => ({
        ...tournaments,
        [tournament.id]: tournament,
      }));
    }
  }, [tournament, setTournaments]);

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
}
