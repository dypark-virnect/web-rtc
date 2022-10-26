const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

form.addEventListener("submit", event=>{
  event.preventDefault();
  const input = form.querySelector("input");
  // emit( event name, object )
  socket.emit("enter_room",
  { payload: input.value },
  ()=>{
    console.log("I'm done");
  });
  input.value = "";
})