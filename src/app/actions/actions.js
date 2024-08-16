"use server";
import { db } from "../drizzle/db";
import { ts, tes } from "../drizzle/schema";

export async function createT(data) {
  const t = await db.insert(ts).values(data).returning();
  return t[0];
};

export async function createTe(data) {
  const te = await db.insert(tes).values(data).returning();
  return te[0];
};