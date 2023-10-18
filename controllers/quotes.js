const pool = require('../db'); // Import the PostgreSQL pool from db.js

// Function to get a quote by ID
const getQuoteById = async (req, res) => {
  const quoteId = req.params.id; // Extract the ID from the request parameters

  try {
    // Query the database to get the quote by ID
    const quote = await pool.query('SELECT * FROM quotes WHERE id = $1', [quoteId]);
    res.json(quote.rows[0]); // Assuming there's only one matching quote
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the quote.' });
  }
};

module.exports = {
  getQuoteById,
};
