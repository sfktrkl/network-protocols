import dgram from "dgram";
const client = dgram.createSocket("udp4");

const msg = "Hi";
const PORT = 4000;
const address = "localhost";
client.send(msg, PORT, address, (err) => {
  if (err) {
    console.error(`UDP Client error: ${err}`);
    client.close();
  }
  client.close();
});
