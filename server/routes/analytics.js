const express = require('express');
const router = express.Router();
const pool = require('../database/db');

// POST /api/track-choice
router.post('/track-choice', async (req, res) => {
    try {
        const { user_id, choice } = req.body;

        if (!user_id || !choice) {
            return res.status(400).json({ error: 'Missing required fields: user_id and choice' });
        }

        if (choice !== 'DA' && choice !== 'SPACER') {
            return res.status(400).json({ error: 'Invalid choice. Must be DA or SPACER.' });
        }

        const [result] = await pool.query(
            'INSERT INTO user_choices (user_id, choice) VALUES (?, ?)',
            [user_id, choice]
        );

        return res.status(200).json({
            success: true,
            message: 'Choice recorded',
            id: result.insertId
        });

    } catch (error) {
        console.error('Error tracking analytics:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
