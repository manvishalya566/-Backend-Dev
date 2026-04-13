const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "Akash", {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
  });
  res.send(" Cookie has been set");
});
app.get("/get-cookie", (req, res) => {
  const user = req.cookies.username;
  if (user) {
    res.send(` Hello ${user}`);
  } else {
    res.send(" No cookie found");
  }
});
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("username");
  res.send(" Cookie deleted");
});
app.post("/set-preferences", (req, res) => {
  const { theme, language } = req.body;
  const data = {
    theme: theme || "light",
    language: language || "en",
  };
  res.cookie("preferences", JSON.stringify(data), {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({
    message: " Preferences saved",
    data,
  });
});
app.get("/get-preferences", (req, res) => {
  const pref = req.cookies.preferences;
  if (!pref) {
    return res.send(" No preferences found");
  }
  const parsed = JSON.parse(pref);
  res.json(parsed);
});
app.listen(3000, () => {
  console.log("Server Started");
});