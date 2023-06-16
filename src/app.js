const { Router } = require("express");
const express = require("express");
const cors = require("cors");
const indexRoutes = require("./routes/index.routers");
const mongoRoutes = require("./routes/mongoDB.routers");
const awsRoutes = require("./routes/aws.routers");
require("dotenv").config();
const port = process.env.PORT || 3000;

const http = require('http');
const agent = new http.Agent({ maxSockets: 20 });
const app = express();
const server = http.createServer({ agent }, app);
server.timeout = 10000;

app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(mongoRoutes);
app.use(awsRoutes);


server.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
