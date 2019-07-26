connectDB = function () {
	// Set up hana connection
	var hana = require('@sap/hana-client');
	if (process.env.VCAP_SERVICES) {
		var vcap_services = process.env.VCAP_SERVICES;
		var hana_service = JSON.parse(vcap_services).hanatrial[0];
		hanaDBUrl = "serverNode=" + hana_service.credentials.host + ":" + hana_service.credentials.port + ";uid=" + hana_service.credentials.user +
			";pwd=" + hana_service.credentials.password + ";currentschema=" + hana_service.credentials.schema + "";
	}

	var client = hana.createConnection();
	client.connect(hanaDBUrl);
	return client;
}

//Simple version, without validation or sanitation
exports.test = function (req, res) {
	res.send('Greetings from the CAI Test controller!');
};

exports.planet_details = function (req, res) {
	var client = connectDB();
	var sql = "SELECT \"ShortDescription\" FROM \"SolarSystem.db::SolarSystem.Planet\" WHERE \"PlanetRaw\" = '" + req.params.id + "'";
	client.exec(sql, (err, planet) => {
		client.disconnect();

		if (err) {
			return errorMessage(res, err);
		}
		res.send({
			replies: [{
				type: 'text',
				content: planet[0].ShortDescription,
			}],
			conversation: {}
		});
	});
};

exports.planet_attribute = function (req, res) {
	var uom = {
		"Position": {
			"uom":"",
			"string":"Position"},
		"Mass": {
			"uom":"10^24kg", 
			"string":"Mass"},
		"Diameter": {
			"uom":"10^6 km",
			"string":"Diameter"},
		"DistanceFromSun": {
			"uom":"10^6 km",
			"string":"Distance from the Sun"}
	};
	var client = connectDB();
	var sql = "SELECT \"Planet\", \"ShortDescription\", \"" + req.params.attribute +
		"\" as \"attribute\" FROM \"SolarSystem.db::SolarSystem.Planet\" WHERE \"PlanetRaw\" = '" + req.params.id + "'";
	client.exec(sql, (err, planet) => {
		client.disconnect();

		if (err) {
			return errorMessage(res, err);
		}
		const response = planet[0].Planet + ' ' + uom[req.params.attribute].string + ' is ' + planet[0].attribute + ' ' + uom[req.params.attribute].uom;
		res.send({
			replies: [{
				type: 'text',
				content: response,
			}],
			conversation: {}
		});
	});
};

exports.planets_details = function (req, res) {
	var client = connectDB();
	var sql = 'SELECT \"PlanetRaw\", \"Planet\", \"Position\", \"Image\", \"Wikipedia\" FROM "SolarSystem.db::SolarSystem.Planet"';
	client.exec(sql, (err, planets) => {
		client.disconnect();

		if (err) {
			return errorMessage(res, err);
		}
		const cards = planets.slice().map(e => ({
			title: e.Planet,
			subtitle: `Position ${e.Position}`,
			imageUrl: e.Image,
			buttons: [{
				type: 'postback',
				value: `Tell me more about ${e.PlanetRaw}`,
				title: 'Tell me more',
			}, {
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
	});
};

errorMessage = function (res, err) {
	console.error('SQL execute error:', err);
	res.send({
		replies: [{
			type: 'text',
			content: 'Error while retriving the information, try again',
		}]
	});
	return;
}