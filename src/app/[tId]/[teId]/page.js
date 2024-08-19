"use client";
import "./Event.css";
import { useEffect } from "react";
import { useStore } from "@/app/store/store";
import Header from "@/app/components/Header/Header";
import GroupList from "@/app/components/GroupList/GroupList";

export default function Event({ params }) {
    const { te, setTe } = useStore(state => state);
    useEffect(() => { setTe(params.teId) }, []);
    if (!te) return <p>loading</p>;

    return (
        <main className="event">
            <Header>
                <p>{te.name}</p>
                <button>Start groups</button>
            </Header>
            <GroupList egs={te.egs} />
        </main>
    );
};