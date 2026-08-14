// const app = require("./src/app");
let http = require("http");
const PORT = 3000;

let server = http.createServer((req, res) => {
  console.log("i am server");
  res.end("mene tumhari baat sun li");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
