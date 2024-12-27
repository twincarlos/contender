import next from "next";
import { Server } from "socket.io";
import { createServer } from "node:http";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "supreme-trout-v7qx6r946vw2xvxq-3000.app.github.dev";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer, {
        cors: {
          origin: `https://${hostname}`,
          methods: ["GET", "POST"]
        }
      });

    io.on("connection", (socket) => {
        console.log(`User connected: **${socket.id}**`);

        socket.on("join-tournament", ({ id }) => {
            socket.join(id);
            console.log(`User joined tournament **${id}**`);
        });
        socket.on("update-tournament", ({ tournament }) => {
            socket.emit("update-tournament", tournament);
            console.log(`Tournament updated: **tournament-${tournament.id}**`);
        });
        socket.on("add-tournament", ({ tournament }) => {
            socket.emit("add-tournament", tournament);
            console.log(`Tournament added: **tournament-${tournament.id}**`);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });


    httpServer.listen(port, () => {
        console.log(`Server running on https://${hostname}:${port}`);
    });
});