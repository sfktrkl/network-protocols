import WebSocket from "ws";

let ws = new WebSocket("ws://localhost:4000");

ws.onmessage = (event) => {
  console.log(`Received: ${event.data}`);
};

ws.onopen = () => {
  console.log(`Connected`);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (message) => {
    message = message.trim();
    ws.send(message);
  });
};

ws.onerror = (error) => {
  console.error(`WebSocket Error: ${error}`);
};
