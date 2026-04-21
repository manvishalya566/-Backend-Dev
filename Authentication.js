const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const ACCESS_SECRET = 'access-secret';
const REFRESH_SECRET = 'refresh-secret';
const users = []; // Assume users are registered here
const refreshTokens = new Set();

function generateAccessToken(user) {
    return jwt.sign({ username: user.username }, ACCESS_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
    const refreshToken = jwt.sign({ username: user.username }, REFRESH_SECRET, { expiresIn: '7d' });
    refreshTokens.add(refreshToken);
    return refreshToken;
}

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // In a real app, verify password with bcrypt here
    const user = { username }; 

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
});

app.post('/token/refresh', (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    if (!refreshTokens.has(token)) return res.sendStatus(403);

    jwt.verify(token, REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken });
    });
});

app.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens.delete(token);
    res.status(204).json({ message: "Logged out successfully" });
});

app.get('/protected', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        res.json({ message: `Welcome ${user.username}, you have access!`, user });
    });
});

app.listen(3000);