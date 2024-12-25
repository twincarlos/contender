"use server";

export async function createTournament(initialState, formData) {
  const tournamentName = formData.get("tournament-name");
  const tournamentDate = formData.get("tournament-date");
  const enableRanking = formData.get("enable-ranking") === "on";
  return {
    
  };
};