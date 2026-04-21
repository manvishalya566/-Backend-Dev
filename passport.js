const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const users = []; // Mock database
const JWT_SECRET = 'api-secret-key';

// 1. Configure Local Strategy
passport.use('local', new LocalStrategy(async (username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) return done(null, false, { message: 'User not found' });
    // In production, use bcrypt.compare()
    if (user.password !== password) return done(null, false, { message: 'Wrong password' });
    return done(null, user);
}));

// 2. Configure JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};

passport.use('jwt', new JwtStrategy(jwtOptions, (payload, done) => {
    const user = users.find(u => u.username === payload.username);
    return user ? done(null, user) : done(null, false);
}));

// 3. Login Endpoint (Session-based)
app.post('/auth/login', passport.authenticate('local', { session: true }), (req, res) => {
    res.json({ message: "Logged in via session", user: req.user });
});

// 4. API Login (Returns JWT)
app.post('/auth/api-login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: "Invalid credentials" });
});

// 5. Protected Routes
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ message: "Welcome to your Session Dashboard" });
    } else {
        res.status(401).json({ message: "Unauthorized Session" });
    }
});

app.get('/api/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: "Success: API Profile Access", user: req.user });
});

app.listen(3000);