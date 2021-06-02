const express = require('express');
const app = express();

const {config} = require('./config/index.js');
const stockApi = require('./routes/stock.js');

stockApi(app);

app.listen(config.port, function() {
    console.log(`listening http://localhost:${config.port}`);
});