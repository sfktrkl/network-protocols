import dgram from "dgram";
const server = dgram.createSocket("udp4");

server.on("message", (msg, info) => {
  console.log(`Received: ${msg} from ${info.address}:${info.port}`);
});

const PORT = 4000;
const address = "localhost";
server.bind(PORT, address);
server.on("listening", () => {
  console.log(`Server is listening on port ${PORT}`);
});
