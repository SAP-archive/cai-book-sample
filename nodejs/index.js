var express = require('express');
var bodyParser = require('body-parser');

var planet = require('./routes/planet.route.js'); // Imports routes for the products
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/planets', planet);
var port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});