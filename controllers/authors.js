const pool = require('../db'); // Assuming you have a separate file for database setup


/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The author ID.
 *                       example: 2
 *                     name:
 *                       type: string
 *                       description: The author's name.
 *                       example: Jane Austen
 *                     birthdate:
 *                       type: string
 *                       description: The author's birthdate.
 *                       example: December 16, 1775
 *                     hint:
 *                       type: string
 *                       description: hint about the author
 *                       example: English novelist
 *                     bio:
 *                       type: string
 *                       description: complete bio of the author
 *                       example: English novelist known for her romantic fiction set among the landed gentry.
 *       404:
 *         description: Author not found
 */
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

/**
 * @swagger
 * /authors/total:
 *   get:
 *     summary: Get the total number of authors
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalAuthors:
 *                   type: integer
 *       500:
 *         description: An error occurred while fetching the total number of authors
 */

// Function to get the total number of authors (a fixed number)
const getTotalAuthors = (req, res) => {
  const totalAuthors = 52; // Set the fixed total number of authors

  res.json(totalAuthors);
};

module.exports = {
  getAuthorById,
  getTotalAuthors
};
