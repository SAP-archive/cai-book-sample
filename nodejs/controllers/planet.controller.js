var Planet = require('../models/planet.model.js');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
	res.send('Greetings from the Test controller!');
};

exports.planet_create = function (req, res) {
	Planet.insertOne(req.body, function (err, planet) {
		if (err) return next(err);
		res.send(planet);
	})
};

exports.planets_create = function (req, res, next) {
	Planet.insertMany(req.body, function (err, planet) {
		if (err) return next(err);
		res.send(planet);
	})
};

exports.planet_details = function (req, res, next) {
	Planet.findOne({'PlanetRaw': req.params.id}, function (err, planet) {
		if (err) return next(err);
		res.send(planet);
	})
};

exports.planets_details = function (req, res, next) {
	Planet.find({}, function (err, planets) {
		if (err) return next(err);
		var planetMap = {};

		planets.forEach(function (planet) {
			planetMap[planet._id] = planet;
		});

		res.send(planetMap);
	});
};

exports.planet_update = function (req, res, next) {
	Planet.findByIdAndUpdate(req.params.id, {
		$set: req.body
	}, function (err, planet) {
		if (err) return next(err);
		res.send('Planet udpated.');
	});
};

exports.planet_delete = function (req, res, next) {
	Planet.findByIdAndRemove(req.params.id, function (err) {
		if (err) return next(err);
		res.send('Deleted successfully!');
	})
};

exports.planets_delete = function (req, res, next) {
	Planet.deleteMany(function (err) {
		if (err) return next(err);
		res.send('Deleted successfully!');
	})
};