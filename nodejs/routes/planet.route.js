var express = require('express');
var router = express.Router();

var planet_controller = require('../controllers/planet.controller.js');
var planet_cai_controller = require('../controllers/planet_cai.controller.js');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', planet_controller.test);
router.get('/:id', planet_controller.planet_details);
router.get('/', planet_controller.planets_details);

// Conversational AI routes
router.get('/cai/test', planet_cai_controller.test);
router.get('/cai/all', planet_cai_controller.planets_details);
router.get('/cai/:id', planet_cai_controller.planet_details);
router.get('/cai/:id/:attribute', planet_cai_controller.planet_attribute);
module.exports = router;