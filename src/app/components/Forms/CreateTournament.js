"use client";
import "./Forms.css";
import { useState } from "react";
import { createT } from "@/app/actions/actions";

export function CreateTournament({ ts, setTs }) {
    const [data, setData] = useState({
        name: "",
        date: "",
    });
    return (
        <div className="contender-form create-tournament">
            <p>Create tournament</p>
            <form action={async () => {
                const t = await createT(data);
                setTs({
                    ...ts,
                    [t.id]: t
                });
            }}>
                <label>
                    Tournament name
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData({ ...data, name: e.target.value })}
                    />
                </label>
                <label>
                    Tournament date
                    <input
                        type="date"
                        value={data.date}
                        onChange={e => setData({ ...data, date: e.target.value })}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};