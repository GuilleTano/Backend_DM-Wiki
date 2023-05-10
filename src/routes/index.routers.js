const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");

/*
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024} //5MB 
});
*/


// GET INDEX
router.get("/", controller.index);

router.get("/digimon-list", controller.digimonList);


/*
// POST PARA ENVIAR LAS IMAGENES A AWS
router.post('/images-to-AWS', upload.single("file"), controller.sendImagesToAWS);

//GET PARA RECIBIR IMAGENES DE AWS
router.get('/images-from-AWS/:name', controller.getImagesFromAWS);
*/

module.exports = router;