import net from "net";
const server = net.createServer();

server.on("connection", (socket) => {
  console.log("Connected:", socket.remoteAddress, socket.remotePort);

  socket.on("data", (data) => {
    console.log(
      "Received:",
      socket.remoteAddress,
      socket.remotePort,
      ": ",
      data.toString()
    );
  });

  socket.on("end", () => {
    console.log("Disconnected:", socket.remoteAddress, socket.remotePort);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
