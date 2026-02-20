const express = require("express");
const users = require("./abc.json");
const app = express();

app.use(express.json());

app.get("/api/users", (req, res) => {
    let { page = 1, limit = 5 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedUsers = users.slice(startIndex, endIndex);

    res.json({
        total: users.length,
        page,
        limit,
        data: paginatedUsers
    });
});

app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find((u) => u.id == id);

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    return res.json(user);
});

app.listen(8000, () => console.log("server started"));