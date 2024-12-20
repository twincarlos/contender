'use client';
import "./page.css";
import Match from "./components/Match/Match";
import { useMatchStore } from "./store/store";

export default function Home() {
  const { getMatchById } = useMatchStore();
  const match = getMatchById(1);
  return (
    <main>
      <Match match={match} />
    </main>
  );
};