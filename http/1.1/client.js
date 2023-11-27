import http from "http";

const options = {
  hostname: "localhost",
  port: 4000,
  path: "/",
  method: "GET",
};

const req = http.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log(data);
  });
});

req.end();
