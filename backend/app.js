const express = require('express');
const app = express();

// api
const api = require('./routes/api/api.js');
app.use('/api', api);


// frontend
const frontend = require('./routes/frontend/frontend.js');
app.use('/', frontend);

module.exports = app;