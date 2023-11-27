import http2 from "http2";
const server = http2.createServer();

server.on("stream", (stream, headers) => {
  stream.respond({
    "content-type": "text/plain",
    ":status": 200,
  });
  stream.end("Hi, HTTP/2");
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
