const express = require('express');
const router = express.Router();
const Confession = require('../models/confess');

// POST /confessions - Create a new confession
router.post('/', async (req, res) => {
    try {
        const { message, userId } = req.body;
        const confession = await Confession.createConfession(message, userId);
        res.status(201).json(confession);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /confessions/:id - Get a confession by ID
router.get('/:id', async (req, res) => {
    try {
        const confession = await Confession.getConfessionById(req.params.id);
        if (!confession) return res.status(404).json({ error: "Confession not found" });
        res.json(confession);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /confessions/:id - Update a confession
router.put('/:id', async (req, res) => {
    try {
        const confession = await Confession.updateConfession(req.params.id, req.body.message);
        res.json(confession);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /confessions/:id - Delete a confession
router.delete('/:id', async (req, res) => {
    try {
        const result = await Confession.deleteConfession(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

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

