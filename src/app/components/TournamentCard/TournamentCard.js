import "./TournamentCard.css";
import Link from "next/link";

export default function TournamentCard({ tournament }) {
    return (
        <Link href={`/${tournament.id}`} className="tournament-card">
            <p>{tournament.name}</p>
            <p>{tournament.date}</p>
            <p>{tournament.status}</p>
        </Link>
    );
};