"use client";
import "./AdminActions.css";
import { useState } from "react";
import { usePlayer } from "@/app/context/PlayerContext";

export default function AdminActions({ children }) {
    const [showAdminActions, setShowAdminActions] = useState(false);
    const { playerId } = usePlayer();
    if (playerId !== "admin") return null;
    return (
        <div className="admin-actions">
            <button onClick={() => setShowAdminActions(!showAdminActions)}><i className="fa-solid fa-gear" /> Admin</button>
            {
                showAdminActions && (
                    <div className="admin-actions-buttons">
                        {children}
                    </div>
                )
            }
        </div>
    );
};