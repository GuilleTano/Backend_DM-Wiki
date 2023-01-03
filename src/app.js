// USA LAS RUTAS

const { Router } = require("express");
const express = require("express");
const cors = require("cors");
//const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());

//app.use(bodyParser.json({limit: "50MB"}));




// ROUTES
const routes = require("./routes/index.routers");
app.use(routes);


app.listen(3000, ()=>{
    console.log("Escuchando a http://localhost:3000");
});
