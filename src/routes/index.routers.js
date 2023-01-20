// RUTAS

const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});

// GET INDEX
router.get("/", controller.index);

// POST PARA AGREGAR LOS DIGIMON A LA BD
router.post('/add-digimon-to-BD', controller.addDigimonsToBD);

// POST PARA ENVIAR LAS IMAGENES A AWS
router.post('/images-to-AWS',  upload.single("file"), controller.sendImagesToAWS);

//GET PARA RECIBIR IMAGENES DE AWS
router.get('/images-from-AWS', controller.getImagesToAWS);


module.exports = router;