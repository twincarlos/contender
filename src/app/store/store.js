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
        set({ te: data });
    },

    updateGmGameScore: ({ egId, gmId, mpPosition, n, score }) => {
        set(state => ({
            te: {
                ...state.te,
                egs: {
                    ...state.te.egs,
                    [egId]: {
                        ...state.te.egs[egId],
                        gms: {
                            ...state.te.egs[egId].gms,
                            [gmId]: {
                                ...state.te.egs[egId].gms[gmId],
                                m: {
                                    ...state.te.egs[egId].gms[gmId].m,
                                    mps: {
                                        ...state.te.egs[egId].gms[gmId].m.mps,
                                        [mpPosition]: {
                                            ...state.te.egs[egId].gms[gmId].m.mps[mpPosition],
                                            [`score${n}`]: score
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }));
    }
}));