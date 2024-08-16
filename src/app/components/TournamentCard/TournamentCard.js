import "./TournamentCard.css";
import Link from "next/link";

export default function TournamentCard({ t }) {
    return (
        <Link href={`/${t.id}`} className="tournament-card card">
            <p>{t.name}</p>
            <p>{t.date}</p>
            <p>{t.status}</p>
        </Link>
    );
};