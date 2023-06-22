const controller = {};
const listaD = require("../../objectList.json");


controller.index = async (req, res) => {
  try {
    console.log("Servidor corriendo");
    res.send(`<body style="background-color: black;"><h1 style="color: white;">Servidor corriendo</h1></body>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectar a la base de datos');
  }
}

controller.digimonList = async (req, res) => {
  try {
    console.log("Se envia la lista");

    res.json(listaD);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al enviar la lista');
  }
}


module.exports = controller;