import ping from "ping";
const targetHost = "google.com";

ping.promise
  .probe(targetHost)
  .then((result) => {
    if (result.alive) {
      console.log(`${targetHost} is alive`);
      console.log(`Round trip time: ${result.time} ms`);
    } else {
      console.log(`${targetHost} is unreachable`);
    }
  })
  .catch((error) => {
    console.error(`Error while pinging ${targetHost}: ${error}`);
  });
