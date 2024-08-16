import "./EventList.css";
import EventCard from "../EventCard/EventCard";

export default function EventList({ tes }) {
    return (
        <section className="event-list">
            { tes.map(te => <EventCard key={te.id} te={te} />) }
        </section>
    );
};