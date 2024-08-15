"use client";
import "./Event.css";
import { useEffect } from "react";
import { useStore } from "@/app/store/store";
import { useSubscribe } from "@/app/hooks/useSubscribe";
import Header from "@/app/components/Header/Header";
import GroupList from "@/app/components/GroupList/GroupList";

export default function Event({ params }) {
    const event = useStore(state => state.event);
    const setEvent = useStore(state => state.setEvent);
    useEffect(() => { setEvent(params.eventId) }, []);
    useSubscribe(params.eventId);
    if (!event) return <p>loading</p>;

    return (
        <main className="event">
            <Header>
                <p>{event.name}</p>
                <button>Start groups</button>
            </Header>
            <GroupList />
        </main>
    );
};