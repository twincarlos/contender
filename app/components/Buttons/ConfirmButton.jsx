"use client";
import { useState } from "react";
import { useModal } from "@/app/context/ModalContext";

export default function ConfirmButton({ name, cb }) {
    const [confirm, setConfirm] = useState(false);
    const { setContent } = useModal();

    if (confirm === true) {
        return (
            <div className="flex gap">
                <button
                    type="button"
                    className="confirm-button"
                    onClick={() => {
                        cb();
                        setContent(null);
                    }}
                >
                    <i className="fa-solid fa-check" />
                </button>
                <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setConfirm(false)}
                >
                    <i className="fa-solid fa-xmark" />
                </button>
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