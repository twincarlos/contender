"use client";
import "./AdminActions.css";
import { useState } from "react";

export default function AdminActions({ children }) {
    const [showAdminActions, setShowAdminActions] = useState(false);
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