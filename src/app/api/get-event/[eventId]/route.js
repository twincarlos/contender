export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { eventGroup, groupPlayer, tournamentEvent } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";
import { arrayToObject } from "../../utils";

export async function GET(req, { params }) {
    const event = await db.query.tournamentEvent.findFirst({
        where: eq(tournamentEvent.id, params.eventId),
        with: {
            eventPlayer: {
                with: {
                    tournamentPlayer: true
                }
            },
            eventGroup: {
                with: {
                    groupPlayer: {
                        with: {
                            eventPlayer: {
                                with: {
                                    tournamentPlayer: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return new Response(JSON.stringify({
        ...event,
        eventPlayer: {
            ...arrayToObject(event.eventPlayer),
        },
        eventGroup: {
            ...arrayToObject(event.eventGroup.map(eventGroup => ({
                ...eventGroup,
                groupPlayer: {
                    ...arrayToObject(eventGroup.groupPlayer)
                }
            })))
        }
    }));
};