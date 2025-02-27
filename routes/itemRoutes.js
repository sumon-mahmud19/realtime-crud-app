const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

module.exports = (io) => {
    // Create Item (POST)
    router.post('/', async (req, res) => {
        try {
            const newItem = new Item(req.body);
            await newItem.save();
            io.emit('itemUpdated'); // Notify clients
            res.status(201).json(newItem);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Get All Items (GET)
    router.get('/', async (req, res) => {
        try {
            const items = await Item.find();
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Update Item (PUT)
    router.put('/:id', async (req, res) => {
        try {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
            io.emit('itemUpdated'); // Notify clients
            res.json(updatedItem);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Delete Item (DELETE)
    router.delete('/:id', async (req, res) => {
        try {
            await Item.findByIdAndDelete(req.params.id);
            io.emit('itemUpdated'); // Notify clients
            res.json({ message: "Item deleted successfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    return router;
};
