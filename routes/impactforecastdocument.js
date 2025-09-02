const express = require('express');
const router = express.Router();
const Document= require('../models/Impactforecastdocument.js');


router.post('/', async (req, res) => {
    const{description, document_url, status, insert_userid, created_at, updated_at} = req.body
    try {
        const document = await Document.create({
            description, document_url, status, insert_userid, created_at, updated_at
        });
        res.status(201).json(document);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create document', details: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const document = await Document.findAll();
        res.status(200).json(document);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch document', details: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const document = await Document.findByPk(req.params.id);
        if (document) {
            res.status(200).json(document);
        } else {
            res.status(404).json({ error: 'document not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch document', details: err.message });
    }
});


module.exports = router