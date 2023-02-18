// USA LAS RUTAS

const { Router } = require("express");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.routers"); // Direccion de las rutas del servidor
const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3000, ()=>{
    console.log("Escuchando a http://localhost:3000");
});
