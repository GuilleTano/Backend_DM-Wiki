// FUNCIONALIDAD CUANDO USUARIO SE CONECTA A ESA RUTA

// PARA CORRER EL SERVIDOR EL COMANDO ES:  npm run dev

const controller = {};
const connection = require("../dbConnection/connection");
const DigiModel = require("../models/digimon.model");

controller.index = async (req, res) =>{

    try{
        await connection();
        const allDigimons = await DigiModel.find();

        console.log(allDigimons);

        
        res.send("<h1>Servidor corriendo</h1>");
    }catch(err){
        console.error(err);
    }
}

module.exports = controller;
