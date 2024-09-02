export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { eq } from "drizzle-orm";
import { tes } from "@/app/drizzle/schema";
import { arrayToObject } from "../../utils";

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
                    gps: {
                        with: {
                            ep: {
                                with: {
                                    tp: true
                                }
                            }
                        }
                    },
                    gms: {
                        with: {
                            m: {
                                with: {
                                    mps: {
                                        with: {
                                            ep: {
                                                with: {
                                                    tp: true,
                                                },
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
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
        ms: te.egs.map(eg => arrayToObject(eg.gms.map(gm => {
            gm.m.mps = arrayToObject(gm.m.mps, "position");
            return gm.m;
        }), "id")).reduce((acc, currentObj) => {
            return { ...acc, ...currentObj };
        }, {})
    };
    return new Response(JSON.stringify(teData));
};