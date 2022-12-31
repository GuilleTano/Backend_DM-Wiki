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

controller.addDigimonsToBD = async (req, res) => {
    try {
      const { name, id, xAntibody, releaseDate, images, levels, fields, 
        attributes, description, skills, types, priorEvolutions, nextEvolutions} = req.body;
      const body = {
        name: name,
        id: id,
        types: types,
        xAntibody: xAntibody,
        releaseDate: releaseDate,
        images: images,
        levels: levels,
        fields: fields,
        attributes: attributes,
        description: description,
        skills: skills,
        priorEvolutions: priorEvolutions,
        nextEvolutions: nextEvolutions
      };
      await connection();

      await DigiModel.create(body);
      //res.redirect('/');


    } catch (err) {
      console.error(err);
    }
  };

module.exports = controller;
