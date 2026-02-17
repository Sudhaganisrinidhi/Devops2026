const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];
let loggedInUser = null;

function hashPassword(password) {
    return "hashed_" + password;
}

function authMiddleware(req, res, next) {
    if (!loggedInUser) {
        return res.status(401).json({ message: "Access denied. Please login first." });
    }
    next();
}

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = hashPassword(password);

    const newUser = {
        username,
        password: hashedPassword
    };

    users.push(newUser);

    res.status(201).json({ message: "User registered successfully." });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(401).json({ message: "Invalid username or password." });
    }

    const hashedPassword = hashPassword(password);

    if (user.password !== hashedPassword) {
        return res.status(401).json({ message: "Invalid username or password." });
    }

    loggedInUser = user;

    res.status(200).json({ message: "Login successful." });
});

app.get('/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({
        message: `Welcome to dashboard, ${loggedInUser.username}!`
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
