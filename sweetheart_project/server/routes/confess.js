const express = require('express');
const router = express.Router();
const Confession = require('../models/confess');

// GET /confessions - Get all confessions
router.get('/', async (req, res) => {
    try {
        const confessions = await Confession.getAllConfessions();
        res.json(confessions);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch confessions" });
    }
});

module.exports = router;
