const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("home page");
});

// app.get("/about", (req, res) => {
//   res.send(
//     "About page. Hey " + req.query.name + ", age is " + req.query.age
//   );
// });

// 👉 Attendance route
app.get("/attendance", (req, res) => {
  const name = req.query.name;
  const present = req.query.present;

  res.send(`Attendance recorded: Name = ${name}, Present = ${present}`);
});

app.listen(8000, () => console.log("server started"));
