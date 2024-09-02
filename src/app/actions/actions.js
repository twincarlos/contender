"use server";
import { db } from "../drizzle/db";
import { ts, tes, egs, gms, ms, mps, eps, tps, gps } from "../drizzle/schema";
import { eq, sql, and, count, not, desc, asc } from "drizzle-orm";

export async function createT(data) {
  const t = await db.insert(ts).values(data).returning();
  return t[0];
};

export async function createTe(data) {
  const te = await db.insert(tes).values(data).returning();
  return te[0];
};

export async function beginGroups(teId) {
  const subquery = db.select({ id: ms.id })
    .from(ms)
    .innerJoin(gms, eq(ms.id, gms.matchId))
    .innerJoin(egs, eq(gms.eventGroupId, egs.id))
    .innerJoin(tes, eq(egs.tournamentEventId, tes.id))
    .where(eq(tes.id, teId));

  await db.update(ms)
    .set({ status: "ready" })
    .where(sql`${ms.id} IN (${subquery})`);
};

export async function updateMScore(mData) {
  const mpTop = db.update(mps).set({
    score1: mData.mps.top.score1,
    score2: mData.mps.top.score2,
    score3: mData.mps.top.score3,
    score4: mData.mps.top.score4,
    score5: mData.mps.top.score5,
    score6: mData.mps.top.score6,
    score7: mData.mps.top.score7,
    games: mData.mps.top.games,
    checkedIn: false,
    verified: false,
    isWinner: mData.mps.top.isWinner
  }).where(and(eq(mps.position, "top"), eq(mps.id, mData.mps.top.id)));
  const mpBottom = db.update(mps).set({
    score1: mData.mps.bottom.score1,
    score2: mData.mps.bottom.score2,
    score3: mData.mps.bottom.score3,
    score4: mData.mps.bottom.score4,
    score5: mData.mps.bottom.score5,
    score6: mData.mps.bottom.score6,
    score7: mData.mps.bottom.score7,
    games: mData.mps.bottom.games,
    checkedIn: false,
    verified: false,
    isWinner: mData.mps.bottom.isWinner
  }).where(and(eq(mps.position, "bottom"), eq(mps.id, mData.mps.bottom.id)));
  const m = db.update(ms).set({ status: mData.status }).where(eq(ms.id, mData.id));
  await Promise.all([mpTop, mpBottom, m]);
};

export async function playerCheckIn({ mId, mpId }) {
  const mp = await db.update(mps).set({ checkedIn: true }).where(eq(mps.id, mpId)).returning();
  const otherMp = await db.select({ checkedIn: mps.checkedIn }).from(mps).where(and(eq(mps.matchId, mId), eq(mps.position, mp[0].position === "top" ? "bottom" : "top")));
  if (mp[0].checkedIn && otherMp[0].checkedIn) {
    const m = await db.update(ms).set({ status: "in progress" }).where(eq(ms.id, mId)).returning();
    return { mp: mp[0], m: m[0] };
  } else {
    return { mp: mp[0] };
  };
};

export async function playerVerify({ egId, mId, mpId }) {
  const mp = await db.update(mps).set({ verified: true }).where(eq(mps.id, mpId)).returning();
  const otherMp = await db.select({ verified: mps.verified }).from(mps).where(and(eq(mps.matchId, mId), eq(mps.position, mp[0].position === "top" ? "bottom" : "top")));
  if (mp[0].verified && otherMp[0].verified) {
    const m = await db.update(ms).set({ status: "finished" }).where(eq(ms.id, mId)).returning();
    const notFinishedMs = await db.select({ count: count() })
      .from(ms)
      .innerJoin(gms, eq(ms.id, gms.matchId))
      .where(and(eq(gms.eventGroupId, egId), not(eq(ms.status, "finished"))));
    if (notFinishedMs[0].count === 0) {
      const eg = await db.update(egs).set({ status: "finished" }).where(eq(egs.id, egId)).returning();
      return { mp: mp[0], m: m[0], eg: eg[0] }; // if group is done
    } else {
      return { mp: mp[0], m: m[0] }; // if match is done
    };
  } else {
    return { mp: mp[0] }; // update player
  };
};

