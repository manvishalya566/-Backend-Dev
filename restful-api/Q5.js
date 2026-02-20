const express = require("express");
const users = require("./abc.json");
const app = express();

app.use(express.json());

app.get("/api/users/search", (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ msg: "Search query is required" });
    }

    const result = users.filter((u) =>
        u.first_name.toLowerCase().includes(name.toLowerCase())
    );

    res.json(result);
});

app.listen(8000, () => console.log("server started"));