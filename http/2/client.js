import http2 from "http2";
const client = http2.connect("http://localhost:4000");

client.on("error", (err) => {
  console.error(err);
});

const req = client.request({
  ":path": "/",
});

req.on("response", (headers, flags) => {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    console.log("Response:", data);
    client.close();
  });
});

req.end();
