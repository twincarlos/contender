'use server';

export async function getTournaments() {
  const response = await fetch(`${process.env.URL}/api/tournaments`);
  const tournaments = await response.json();
  return tournaments;
};