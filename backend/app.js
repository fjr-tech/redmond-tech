const express = require('express');
const app = express();

// api
app.use(express.json()); // middleware for parsing body JSON

// Parse cookies using cookie-parser to avoid the tedious task of doing it ourselves
const cookieParser = require('cookie-parser')
app.use(cookieParser());

const api = require('./routes/api/api.js');
app.use('/api', api);


// frontend
const frontend = require('./routes/frontend/frontend.js');
app.use('/', frontend);

module.exports = app;

// CRON
require('./cron/master_cron.js');