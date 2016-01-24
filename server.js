'use strict';

const express = require('express');
const routes = require('./app/routes/index.js');

var app = express();

//Logging middleware
app.use(function(req, res, next) {
   console.log(Date.now(), req.url);
   next();
});

// Static files
app.use('/public', express.static(process.cwd() + '/public'));

// Our routes
routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

