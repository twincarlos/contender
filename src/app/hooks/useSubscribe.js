"use client";
import { useEffect } from "react";
import { PusherClient } from "../../../pusher";

export function useSubscribe(channel) {
    useEffect(() => {
        const pusher = PusherClient.subscribe(channel);

        pusher.bind("example", () => {
            console.log("This is an example!")
        });

        return () => PusherClient.unsubscribe(channel);
    }, [channel]);
};