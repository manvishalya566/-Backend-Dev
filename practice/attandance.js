// student API
const express = require("express");
const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("home page");
});

// Attendance route
app.get("/attendance", (req, res) => {
  const { name, present } = req.query;

  if (!name || present === undefined) {
    return res.status(400).send("name and present are required");
  }

  res.send(`Attendance recorded: Name = ${name}, Present = ${present}`);
});

// Students data
const students = [
  { name: "manvi", age: 20, city: "Mathura" },
  { name: "gauri", age: 26, city: "Mathura" },
  { name: "anurag", age: 21, city: "Mathura" },
  { name: "anu", age: 80, city: "Mathura" },
];

// Add student
app.post("/students/add", (req, res) => {
  const { name, age, city } = req.body;

  if (!name || !age || !city) {
    return res.status(400).json({ message: "All fields are required" });
  }

  students.push({ name, age, city });
  res.status(201).json(students);
});

// Start server (ALWAYS at the end)
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
