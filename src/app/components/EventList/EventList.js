import "./EventList.css";

export default function EventList({ events }) {
    return (
        <section className="event-list">
            { events.map(event => <p key={event.id}>{event.name}</p>) }
        </section>
    );
};