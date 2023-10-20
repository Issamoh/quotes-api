const pool = require('../db'); // Import the PostgreSQL pool from db.js

/**
 * @swagger
 * /quotes/{id}:
 *   get:
 *     summary: Get a quote by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quote ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the quote.
 *                   example: 81
 *                 text:
 *                   type: string
 *                   description: The text of the quote.
 *                   example: "Anyone who has never made a mistake has never tried anything new."
 *                 author_id:
 *                   type: integer
 *                   description: The author ID associated with the quote.
 *                   example: 4
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: An array of tags associated with the quote.
 *                   example: ["mistakes"]
 *       404:
 *         description: Quote not found
 */
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


/**
 * @swagger
 * /quotes/random:
 *   get:
 *     summary: Get a random quote
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the quote.
 *                   example: 81
 *                 text:
 *                   type: string
 *                   description: The text of the quote.
 *                   example: "Anyone who has never made a mistake has never tried anything new."
 *                 author_id:
 *                   type: integer
 *                   description: The author ID associated with the quote.
 *                   example: 4
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: An array of tags associated with the quote.
 *                   example: ["mistakes"]
 *       404:
 *         description: Quote not found
 */

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
