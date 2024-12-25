"use client";
import Tournament from "../Tournament/Tournament";
import Gallery from "../Gallery/Gallery";

export default function Tournaments({ tournaments }) {
  return (
    <div>
      <Gallery>
        {Object.values(tournaments).map((tournament) => (
          <Tournament key={tournament.id} tournament={tournament} />
        ))}
      </Gallery>
    </div>
  );
};