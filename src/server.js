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
	console.log(socket);
	socket.on("enter_room", (message, done) => {
		console.log(message);
		setTimeout(() => {
			done();
		}, 1000);
	});
});


httpServer.listen(3000, () => console.log(`Listening on http://localhost:3000`));