const express = require("express");
const users = require("./abc.json");
const app = express();

app.use(express.json());

function validateYear(req, res, next) {
    const { year } = req.body;
    const currentYear = new Date().getFullYear();

    if (year !== undefined) {
        if (isNaN(year) || year < 1900 || year > currentYear) {
            return res.status(400).json({ msg: "Invalid year" });
        }
    }

    next();
}

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.post("/api/users", validateYear, (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    return res.json({ msg: "User created successfully" });
});

app.patch("/api/users/:id", validateYear, (req, res) => {
    return res.json({ msg: "User updated successfully" });
});

app.listen(8000, () => console.log("server started"));