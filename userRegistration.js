const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const users = [];

function validatePassword(password) {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial) {
        return { isValid: true };
    }
    return { 
        isValid: false, 
        message: "Password must be 8+ chars with uppercase, lowercase, number, and special char." 
    };
}

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check for duplicates
    if (users.find(u => u.email === email)) {
        return res.status(409).json({ error: "Email already registered" });
    }

    // Validate password
    const validation = validatePassword(password);
    if (!validation.isValid) {
        return res.status(400).json({ error: validation.message });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });
    } catch {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000);