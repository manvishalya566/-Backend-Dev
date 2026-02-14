const express = require("express");
const app = express();

// built-in middleware to read JSON
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
 
  if (username === "admin" && password === "1234") {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.json({ success: false, message: "Invalid username or password" });
  }
});
app.listen(8000, () => {
  console.log("Server running on port 8000");
});
