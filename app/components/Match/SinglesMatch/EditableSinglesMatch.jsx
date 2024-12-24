"use client";
import Player from "../../Player/Player";
import EditableScoreboard from "../../Scoreboard/EditableScoreboard";
import { useEffect, useState } from "react";
import Status from "../../Status/Status";

export default function EditableSinglesMatch({ matchId }) {
  const [match, setMatch] = useState(null);
  
  useEffect(() => {
    setMatch(
      {
        id: 1,
        status: 'Upcoming',
        type: 'Singles',
        bestOf: 5,
        gamesNeededToWin: 3,
        players: {
          player1: {
            id: 1,
            name: 'Carlos Rodriguez',
            rating: 2031,
            club: 'Broward TTC',
            location: 'FL'
          },
          player2: {
            id: 2,
            name: 'Ricardo Ortiz',
            rating: 2150,
            club: 'Doral TTC',
            location: 'FL'
          }
        },
        winnerId: null,
        matchScore: {
          score1: 0,
          score2: 0
        },
        scores: {
          1: { score1: 0, score2: 0 },
          2: { score1: 0, score2: 0 },
          3: { score1: 0, score2: 0 },
          4: { score1: 0, score2: 0 },
          5: { score1: 0, score2: 0 },
        }
      }
    );
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
}
