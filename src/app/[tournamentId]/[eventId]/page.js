"use client";
import { useEffect } from "react";
import "./Event.css";
import { useStore } from "@/app/store/store";

export default function Event({ params }) {
    const event = useStore(state => state.event);
    const setEvent = useStore(state => state.setEvent);
    useEffect(() => { setEvent(params.eventId) }, []);
    if (!event) return <p>loading</p>;

    return (
        <main className="event">
            Event
        </main>
    );
};