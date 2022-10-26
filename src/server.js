import http from "http";
import express from "express";
import { Server } from "socket.io";


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);
// -> localhost:3000/socket.io/socket.io.js가 제공됨
// socket io is not implementation of websocket

wsServer.on("connection", (socket) => {
	socket.onAny(event => console.log(`Socket Event: ${event}`));
	socket.on("enter_room", (roomName, nickname, done) => {
		socket["nickname"] = nickname;
		socket.join(roomName);
		done();
		socket.to(roomName).emit("welcome", socket.nickname);
	});
	socket.on("disconnecting", () => {
		socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname));
	});
	socket.on("new_message", (message, room, done) => {
		socket.to(room).emit("new_message", `${socket.nickname} : ${message}`);
		done();
	});
});

httpServer.listen(3000, () => console.log(`Listening on http://localhost:3000`));