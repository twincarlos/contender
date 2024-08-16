import { create } from "zustand";

export const useStore = create(set => ({
    te: null,
    setTe: async (eventId) => {
        const res = await fetch(`/api/get-event/${eventId}`, {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        const data = await res.json();
        set({ te: data })
    }
}));