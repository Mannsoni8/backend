const express = require("express");

const app = express();
let port = 3000;

app.use(express.json());
let users = [];

//create
app.post("/create", (req, res) => {
  let body = req.body;
  users.push(body);
  res.send("user saved successfully");
});

//read
app.get("/", (req, res) => {
  res.send(users);
});

//delete
app.delete("/delete/:id", (req, res) => {
  let { id } = req.params;
  let userData = users.filter((val) => val.id !== id);
  users = userData;
  res.send(userData);
  res.send("User deleted successfully");
});

//update
app.put("/update/:id", (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  let userData = users.map((val) => (val.id === id ? { ...val, name } : val));
  res.send(userData);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
