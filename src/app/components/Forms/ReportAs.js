"use client";
import "./Forms.css";
import { useEffect, useState } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import { usePlayer } from "@/app/context/PlayerContext";

export function ReportAs({ tId }) {
    const [tps, setTps] = useState([]);
    const { playerId, setPlayerId } = usePlayer();
    const [openPlayer, setOpenPlayer] = useState({});
    const [userInput, setUserInput] = useState("");
    const [err, setErr] = useState(false);

    async function handleReportAs() {
        if (!openPlayer.dob) {
            localStorage.setItem("playerId", openPlayer.isAdmin ? "admin" : openPlayer.id);
            setPlayerId(openPlayer.isAdmin ? "admin" : openPlayer.id);
            setErr(false);
            setOpenPlayer({});
            setUserInput("");
            alert("Success - You do not have a DOB on file. Contact tournament director.");
        } else {
            const formattedDob = openPlayer.isAdmin ? openPlayer.dob : (openPlayer.dob.slice(5) + "-" + openPlayer.dob.slice(0, 4));
            if (userInput === formattedDob) {
                localStorage.setItem("playerId", openPlayer.isAdmin ? "admin" : openPlayer.id);
                setPlayerId(openPlayer.isAdmin ? "admin" : openPlayer.id);
                setErr(false);
                setOpenPlayer({});
                setUserInput("");
                alert("Success");
            } else {
                setErr(true);
                alert("Failure");
            };
        };
    };

    useEffect(() => {
        async function getTps() {
            const res = await fetch(`/api/get-tournament-players/${tId}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await res.json();
            setTps(data);
        };
        getTps();
    }, []);

    return (
        <div className="report-as-list">
            <h1>Report scores as:</h1>
            <div className="report-as-players">
                {
                    tps.map(tp => (
                        <div className={`report-as-player ${playerId == tp.id ? "selected" : ""}`} key={tp.id}>
                            <button className="up-down-arrow" onClick={() => {
                                setUserInput("");
                                setErr(false);
                                if (openPlayer.id === tp.id) {
                                    setOpenPlayer({});
                                } else {
                                    setOpenPlayer(tp);
                                };
                            }}>{openPlayer.id === tp.id ? <i className="fa-solid fa-chevron-up" /> : <i className="fa-solid fa-chevron-down" />}</button>
                            <div>
                                <PlayerCard tp={tp} />
                                {
                                    openPlayer.id === tp.id && (
                                        <div>
                                            {
                                                openPlayer.isAdmin ?
                                                    (
                                                        <input className={`${(err && openPlayer.id === tp.id) ? "error" : ""}`} placeholder="Password" type="text" value={userInput} onChange={e => {
                                                            setErr(false);
                                                            setUserInput(e.target.value);
                                                        }} />
                                                    ) : (
                                                        <input className={`${(err && openPlayer.id === tp.id) ? "error" : ""}`} placeholder="MM-DD-YYYY" type="text" value={userInput} onChange={e => {
                                                            setErr(false);
                                                            let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
                                                            if (value.length >= 3 && value.length <= 4) {
                                                                value = value.substring(0, 2) + "-" + value.substring(2);
                                                            } else if (value.length > 4) {
                                                                value = value.substring(0, 2) + "-" + value.substring(2, 4) + "-" + value.substring(4, 8);
                                                            }
                                                            e.target.value = value;
                                                            setUserInput(e.target.value);
                                                        }} />
                                                    )
                                            }
                                            <button onClick={handleReportAs}>Submit</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};