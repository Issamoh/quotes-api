const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//const db = require('./db'); // Import the pool from the db.js file
require('dotenv').config();

app.use(express.json());

// Require and use your quote routes
const quoteRoutes = require('./routes/quotes');
app.use('/api/v1/quotes', quoteRoutes);

app.listen(port, () => {
  console.log(`Quotes API is listening on port ${port}`);
});
