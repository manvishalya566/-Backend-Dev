const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());    
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.post("/login", (req, res) => {
    const { username } = req.body;
    // Set a cookie with the username
    res.cookie("user", username, { 
        maxAge: 60 * 60 * 1000 *24, // Cookie expires in 1 hour
    }); 
    res.send("cookie dtored from form");
});

app.get("/profile", (req, res) => {
    if(!req.cookies.user) {
        return res.status(401).send("no user logged in");
    }
    res.send(`Welcome, ${req.cookies.user}!`);
});

//delete cookie
app.get("/logout", (req, res) => {
    res.clearCookie("user");
    res.send("Cookie deleted (User logged out");
});

app.listen(9000, () => {
    console.log("Server is running on port 9000");
});

