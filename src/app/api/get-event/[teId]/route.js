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
                    tps: true
                }
            },
            egs: {
                with: {
                    gps: {
                        with: {
                            eps: {
                                with: {
                                    tps: true
                                }
                            }
                        }
                    },
                    gms: {
                        with: {
                            ms: {
                                with: {
                                    mps: {
                                        with: {
                                            eps: {
                                                with: {
                                                    tps: true,
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
    return new Response(JSON.stringify({
        ...te,
        eps: {
            ...arrayToObject(te.eps, "id"),
        },
        egs: {
            ...arrayToObject(te.egs.map(eg => ({
                ...eg,
                gps: arrayToObject(eg.gps.map(gp => {
                    const formattedGp = {
                        ...gp,
                        ep: {
                            ...gp.eps,
                            tp: gp.eps.tps
                        }
                    };
                    delete formattedGp.eps;
                    delete formattedGp.ep.tps;
                    return formattedGp;
                }), "id"),
                gms: arrayToObject(eg.gms.map(gm => {
                    const formattedGm = {
                        ...gm,
                        m: {
                            ...gm.ms,
                            mps: arrayToObject(gm.ms.mps.map(mp => {
                                const formattedMp = {
                                    ...mp,
                                    ep: {
                                        ...mp.eps,
                                        tp: mp.eps.tps
                                    }
                                };
                                delete formattedMp.eps;
                                delete formattedMp.ep.tps;
                                return formattedMp;
                            }), "position")
                        }
                    };
                    delete formattedGm.ms;
                    return formattedGm;
                }), "id")
            })), "id")
        },
    }));
};