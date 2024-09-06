export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { eq } from "drizzle-orm";
import { tes } from "@/app/drizzle/schema";
import { arrayToObject } from "@/app/utils";

export async function GET(req, { params }) {
    const te = await db.query.tes.findFirst({
        where: eq(tes.id, params.teId),
        with: {
            eps: {
                with: {
                    tp: true
                }
            },
            egs: {
                with: {
                    gps: true,
                    gms: {
                        with: {
                            m: {
                                with: {
                                    mps: true
                                }
                            }
                        }
                    }
                }
            },
            dms: {
                with: {
                    m: {
                        with: {
                            mps: true
                        }
                    }
                }
            }
        }
    });
    const dmsData = {};
    let firstRound = 0;
    te.dms.forEach(dm => {
        let top = dm.m.mps.find(mp => mp.position === "top");
        let bottom = dm.m.mps.find(mp => mp.position === "bottom");
        if (dm.round in dmsData) {
            dmsData[dm.round] = {
                ...dmsData[dm.round],
                [dm.id]: {
                    ...dm,
                    m: {
                        ...dm.m,
                        mps: {
                            top: top ? top : (firstRound < 2 ? { bye: true } : { upcoming: true }),
                            bottom: bottom ? bottom : (firstRound < 2 ? { bye: true } : { upcoming: true })
                        }
                    }
                }
            };
        } else {
            firstRound++;
            dmsData[dm.round] = {
                [dm.id]: {
                    ...dm,
                    m: {
                        ...dm.m,
                        mps: {
                            top: top ? top : (firstRound < 2 ? { bye: true } : { upcoming: true }),
                            bottom: bottom ? bottom : (firstRound < 2 ? { bye: true } : { upcoming: true })
                        }
                    }
                }
            };
        };
    });
    const teData = {
        te,
        eps: arrayToObject(te.eps, "id"),
        egs: arrayToObject(te.egs, "id"),
        gps: te.egs.map(eg => {
            const gpsData = {};
            eg.gps.forEach(gp => eg.id in gpsData ? gpsData[eg.id] = { ...gpsData[eg.id], [gp.id]: gp } : gpsData[eg.id] = { [gp.id]: gp });
            return gpsData;
        }).reduce((acc, currentObj) => {
            return { ...acc, ...currentObj };
        }, {}),
        gms: te.egs.map(eg => {
            const gmsData = {};
            eg.gms.forEach(gm => eg.id in gmsData ? gmsData[eg.id] = { ...gmsData[eg.id], [gm.id]: gm } : gmsData[eg.id] = { [gm.id]: gm });
            return gmsData;
        }).reduce((acc, currentObj) => {
            return { ...acc, ...currentObj };
        }, {}),
        dms: dmsData,
        ms: te.egs.map(eg => arrayToObject(eg.gms.map(gm => {
            gm.m.mps = arrayToObject(gm.m.mps, "position");
            return gm.m;
        }), "id")).reduce((acc, currentObj) => {
            return { ...acc, ...currentObj };
        }, {})
    };
    return new Response(JSON.stringify(teData));
};