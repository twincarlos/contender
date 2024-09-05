"use client";
import "./Forms.css";
import { useState } from "react";
import { createTp } from "@/app/actions/create";

export function CreateTournamentPlayer({ t, setT }) {
    const [data, setData] = useState({
        tournamentId: t.id,
        name: "",
        rating: null,
        location: "",
        club: "",
        isAdmin: false,
        isEstimated: false,
        dob: ""
    });
    return (
        <div className="contender-form create-event">
            <p>Create tournament player</p>
            <form action={async () => {
                const tp = await createTp(data);
                setT({
                    ...t,
                    tps: {
                        ...t.tps,
                        [tp.id]: tp
                    }
                })
            }}>
                <label>
                    Name
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData({ ...data, name: e.target.value })}
                    />
                </label>
                <label>
                    Rating
                    <input
                        type="number"
                        value={data.rating || ""}
                        onChange={e => setData({ ...data, rating: e.target.value })}
                    />
                </label>
                <label>
                    Location
                    <input
                        type="text"
                        value={data.location}
                        onChange={e => setData({ ...data, location: e.target.value })}
                    />
                </label>
                <label>
                    Club
                    <input
                        type="text"
                        value={data.club}
                        onChange={e => setData({ ...data, club: e.target.value })}
                    />
                </label>
                <label>
                    Date of birth
                    <input
                        type="date"
                        value={data.dob}
                        onChange={e => setData({ ...data, dob: e.target.value })}
                    />
                </label>
                <label>
                    Make admin?
                    <input
                        type="checkbox"
                        value={data.isAdmin}
                        onChange={e => setData({ ...data, isAdmin: e.target.value })}
                    />
                </label>
                <label>
                    Is estimated?
                    <input
                        type="checkbox"
                        value={data.isEstimated}
                        onChange={e => setData({ ...data, isEstimated: e.target.value })}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};