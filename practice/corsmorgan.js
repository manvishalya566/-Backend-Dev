const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.get("/data", (req, res) => {
  res.json({ message: "CORS working" });
});

app.listen(8080, () => console.log("server started"));
