const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../api/index.js');
const config = require('../config/index.js');


module.exports = (app) => { 

// Middleware that transforms the raw string of req.body into json
app.use(bodyParser.json());
// Load API routes
//app.use(config.api.prefix, routes());
app.use('/',routes());

//console.log('valido rutas');

app.get('/status', (req, res) => {
    res.status(200).end();
  });

}

