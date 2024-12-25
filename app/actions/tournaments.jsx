"use server";

export async function createTournament(initialState, formData) {
  const tournamentName = formData.get("tournament-name");
  const tournamentDate = formData.get("tournament-date");
  const enableRanking = formData.get("enable-ranking") === "on";
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    id: 5,
    name: tournamentName,
    date: tournamentDate,
    ranking: enableRanking,
    status: "Upcoming"
  };
};