"use client";
import "./Event.css";
import { useEffect } from "react";
import { epsStore, teStore, egsStore, gpsStore, gmsStore, msStore } from "@/app/store/store";
import Header from "@/app/components/Header/Header";
import GroupList from "@/app/components/GroupList/GroupList";

export default function Event({ params }) {
    const { te, setTe } = teStore(state => state);
    const setEps = epsStore(state => state.setEps);
    const setEgs = egsStore(state => state.setEgs);
    const setGps = gpsStore(state => state.setGps);
    const setGms = gmsStore(state => state.setGms);
    const setMs = msStore(state => state.setMs);
    useEffect(() => {
        async function setTeData() {
            const res = await fetch(`/api/get-event/${params.teId}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await res.json();
            console.log(data);
            setTe(data.te);
            setEps(data.eps);
            setEgs(data.egs);
            setGps(data.gps);
            setGms(data.gms);
            setMs(data.ms);
        };
        setTeData();
    }, []);
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