"use client";
import "./Event.css";
import { useEffect } from "react";
import { useStore } from "@/app/store/store";
import { useSubscribe } from "@/app/hooks/useSubscribe";
import Header from "@/app/components/Header/Header";
import GroupList from "@/app/components/GroupList/GroupList";

export default function Event({ params }) {
    const te = useStore(state => state.te);
    const setTe = useStore(state => state.setTe);
    useEffect(() => { setTe(params.teId) }, []);
    // useSubscribe(params.teId);
    if (!te) return <p>loading</p>;

    return (
        <main className="event">
            <Header>
                <p>{te.name}</p>
                <button>Start groups</button>
            </Header>
            <GroupList />
        </main>
    );
};