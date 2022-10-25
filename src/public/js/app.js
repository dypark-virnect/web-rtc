const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nickNameForm = document.querySelector('#nickname');

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const message = { type, payload };
  return JSON.stringify(message);
}

socket.addEventListener("open", () => {
  console.log("Connected to the Server ✅");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from the Server ❌");
});

messageForm.addEventListener("submit", (event)=>{
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value="";
});

nickNameForm.addEventListener("submit", (event)=>{
  event.preventDefault();
  const input = nickNameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value="";
});