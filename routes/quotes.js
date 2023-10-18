const express = require('express');
const router = express.Router();
const quotesController = require('../controllers/quotes');

// Define a route to get a quote by ID
router.get('/:id', quotesController.getQuoteById);

module.exports = router;
