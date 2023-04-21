const controller = {};
const connectionDB = require("../dbConnection/connection");
const DigiModel = require("../models/digimon.model");
const s3 = require("../s3config/s3connection") //Llamar a la conexion con s3
//const fs = require('fs');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
//const { ListObjectsCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME


controller.index = async (req, res) => {
  try {
    await connectionDB();
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

    res.send(`<body style="background-color: black;"><h1 style="color: white;">Servidor corriendo</h1></body>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectar a la base de datos');
  }
}


// MONGO DB CONTROLLERS:
controller.addDigimonToBD = async (req, res, next) => {
  let i = 0;
  try {
    const { name, id, xAntibody, releaseDate, levels, fields,
      attributes, descriptions, skills, types, priorEvolutions, nextEvolutions } = req.body;
    const newDigimon = {
      name: name,
      id: id,
      types: types,
      xAntibody: xAntibody,
      releaseDate: releaseDate,
      levels: levels,
      fields: fields,
      attributes: attributes,
      descriptions: descriptions,
      skills: skills,
      priorEvolutions: priorEvolutions,
      nextEvolutions: nextEvolutions
    };

    await connectionDB();
    const digimon = await DigiModel.findOne({ name: newDigimon.name });
    if (digimon) {
      console.log("El Digimon ya existe");
      return res.status(200).json({ message: 'El Digimon ya existe' });
    }

    await DigiModel.create(newDigimon);
    i++
    console.log("Digimon cargados a DB: " + i);
    return res.status(200).json({ message: 'El Digimon se agregó correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo procesar la solicitud' });
  }
};

controller.getDigimonFromBD = async (req, res) => {
  try {
    await connectionDB();
    const digimon = await DigiModel.findOne({ name: req.params.name });

    if (!digimon) {
      return res.status(200).json({ message: 'El Digimon no existe' });
    }

    console.log("Digimon enviado");
    return res.json(digimon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo procesar la solicitud' });
  }
}


// AWS CONTROLLERS:
controller.sendImagesToAWS = async (req, res) => {
  try {
    console.log('Recibido');

    // Obtiene el nombre del archivo y el contenido del archivo a partir de la request del cliente
    const fileName = req.body.fileName;
    const fileBlob = req.file;

    // Prepara los parámetros para la subida del archivo a S3 
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: fileBlob.mimetype,
      Body: fileBlob.buffer
    };

    //Se crea instancia de PutObjectCommand para utilizarla en el metodo send() de s3
    const command = new PutObjectCommand(params);

    s3.send(command, function (err, data) {
      if (err) {
        console.log('Error', err);
      }
      if (data) {
        console.log('Subido correctamente');
      }
    });

    res.status(200).json({ message: 'La imagen se agregó correctamente' });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo procesar la solicitud' });
  }
};

controller.getImagesFromAWS = async (req, res) => {
  try {
    const digiName = req.params.name + ".png";

    console.log("Imagen solicitada: " + digiName);

    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: digiName,
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    res.json({ url, ok: true });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo procesar la solicitud' });
  }

};


module.exports = controller;