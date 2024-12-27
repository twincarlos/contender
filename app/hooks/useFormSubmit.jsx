"use client";
import { useEffect } from "react";
import { useModal } from "../context/ModalContext";

export default function useFormSubmit({ data, cb }) {
    const { setContent } = useModal();
    useEffect(() => {
        if (data) {
            cb(data);
            setContent(null);
        };
    }, [data, cb]);
};