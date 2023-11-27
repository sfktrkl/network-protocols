import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];

const PORT = 4000;
const address = "localhost";
const client = new todoPackage.Todo(
  `${address}:${PORT}`,
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: text,
  },
  (err, response) => {
    console.log("Created: " + JSON.stringify(response));

    const readTodosPromise = new Promise((resolve, reject) => {
      client.readTodos(null, (err, response) => {
        if (err) {
          console.error("Error reading todos:", err);
          reject(err);
        } else {
          resolve(response);
        }
      });
    });

    readTodosPromise.then((response) => {
      if (response && response.items) {
        for (let item of response.items)
          console.log("Received:", JSON.stringify(item));
      }

      const call = client.readTodosStream();
      call.on("data", (item) => {
        console.log("Received stream: " + JSON.stringify(item));
      });
      call.on("end", () => {
        console.log("Stream end");
      });
    });
  }
);
