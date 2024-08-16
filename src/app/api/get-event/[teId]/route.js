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
    console.log(te);
    return new Response(JSON.stringify({
        ...te,
        eps: {
            ...arrayToObject(te.eps),
        },
        egs: {
            ...arrayToObject(te.egs.map(eg => ({
                ...eg,
                gps: {
                    ...arrayToObject(eg.gps)
                }
            })))
        }
    }));
};