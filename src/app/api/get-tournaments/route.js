export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { arrayToObject } from "../utils";

export async function GET() {
    const ts = await db.query.ts.findMany();
    return new Response(JSON.stringify(arrayToObject(ts, "id")));
};