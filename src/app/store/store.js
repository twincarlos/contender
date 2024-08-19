import { create } from "zustand";

export const teStore = create(set => ({
    te: null,
    setTe: te => set({ te })
}));

export const epsStore = create(set => ({
    eps: null,
    setEps: eps => set({ eps })
}));

export const egsStore = create(set => ({
    egs: null,
    setEgs: egs => set({ egs })
}));

export const gpsStore = create(set => ({
    gps: null,
    setGps: gps => set({ gps })
}));

export const gmsStore = create(set => ({
    gms: null,
    setGms: gms => set({ gms })
}));

export const msStore = create(set => ({
    ms: null,
    setMs: ms => set({ ms }),
    updateScore: data => set(state => ({
        ms: {
            ...state.ms,
            [data.msId]: {
                ...state.ms[data.msId],
                mps: {
                    ...state.ms[data.msId].mps,
                    [data.mpPosition]: {
                        ...state.ms[data.msId].mps[data.mpPosition],
                        [`score${data.n}`]: data.score
                    }
                }
            }
        }
    }))
}));