import "./EventCard.css";
import Link from "next/link";

export default function EventCard({ event }) {
    return (
        <Link href={`/${event.tournamentId}/${event.id}`} className="event-card">
            <p>{event.name}</p>
        </Link>
    );
};