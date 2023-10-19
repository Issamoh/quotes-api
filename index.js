const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.json());

// Require and use your quote routes
const quoteRoutes = require('./routes/quotes');
const authorRoutes = require('./routes/authors');

app.use('/api/v1/quotes', quoteRoutes);
app.use('/api/v1/authors', authorRoutes);

app.listen(port, () => {
  console.log(`Quotes API is listening on port ${port}`);
});
