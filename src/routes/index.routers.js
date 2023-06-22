const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");


// GET INDEX
router.get("/", controller.index);
router.get("/digimon-list", controller.digimonList);


module.exports = router;