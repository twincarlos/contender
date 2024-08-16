import "./EventCard.css";
import Link from "next/link";

export default function EventCard({ te }) {
    return (
        <Link href={`/${te.tournamentId}/${te.id}`} className="event-card">
            <p>{te.name}</p>
        </Link>
    );
};