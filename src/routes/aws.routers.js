const express = require("express");
const router = express.Router();
const controllerAWS = require("../controllers/aws.controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024} //5MB 
});


// POST PARA ENVIAR LAS IMAGENES A AWS
router.post('/images-to-AWS', upload.single("file"), controllerAWS.sendImagesToAWS);

//GET PARA RECIBIR IMAGENES DE AWS
router.get('/images-from-AWS/:name', controllerAWS.getImagesFromAWS);

module.exports = router;