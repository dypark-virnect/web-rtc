const socket = io();

const welcome = document.getElementById("welcome");
const lobbyForm = welcome.querySelector("form");
const room = document.getElementById("room");

let roomName;
let nickname;
room.hidden = true;

function addMessage(message){
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event){
  event.preventDefault();
  const input = room.querySelector("#message input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () =>{
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function showRoom(){
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector("#message");
  form.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event){
  event.preventDefault();
  const roomInput = lobbyForm.querySelector("#room-name");
  const nameInput = lobbyForm.querySelector("#name");
  socket.emit("enter_room", roomInput.value, nameInput.value, showRoom);
  roomName = roomInput.value;
  nickname = nameInput.value;
  roomInput.value = "";
  nameInput.value = "";
}
lobbyForm.addEventListener("submit", handleRoomSubmit);


socket.on("welcome", (user) => addMessage(`${user} joined!🙌`));
socket.on("bye", (user) => addMessage(`${user} left🥲`));
socket.on("new_message", addMessage);