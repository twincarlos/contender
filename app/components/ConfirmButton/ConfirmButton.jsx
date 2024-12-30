"use client";
import "./ConfirmButton.css";
import { useState } from "react";

export default function ConfirmButton ({ name, cb }) {
    const [confirm, setConfirm] = useState(false);

    if (confirm === true) {
        return (
            <div className="flex gap">
                <button type="button" onClick={cb} className="confirm-button"><i className="fa-solid fa-check" /></button>
                <button type="button" className="cancel-button" onClick={() => setConfirm(false)}><i className="fa-solid fa-xmark" /></button>
            </div>
        );
    };

    if (confirm === false) {
        return (
            <button type="button" onClick={() => setConfirm(true)} className="delete-button">
                {name}
            </button>
        );
    };
};