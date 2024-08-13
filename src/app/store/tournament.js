import { create } from "zustand";

export const tournamentStore = create(set => ({
    tournament: {},
    setTournament: async (tournamentId) => {
        const res = await fetch(`/api/get-tournament/${tournamentId}`, {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        const data = await res.json();
        set({ tournament: data })
    }
}));