import "./EventCard.css";
import Link from "next/link";

export default function EventCard({ te }) {
    return (
        <Link href={`/${te.tournamentId}/${te.id}`} className="event-card">
            <h3>{te.name}</h3>
            <p>{te.groupsDate}</p>
        </Link>
    );
};