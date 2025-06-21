const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Fetch all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items' });
  }
});

// Add new item
router.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add item' });
  }
});

// Send enquiry (mock implementation)
router.post('/enquiry', async (req, res) => {
  try {
    // In a real app, implement this email sending logic using Nodemailer or any other.
    //
    console.log('Enquiry received:', req.body);
    res.json({ success: true, message: 'Enquiry sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send enquiry' });
  }
});

module.exports = router;