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
    updateScore: m => set(state => ({
        ms: {
            ...state.ms,
            [m.id]: m
        }
    })),
    setGroupMatchesReady: () => set(state => {
        const msData = Object.keys(state.ms).reduce((acc, key) => {
            acc[key] = {
                ...state.ms[key],
                status: "ready"
            };
            return acc;
        }, {});
        return { ms: msData };
    })
}));