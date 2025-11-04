const express = require('express');
const app = express();
const path = require('path');

// api
const api = require('./routes/api.js');
app.use('/api', api);


// frontend
app.use('/components', express.static(path.join(__dirname, '../frontend/components')));
app.use('/services', express.static(path.join(__dirname, '../frontend/services')));
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));
app.use('/utils', express.static(path.join(__dirname, '../frontend/utils')));

app.use('/pages', express.static(path.join(__dirname, '../frontend/pages')));
const pages = require('./routes/pages.js');
app.use('/', pages); // fallback '/' - prevents needing '/pages' route


module.exports = app;