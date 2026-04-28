const express = require('express');
const router = express.Router();
const User = require('../models/user');

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
