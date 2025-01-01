import { create } from "zustand";

export const useTournaments = create((set) => ({
    tournaments: {},

    setTournaments: (tournaments) =>
        (set(() => ({ tournaments }))),

    createTournament: (tournament) =>
    (set((state) => ({
        tournaments: {
            ...state.tournaments,
            [tournament.id]: tournament
        }
    }))),

    updateTournament: (tournament) =>
    (set((state) => ({
        tournaments: {
            ...state.tournaments,
            [tournament.id]: {
                ...state.tournaments[tournament.id],
                ...tournament
            }
        }
    }))),

    deleteTournament: (id) =>
    (set((state) => {
        delete state.tournaments[id];
        return {
            tournaments: state.tournaments
        };
    }))
}));

export const useTournament = create((set) => ({
    tournament: {},

    setTournament: (tournament) =>
        (set(() => ({ tournament }))),

    updateTournament: (tournament) =>
    (set((state) => ({
        tournament: {
            ...state.tournament,
            ...tournament
        }
    })))
}));

export const useTournamentPlayers = create((set) => ({
    tournamentPlayers: {},

    setTournamentPlayers: (tournamentPlayers) =>
        (set(() => ({ tournamentPlayers }))),

    createTournamentPlayer: (tournamentPlayer) =>
    (set((state) => ({
        tournamentPlayers: {
            ...state.tournamentPlayers,
            [tournamentPlayer.id]: tournamentPlayer
        }
    }))),

    updateTournamentPlayer: (tournamentPlayer) =>
    (set((state) => ({
        tournamentPlayers: {
            ...state.tournamentPlayers,
            [tournamentPlayer.id]: {
                ...state.tournamentPlayers[tournamentPlayer.id],
                ...tournamentPlayer
            }
        }
    }))),

    deleteTournamentPlayer: (id) =>
    (set((state) => {
        delete state.tournamentPlayers[id];
        return {
            tournamentPlayers: state.tournamentPlayers
        };
    }))
}));