const express = require('express');
const app = express();

// api
app.use(express.json()); // middleware for parsing body JSON

const api = require('./routes/api/api.js');
app.use('/api', api);


// frontend
const frontend = require('./routes/frontend/frontend.js');
app.use('/', frontend);

module.exports = app;