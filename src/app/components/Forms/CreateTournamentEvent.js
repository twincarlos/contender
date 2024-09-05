"use client";
import "./Forms.css";
import { useState } from "react";
import { createTe } from "@/app/actions/create";

export function CreateTournamentEvent({ t, setT }) {
    const [data, setData] = useState({
        tournamentId: t.id,
        name: "",
        groupsDate: "",
        groupsTime: "",
        drawDate: "",
        drawTime: "",
        type: "rr",
        status: "upcoming",
        allowUnratedAdvance: true,
        maxRating: null,
        maxAge: null
    });
    return (
        <div className="contender-form create-event">
            <p>Create event</p>
            <form action={async () => {
                const te = await createTe(data);
                setT({
                    ...t,
                    tes: {
                        ...t.tes,
                        [te.id]: te
                    }
                })
            }}>
                <label>
                    Event name
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData({ ...data, name: e.target.value })}
                    />
                </label>
                <label>
                    Event date
                    <input
                        type="date"
                        value={data.groupsDate}
                        onChange={e => setData({ ...data, groupsDate: e.target.value })}
                    />
                </label>
                <label>
                    Event time
                    <input
                        type="time"
                        value={data.groupsTime}
                        onChange={e => setData({ ...data, groupsTime: e.target.value })}
                    />
                </label>
                <label>
                    Draw date
                    <input
                        type="date"
                        value={data.drawDate}
                        onChange={e => setData({ ...data, drawDate: e.target.value })}
                    />
                </label>
                <label>
                    Draw time
                    <input
                        type="time"
                        value={data.drawTime}
                        onChange={e => setData({ ...data, drawTime: e.target.value })}
                    />
                </label>
                <fieldset value={data.type}>
                    <legend>Event type</legend>
                    <label>
                        <input
                            type="radio"
                            name="event-type"
                            value="rr"
                            checked={data.type === "rr"}
                            onChange={() => setData({ ...data, type: "rr" })}
                        />
                        rr
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="event-type"
                            value="grr"
                            checked={data.type === "grr"}
                            onChange={() => setData({ ...data, type: "grr" })}
                        />
                        grr
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="event-type"
                            value="teams"
                            checked={data.type === "teams"}
                            onChange={() => setData({ ...data, type: "teams" })}
                        />
                        teams
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="event-type"
                            value="handicap"
                            checked={data.type === "handicap"}
                            onChange={() => setData({ ...data, type: "handicap" })}
                        />
                        handicap
                    </label>
                </fieldset>
                <label>
                    Allow unrated players to advance
                    <input
                        type="checkbox"
                        defaultChecked={true}
                        value={data.allowUnratedAdvance}
                        onChange={e => setData({ ...data, allowUnratedAdvance: e.target.value })}
                    />
                </label>
                <label>
                    Rating must be under
                    <input
                        type="number"
                        value={data.maxRating || ""}
                        onChange={e => setData({ ...data, maxRating: e.target.value })}
                    />
                </label>
                <label>
                    Age must be under
                    <input
                        type="number"
                        value={data.maxAge || ""}
                        onChange={e => setData({ ...data, maxAge: e.target.value })}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};