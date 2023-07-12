const express = require("express");
const router = express.Router();
const controller = require("../controllers/calubot.controller");



router.post("/preguntarCalubot", controller.preguntarCalubot);


module.exports = router;