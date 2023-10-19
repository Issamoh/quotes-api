const pool = require('../db'); // Import the PostgreSQL pool from db.js

// Function to get a quote by ID
const getQuoteById = async (req, res) => {
  const quoteId = req.params.id; // Extract the ID from the request parameters

  try {
    // Query the database to get the quote by ID
    const quote = await pool.query('SELECT * FROM quotes WHERE id = $1', [quoteId]);

    if (quote.rowCount === 0) {
      res.status(404).json({ error: 'Quote not found' });
    } else {
      res.json(quote.rows[0]);
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the quote.' });
  }
};

// Function to get a random quote
const getRandomQuote = async (req, res) => {
  try {
    // Query the database to get a random quote
    const quote = await pool.query('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1');
    if (quote.rowCount === 0) {
      res.status(404).json({ error: 'No quote was found!' });
    } else {
      res.json(quote.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching a random quote.' });
  }
};

module.exports = {
  getRandomQuote,
  getQuoteById
};
