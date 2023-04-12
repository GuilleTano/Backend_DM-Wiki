const { Router } = require("express");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.routers"); // Direccion de las rutas del servidor
//const app = express();

const http = require('http');
const agent = new http.Agent({ maxSockets: 20 });
const app = express();
const server = http.createServer({ agent }, app);
server.timeout = 10000;

app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});


/*app.listen(3000, ()=>{
    console.log("Escuchando a http://localhost:3000");
});
*/
