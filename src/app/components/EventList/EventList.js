import "./EventList.css";
import EventCard from "../EventCard/EventCard";

export default function EventList({ events }) {
    return (
        <section className="event-list">
            { events.map(event => <EventCard key={event.id} event={event} />) }
        </section>
    );
};