"use client";
import Player from "../../Player/Player";
import EditableScoreboard from "../../Scoreboard/EditableScoreboard";
import { useEffect, useState } from "react";
import Status from "../../Status/Status";

export default function EditableSinglesMatch({ matchId }) {
  const [match, setMatch] = useState(null);
  
  useEffect(() => {
    setMatch(null);
  }, [matchId]);
  
  if (!match) return null;

  return (
    <div className="singles-match">
      <Status status={match.status} />
      <Player player={match.players.player1} />
      <EditableScoreboard match={match} setMatch={setMatch} />
      <Player player={match.players.player2} />
    </div>
  );
};