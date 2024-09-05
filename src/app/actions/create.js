"use server";
import { db } from "../drizzle/db";
import { ts, tps, tes, eps } from "../drizzle/schema";

export async function createT(data) {
    const t = await db.insert(ts).values(data).returning();
    return t[0];
};

export async function createTp(data) {
    const tp = await db.insert(tps).values(data).returning();
    return tp[0];
};

export async function createTe(data) {
    const te = await db.insert(tes).values(data).returning();
    return te[0];
};

export async function createEp(data) {
    const ep = await db.insert(eps).values(data).returning();
    return ep[0];
};