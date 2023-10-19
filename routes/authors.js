const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');

// THE ORFER OF FUNCTIONS IS CRUCIAL, IF INVERSED THE API WILL INTERPRET TOTAL AS AN ARGUMENT OF GETAUTHORBYID
// Define a route to get the total number of authors
router.get('/total', authorsController.getTotalAuthors);

// Define a route to get an author by ID
router.get('/:id', authorsController.getAuthorById);


module.exports = router;