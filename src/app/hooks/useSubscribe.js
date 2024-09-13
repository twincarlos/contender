"use client";
import { useEffect } from "react";
import { PusherClient } from "../../../pusher";
import { msStore } from "../store/store";

export function useSubscribe(channel) {
    const {
        updateGameScore,
        setPlayerCheckIn,
        setPlayerVerify
    } = msStore(state => state);

    useEffect(() => {
        const pusher = PusherClient.subscribe(channel);

        pusher.bind("update game score", data => updateGameScore(data));
        pusher.bind("check in", data => setPlayerCheckIn(data));
        pusher.bind("verify", data => setPlayerVerify(data));

        return () => PusherClient.unsubscribe(channel);
    }, [channel]);
};