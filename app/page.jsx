import "./page.css";
import Match from "./components/Match/Match";

export default function Home() {
  const match = {
    type: 'Singles',
    status: 'Upcoming',
    players: {
      player1: {
        name: "Player One",
        rating: 5,
        club: "BTTC",
        location: "FL"
      },
      player2: {
        name: "Player Two",
        rating: 8,
        club: "BTTC",
        location: "FL"
      }
    },
    scores: {
      1: {
        score1: 11,
        score2: 7,
      },
      2: {
        score1: 9,
        score2: 11,
      },
      3: {
        score1: 11,
        score2: 8,
      },
    },
  };

  return (
    <main>
      <Match match={match} />
    </main>
  );
}