export async function generateGroups({ teId, preferGroupsOf }) {
  const data = {
    egs: {},
    gps: {},
    gms: {},
    ms: {}
  };

  async function groupPlayers(players) {
    const totalPlayers = players.length;
    const numGroups = Math.ceil(totalPlayers / preferGroupsOf);

    const groups = Array.from({ length: numGroups }, () => ({}));

    let direction = 1;
    let groupIndex = 0;

    for (const player of players) {
      if (!groups[groupIndex].id) {
        const newGroupQuery = await db.insert(egs).values({ tournamentEventId: teId, number: groupIndex + 1 }).returning();
        const newGroup = newGroupQuery[0];
        const newGroupPlayerQuery = await db.insert(gps).values({ eventGroupId: newGroup.id, eventPlayerId: player.id }).returning();
        const newGroupPlayer = newGroupPlayerQuery[0];

        groups[groupIndex] = { ...newGroup, gps: [{ ...newGroupPlayer, ep: { ...player } }] };
        data.egs = { ...data.egs, [newGroup.id]: { ...newGroup } };
        data.gps = { ...data.gps, [newGroup.id]: { ...data.gps[newGroup.id], [newGroupPlayer.id]: { ...newGroupPlayer, ep: { ...player } } } };
      }

      else {
        const newGroupPlayerQuery = await db.insert(gps).values({ eventGroupId: groups[groupIndex].id, eventPlayerId: player.id }).returning();
        const newGroupPlayer = newGroupPlayerQuery[0];
        groups[groupIndex] = { ...groups[groupIndex], gps: [...groups[groupIndex].gps, { ...newGroupPlayer, ep: { ...player } }] };
        data.gps = { ...data.gps, [groups[groupIndex].id]: { ...data.gps[groups[groupIndex].id], [newGroupPlayer.id]: { ...newGroupPlayer, ep: { ...player } } } };
      };

      groupIndex += direction;

      if (groupIndex === numGroups || groupIndex === -1) {
        direction *= -1;
        groupIndex += direction;
      };
    };

    return groups;
  };

  async function createPairings(groups) {
    for (let group of groups) {
      const n = group.gps.length;
      let sequence = 1;

      for (let round = 0; round < n - 1; round++) {
        for (let i = 0; i < n / 2; i++) {
          const playerA = group.gps[i];
          const playerB = group.gps[n - i - 1];

          const newMatchQuery = await db.insert(ms).values({ sequence }).returning();
          const newMatch = newMatchQuery[0];
          const newGroupMatchQuery = await db.insert(gms).values({ eventGroupId: group.id, matchId: newMatch.id }).returning();
          const newGroupMatch = newGroupMatchQuery[0];
          const newMatchPlayerAQuery = await db.insert(mps).values({ eventPlayerId: playerA.ep.id, matchId: newMatch.id, position: "top" }).returning();
          const newMatchPlayerA = newMatchPlayerAQuery[0];
          const newMatchPlayerBQuery = await db.insert(mps).values({ eventPlayerId: playerB.ep.id, matchId: newMatch.id, position: "bottom" }).returning();
          const newMatchPlayerB = newMatchPlayerBQuery[0];

          data.gms = {
            ...data.gms,
            [group.id]: {
              ...data.gms[group.id],
              [newGroupMatch.id]: { ...newGroupMatch }
            }
          };

          data.ms = {
            ...data.ms,
            [newMatch.id]: {
              ...newMatch,
              mps: {
                top: {
                  ...newMatchPlayerA,
                  ep: {
                    ...playerA.ep
                  }
                },
                bottom: {
                  ...newMatchPlayerB,
                  ep: {
                    ...playerB.ep
                  }
                }
              }
            }
          };

          sequence++;
        }

        const groupPlayers = [group.gps[0], ...group.gps.slice(-1), ...group.gps.slice(1, -1)];
        group = { ...group, gps: [...groupPlayers] };
      }
    };
  };

  const allEpsQuery = await db.select()
    .from(eps)
    .innerJoin(tps, eq(tps.id, eps.tournamentPlayerId))
    .orderBy(desc(tps.rating), asc(tps.name))
    .where(eq(eps.tournamentEventId, teId));
  const allEps = allEpsQuery.map(ep => ({
    ...ep.eps,
    tp: {
      ...ep.tps
    }
  }));

  const groups = await groupPlayers(allEps);
  await createPairings(groups);
  return data;
};