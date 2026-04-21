function checkLoginAttempts(email) {
    const attempt = loginAttempts.get(email);
    if (attempt && attempt.lockUntil > Date.now()) {
        const remaining = Math.ceil((attempt.lockUntil - Date.now()) / 60000);
        return { locked: true, message: `Account locked. Try again in ${remaining} minutes.` };
    }
    return { locked: false };
}

function recordFailedAttempt(email) {
    let attempt = loginAttempts.get(email) || { count: 0, lockUntil: 0 };
    attempt.count++;
    if (attempt.count >= 5) {
        attempt.lockUntil = Date.now() + (30 * 60 * 1000); // 30 mins
        attempt.count = 0; // Reset count for after lockout
    }
    loginAttempts.set(email, attempt);
}

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    const lockStatus = checkLoginAttempts(email);
    if (lockStatus.locked) return res.status(429).json({ error: lockStatus.message });

    const user = users.find(u => u.email === email);
    const isValid = user && await bcrypt.compare(password, user.password);

    if (!isValid) {
        recordFailedAttempt(email);
        return res.status(401).json({ error: "Invalid credentials" });
    }

    loginAttempts.delete(email); // Success: clear counter
    res.json({ message: "Login successful" });
});