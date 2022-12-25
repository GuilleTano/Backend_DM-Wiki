// RUTAS

const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");

router.get("/", controller.index);



// POST PARA AGREGAR LOS DIGIMON A LA BD
router.post('/add-digimon-to-BD', controller.addDigimonsToBD);


module.exports = router;