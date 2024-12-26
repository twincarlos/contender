import { create } from "zustand";

export const useTournaments = create((set) => ({
    tournaments: {},

    setTournaments: (tournaments) =>
        (set(() => ({ tournaments }))),

    addTournament: (tournament) =>
        set((state) => ({ tournaments: { ...state.tournaments, [tournament.id]: tournament } })),

    updateTournament: (tournament) =>
        set((state) => ({ tournaments: { ...state.tournaments, [tournament.id]: tournament } })),

    removeTournament: (id) =>
        set((state) => {
            delete state.tournaments[id];
            return { tournaments: state.tournaments };
        }),
}));