const express = require("express");
const router = express.Router();
const controllerDB = require("../controllers/mongoDB.controller");


// POST PARA AGREGAR LOS DIGIMON A LA BD
router.post('/add-digimon-to-BD', controllerDB.addDigimonToBD);
// GET PARA PEDIR UN DIGIMON A LA BD
router.get('/get-digimon-from-BD/:name', controllerDB.getDigimonFromBD);


router.get('/get-prioEvo-nullID', controllerDB.getPriorEvoNull);


module.exports = router;