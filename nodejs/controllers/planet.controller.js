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
	res.send('Greetings from the Test controller!');
};

exports.planet_details = function (req, res, next) {
	var client = connectDB();
	var sql = "SELECT * FROM \"SolarSystem.db::SolarSystem.Planet\" WHERE \"PlanetRaw\" = '" + req.params.id + "'";
	client.exec(sql, (err, planet) => {
		client.disconnect();

		if (err) {
			return console.error('SQL execute error:', err);
		}
		res.send(planet);
	});
};

exports.planets_details = function (req, res, next) {
	var client = connectDB();
	var sql = 'SELECT * FROM "SolarSystem.db::SolarSystem.Planet"';
	client.exec(sql, (err, planets) => {
		client.disconnect();

		if (err) {
			return console.error('SQL execute error:', err);
		}
		var planetMap = {};
		planets.forEach(function (planet) {
			planetMap[planet.PlanetRaw] = planet;
		});
		res.send(planetMap);
	});
};
