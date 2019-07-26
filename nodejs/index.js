var express = require('express');
var bodyParser = require('body-parser');

var planet = require('./routes/planet.route.js'); // Imports routes for the products
var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDBUrl = '';

if (process.env.VCAP_SERVICES) {
	var vcap_services = process.env.VCAP_SERVICES;
	var mongodb_service = JSON.parse(vcap_services).mongodb[0];
	mongoDBUrl = mongodb_service.credentials.uri;
}

mongoose.connect(mongoDBUrl, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/planets', planet);
var port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});