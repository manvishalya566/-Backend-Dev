// ... existing session config ...

const isAuthenticated = (req, res, next) => {
    if (req.session.user) return next();
    res.status(401).json({ error: "Unauthorized" });
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (req.session.user.role === 'admin' || req.session.user.role === role) return next();
        res.status(403).json({ error: "Forbidden: Higher privileges required" });
    };
};

const isOwnerOrModerator = (req, res, next) => {
    const post = posts.find(p => p.id === req.params.id);
    const user = req.session.user;
    
    if (user.role === 'admin' || user.role === 'moderator' || post.authorId === user.id) {
        return next();
    }
    res.status(403).json({ error: "You cannot modify this post" });
};

app.post('/posts', isAuthenticated, (req, res) => {
    // Logic to add post
});

app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
    // Logic to update
});

app.delete('/posts/:id', isAuthenticated, requireRole('moderator'), (req, res) => {
    // Moderators and Admins can delete
});