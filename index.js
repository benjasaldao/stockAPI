const express = require('express');
const app = express();

const {config} = require('./config/index.js');
const stockApi = require('./routes/stock.js');

const cors = require('cors');

const {
    wrapErrors,
    logErrors,
    errorHandler
} = require('./utils/middleware/errorHandler.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

// Body parser
app.use(express.json());

// Routes
stockApi(app);

// Cors
app.use(cors());

// Catch 404
app.use(notFoundHandler);

// Errors handler
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`CORS-enabled, app listening on http://localhost:${config.port}`);
});