import net from "net";
const client = new net.Socket();

const PORT = 4000;
const serverAddress = "localhost";
client.connect(PORT, serverAddress, () => {
  console.log("Connected");

  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (message) => {
    message = message.trim();
    if (message.toLowerCase() === "exit") {
      client.destroy();
      process.exit();
    } else {
      client.write(message);
    }
  });
});

client.on("close", () => {
  console.log("Disconnected");
});
