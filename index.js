const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger-config'); //  Swagger configuration file.

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// Require and use your quote routes
const quoteRoutes = require('./routes/quotes');
const authorRoutes = require('./routes/authors');

app.use('/api/quotes', quoteRoutes);
app.use('/api/authors', authorRoutes);

app.listen(port, () => {
  console.log(`Quotes API is listening on port ${port}`);
});
