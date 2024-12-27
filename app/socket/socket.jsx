"use client";
import { io } from "socket.io-client";
export const socket = io(`https://${process.env.NEXT_PUBLIC_HOSTNAME}`);