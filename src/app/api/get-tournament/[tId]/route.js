export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { eq } from "drizzle-orm";
import { ts } from "@/app/drizzle/schema";
import { arrayToObject } from "../../utils";

export async function GET(req, { params }) {
    const t = await db.query.ts.findFirst({
        with: {
            tps: true,
            tes: true
        },
        where: eq(ts.id, params.tId)
    });
    return new Response(JSON.stringify({
        ...t,
        tps: arrayToObject(t.tps, "id"),
        tes: arrayToObject(t.tes, "id")
    }));
};