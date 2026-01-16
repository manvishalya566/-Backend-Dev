
const express = require("express");
const app = express();

app.use(express.json());

let todos = [];
let idCounter = 1;

// CREATE a todo
app.post("/todos", (req, res) => {
  const todo = {
    id: idCounter++,
    task: req.body.task
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// READ all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// UPDATE a todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).send("Todo not found");
  }

  todo.task = req.body.task;
  res.json(todo);
});

// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.send("Todo deleted");
});

app.listen(3000, () => {
  console.log("TODO API running on port 3000");
});
