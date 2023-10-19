const pool = require('../db'); // Assuming you have a separate file for database setup

// Function to get an author by ID
const getAuthorById = async (req, res) => {
  const authorId = req.params.id;

  try {
    const query = {
      text: 'SELECT * FROM authors WHERE id = $1',
      values: [authorId],
    };

    const result = await pool.query(query);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Author not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the author.' });
  }
};

// Function to get the total number of authors (a fixed number)
const getTotalAuthors = (req, res) => {
  const totalAuthors = 52; // Set the fixed total number of authors

  res.json(totalAuthors);
};

module.exports = {
  getAuthorById,
  getTotalAuthors
};
