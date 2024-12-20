import { create } from "zustand";

export const useMatchStore = create((set, get) => ({
  matches: {
    1: {
      id: 1,
      type: "Singles",
      status: "Upcoming",
      bestOf: 3,
      players: {
        player1: {
          id: 1
        },
        player2: {
          id: 2
        }
      }
    }
  },

  getMatchById: (id) => get().matches[id],
}));

export const usePlayerStore = create((set, get) => ({
  players: {
    1: {
      id: 1,
      name: "Player One",
      rating: 5,
      club: "BTTC",
      location: "FL"
    },
    2: {
      id: 2,
      name: "Player Two",
      rating: 8,
      club: "BTTC",
      location: "FL"
    }
  },

  getPlayerById: (id) => get().players[id]
}));

export const useScoreStore = create((set, get) => ({
  scores: {
    1: {
      score1: 11,
      score2: 11,
      score3: 11
    },
    2: {
      score1: 9,
      score2: 9,
      score3: 9
    }
  },

  getGameScore: (playerId, gameNumber) => get().scores[playerId][`score${gameNumber}`],
}));