const express = require('express');
const router = express.Router();
const Category = require('../models/Impactforecastcategory.js');


router.post('/', async (req, res) => {
    const{name,dedicated_for, code, status, update_userid, insert_userid, created_at, updated_at} = req.body
    try {
        const category = await Category.create({
            id, name,dedicated_for, code, status, update_userid, insert_userid, created_at, updated_at
        });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create category', details: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const category = await Category.findAll();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch category', details: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'category not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch category', details: err.message });
    }
});


module.exports = router