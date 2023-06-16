const controller = {};
const listaD = require("../../objectList.json");


controller.index = async (req, res) => {
  try {
    //await connectionDB();
    //const allDigimons = await DigiModel.find();

    /*// Creacion de JSON con lista de nombres
    const digimonNames = await DigiModel.find({}, { _id: 0, name: 1 }).lean();
    console.log("mongo: " + digimonNames.length);

    const objectList = digimonNames.map((obj) => ({
      nameLowercase: obj.name.toLowerCase(),      //agumon (black)
      s3ImageName: obj.name.replace(/\s/g, '_'),  //Agumon_(Black)
      mongoName: obj.name,                        //Agumon (Black)
    }));

    // Guardar la lista de objetos en un archivo JSON
    fs.writeFileSync('objectList.json', JSON.stringify(objectList));

    //Verificar cantidad de objetos en JSON
    const rawData = fs.readFileSync('objectList.json');
    const cantidad = JSON.parse(rawData);
    console.log(`La cantidad de objetos en el JSON es ${cantidad.length}`);
    */
    
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