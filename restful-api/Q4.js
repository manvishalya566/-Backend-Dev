const express = require("express");
const users = require("./abc.json");
const app = express();

app.use(express.json());

let authors = [
    { id: 1, name: "Author A" },
    { id: 2, name: "Author B" }
];

app.get("/api/authors", (req, res) => {
    res.json(authors);
});

app.get("/api/authors/:id", (req, res) => {
    const id = req.params.id;
    const author = authors.find((a) => a.id == id);

    if (!author) {
        return res.status(404).json({ msg: "Author not found" });
    }

    res.json(author);
});

app.post("/api/authors", (req, res) => {
    const body = req.body;
    const newAuthor = { id: authors.length + 1, ...body };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

app.patch("/api/authors/:id", (req, res) => {
    const id = req.params.id;
    const author = authors.find((a) => a.id == id);

    if (!author) {
        return res.status(404).json({ msg: "Author not found" });
    }

    Object.assign(author, req.body);
    res.json({ msg: "Author updated successfully", author });
});

app.delete("/api/authors/:id", (req, res) => {
    const id = req.params.id;
    const index = authors.findIndex((a) => a.id == id);

    if (index === -1) {
        return res.status(404).json({ msg: "Author not found" });
    }

    const deletedAuthor = authors.splice(index, 1);
    res.json({ msg: "Author deleted successfully", deletedAuthor });
});

app.listen(8000, () => console.log("server started"));