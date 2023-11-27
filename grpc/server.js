import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
  readTodosStream: readTodosStream,
});

const todos = [];
function createTodo(call, callback) {
  const todoItem = {
    id: todos.length + 1,
    text: call.request.text,
  };
  todos.push(todoItem);
  callback(null, todoItem);
}

function readTodosStream(call, callback) {
  todos.forEach((t) => call.write(t));
  call.end();
}

function readTodos(call, callback) {
  callback(null, { items: todos });
}

const PORT = 4000;
const address = "localhost";
server.bindAsync(
  `${address}:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(`Server bind failed. Error: ${err}`);
    } else {
      console.log(`Server is listening on port ${PORT}`);
      server.start();
    }
  }
);
