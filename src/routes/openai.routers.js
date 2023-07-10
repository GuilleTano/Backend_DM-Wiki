const express = require("express");
const router = express.Router();
const controller = require("../controllers/openai.controller");


router.get("/preguntarGPT", controller.preguntarGPT);

module.exports = router;