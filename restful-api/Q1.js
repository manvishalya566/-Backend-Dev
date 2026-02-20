const express = require("express");
const users = require("./abc.json");
const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  const { author, year } = req.query;

  let filteredUsers = users;

  if (author) {
    filteredUsers = filteredUsers.filter(
      (u) => u.author && u.author.toLowerCase() === author.toLowerCase()
    );
  }

  if (year) {
    filteredUsers = filteredUsers.filter(
      (u) => u.year && u.year == year
    );
  }

  res.json(filteredUsers);
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id == id);

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  return res.json(user);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  return res.json({ msg: "User created successfully" });
});

app.patch("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id == id);

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  Object.assign(user, req.body);
  return res.json({ msg: "User updated successfully" });
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const index = users.findIndex((u) => u.id == id);

  if (index === -1) {
    return res.status(404).json({ msg: "User not found" });
  }

  users.splice(index, 1);
  return res.json({ msg: "User deleted successfully" });
});

app.listen(8000, () => console.log("server started"));