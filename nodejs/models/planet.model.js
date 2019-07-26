var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlanetSchema = new Schema({
	PlanetRaw: {type: String, required: true, max: 100},
    Planet: {type: String, required: true, max: 100},
    Position: {type: Number, required: false},
    ShortDescription: {type: String, required: true, max: 100},
    Wikipedia: {type: String, required: true, max: 100},
    Image: {type: String, required: true, max: 100},
    Mass: {type: Number, required: true},
    Diameter: {type: Number, required: true},
    Density: {type: Number, required: true},
    Gravity: {type: Number, required: true},
    EscapeVelocity: {type: Number, required: true},
    RotationPeriod: {type: Number, required: true},
    LengthOfDay: {type: Number, required: true},
    DistanceFromSun: {type: Number, required: true},
    Perihelion: {type: Number, required: true},
    Aphelion: {type: Number, required: true},
    OrbitalPeriod: {type: Number, required: true},
    OrbitalVelocity: {type: Number, required: true},
    OrbitalInclination: {type: Number, required: true},
    OrbitalEccentricity: {type: Number, required: true},
    ObliquityToOrbit: {type: Number, required: true},
    MeanTemperature: {type: Number, required: true},
    SurfacePressure: {type: Number, required: false},
    NumberOfMoons: {type: Number, required: true},
    RingSystem: {type: String, required: true, max: 100},
    GlobalMagneticField: {type: String, required: true, max: 100}
});

// Export the model
module.exports = mongoose.model('Planet', PlanetSchema);