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
      const { name, id, xAntibody, releaseDate, image, levels, fields, 
        attributes, description, skills, types, priorEvolutions, nextEvolutions} = req.body;
      const body = {
        name: name,
        id: id,
        types: types,
        xAntibody: xAntibody,
        releaseDate: releaseDate,
        image: image,
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

controller.sendImageToAWS = async (req, res) => {
  try {

    // La imagen en formato base64 se encuentra en el cuerpo de la solicitud
    const base64Image = req.body.image;

    // Convertir la imagen en base64 a un buffer para poder enviarla a S3
    const buffer = Buffer.from(base64Image, 'base64');

    // Configurar los parámetros para enviar la imagen al bucket
    const params = {
      Bucket: 'MiBucket',
      Key: 'nombre-de-la-imagen.jpg', // El nombre que quieres darle a la imagen en S3
      Body: buffer,
      ContentType: 'image/jpeg' // El tipo de contenido de la imagen
    };

    // Enviar la imagen al bucket
    s3.upload(params, function (err, data) {
      if (err) {
        // Enviar un mensaje de error al cliente si hubo un problema
        return res.status(500).send(err);
      }

      // Enviar una respuesta al cliente indicando que la imagen se ha subido correctamente
      //res.send({ message: 'Imagen subida correctamente' });
    });

  }
  catch (err) {
    console.error(err);
  }
};


module.exports = controller;
