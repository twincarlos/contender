import { create } from "zustand";

export const teStore = create(set => ({
    te: null,
    setTe: te => set({ te })
}));

export const epsStore = create(set => ({
    eps: null,
    setEps: eps => set({ eps }),
    addEp: ep => set(state => ({
        eps: {
            ...state.eps,
            [ep.id]: ep
        }
    }))
}));

export const egsStore = create(set => ({
    egs: null,
    setEgs: egs => set({ egs }),
    setEgsReady: () => set(state => {
        const egsData = Object.keys(state.egs).reduce((acc, key) => {
            acc[key] = {
                ...state.ms[key],
                status: "ready"
            };
            return acc;
        }, {});
        return { egs: egsData };
    }),
    setEgStatus: eg => set(state => ({
        egs: {
            ...state.egs,
            [eg.id]: {
                ...state.egs[eg.id],
                status: eg.status
            }
        }
    }))
}));

export const gpsStore = create(set => ({
    gps: null,
    setGps: gps => set({ gps }),
    setGpPositions: gps => set(state => {
        const gpsData = JSON.parse(JSON.stringify(state.gps));
        gps.forEach(gp => gpsData[gp.eventGroupId][gp.id] = gp);
        return { gps: gpsData };
    })
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
    }),
    setPlayerCheckIn: ({ m, mp }) => set(state => ({
        ms: {
            ...state.ms,
            [mp.matchId]: {
                ...state.ms[mp.matchId],
                status: m ? "in progress" : "ready",
                mps: {
                    ...state.ms[mp.matchId].mps,
                    [mp.position]: {
                        ...state.ms[mp.matchId].mps[mp.position],
                        checkedIn: true
                    }
                }
            }
        }
    })),
    setPlayerVerify: ({ m, mp }) => set(state => ({
        ms: {
            ...state.ms,
            [mp.matchId]: {
                ...state.ms[mp.matchId],
                status: m ? "finished" : "pending",
                mps: {
                    ...state.ms[mp.matchId].mps,
                    [mp.position]: {
                        ...state.ms[mp.matchId].mps[mp.position],
                        verified: true
                    }
                }
            }
        }
    }))
}));