import "./page.css";
import Match from "./components/Match/Match";

export default function Home() {
  const match = {
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
    },
  };

  return (
    <main>
      <Match match={match} />
    </main>
  );
}
