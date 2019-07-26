var Planet = require('../models/planet.model.js');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
	res.send('Greetings from the CAI Test controller!');
};

exports.planet_details = function (req, res) {
	Planet.findOne({
		'PlanetRaw': req.params.id
	}, function (err, planet) {
		if (err || !planet) return errorMessage(res,err);
		res.send({
			replies: [{
				type: 'text',
				content: planet.ShortDescription,
			}],
			conversation: {}
		});
	})
};

exports.planet_attribute = function (req, res) {
	var fields = "Planet " + req.params.attribute;
	var uom = {
		"Position": "",
		"Mass": "10^24kg",
		"Diameter": "Km",
		"Density": "kg/m^3",
		"Gravity": "m/s^2",
		"EscapeVelocity": "km/s",
		"RotationPeriod": "hours",
		"LengthOfDay": "hours",
		"DistanceFromSun": "10^6 km",
		"Perihelion": "10^6 km",
		"Aphelion": "10^6 km",
		"OrbitalPeriod": "days",
		"OrbitalVelocity": "km/s",
		"OrbitalInclination": "degrees",
		"OrbitalEccentricity": "",
		"ObliquityToOrbit": "degrees",
		"MeanTemperature": "C",
		"SurfacePressure": "bars",
		"NumberOfMoons": "",
		"RingSystem": "",
		"GlobalMagneticField": ""
	};
	Planet.findOne({
			'PlanetRaw': req.params.id
		},
		fields,
		function (err, planet) {
			if (err || !planet) return errorMessage(res,err);
			const response = planet.Planet + ' ' + req.params.attribute + ' is ' + planet[req.params.attribute] + ' ' + uom[req.params
				.attribute];
			res.send({
				replies: [{
					type: 'text',
					content: response
				}],
				conversation: {}
			});
		})
};

exports.planets_details = function (req, res) {
	Planet.find({}, function (err, planets) {
		if (err || !planets) return errorMessage(res,err);
		const cards = planets.slice().map(e => ({
			title: e.Planet,
			subtitle: `Position ${e.Position}`,
			imageUrl: e.Image,
			buttons: [{
				type: 'postback',
				value: `Tell me more about ${e.PlanetRaw}`,
				title: 'Tell me more',
			},{
				type: 'web_url',
				value: e.Wikipedia,
				title: 'Wikipedia',
			}, ],
		}));

		res.send({
			replies: [{
				type: 'text',
				content: "Here are the planets in the Solar System",
			}, {
				type: 'carousel',
				content: cards
			}],
			conversation: {}
		});
	})
};

errorMessage = function (res,err) {
	res.send({
		replies: [{
			type: 'text',
			content: 'Error while retriving the information, try again',
		}]
	});
	return;
}