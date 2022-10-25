const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to the Server ✅");
    socket.send("hi i am browser");
});

socket.addEventListener("message", (message) => {
  console.log(message);
    console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from the Server ❌");
});

setTimeout(() => {
  socket.send("hello from the browser!");
},1000);