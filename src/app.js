// USA LAS RUTAS

const { Router } = require("express");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());



// ROUTES
const routes = require("./routes/index.routers");
app.use(routes);


app.listen(3000, ()=>{
    console.log("Escuchando a http://localhost:3000");
});
