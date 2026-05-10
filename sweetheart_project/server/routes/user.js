const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST /users/register - Register a new user
router.post('/register', async (req, res) => {
    try {
        const user = await User.register(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST /users/login - Login a user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.login(username, password);
        res.json(user);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

// PUT /users/:id - Update a user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /users/:id - Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const result = await User.deleteUser(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /users - Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

module.exports = router;

