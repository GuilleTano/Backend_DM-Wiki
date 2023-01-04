// FUNCIONALIDAD CUANDO USUARIO SE CONECTA A ESA RUTA

// PARA CORRER EL SERVIDOR EL COMANDO ES:  npm run dev

const controller = {};
const connection = require("../dbConnection/connection");
const DigiModel = require("../models/digimon.model");
const s3 = require("../s3config/s3connection") //Llamar a la conexion con s3
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
require("dotenv").config();
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME

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


controller.sendImagesToAWS = async (req, res) => {
  try {

    // Obtiene el nombre del archivo y el contenido del archivo a partir de la petición
    const fileName = "Agumon.png";
    const fileBlob = req.body;

    // Convierte el objeto blob a un string
    const fileBlobString = JSON.stringify(fileBlob);

    // Crea un buffer a partir del blob
    const fileBuffer = Buffer.from(fileBlobString, 'utf8');
    console.log(fileBuffer);

    // Prepara los parámetros para la subida del archivo a S3
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer
    };

    const command = new PutObjectCommand(params);

    s3.send(command, function(err, data) {
      if (err) {
        console.log('Error', err);
      }
      if (data) {
        console.log('Subido correctamente', data.Location);
      }
    });

    /*
    s3.upload(params, function (err, data) {
      if (err) {
        // Enviar un mensaje de error al cliente si hubo un problema
        return res.status(500).send(err);
      }

      // Enviar una respuesta al cliente indicando que la imagen se ha subido correctamente
      res.send({ message: 'Imagen subida correctamente' });
    });
  */

  }
  catch (err) {
    console.error(err);
  }
};

/*
controller.sendImagesToAWS = async (req, res) => {
  try {

    const nameImage = "Agumon";
    const blobImage = req.body;
    console.log(blobImage);

    // Configurar los parámetros para enviar la imagen al bucket
    const params = {
      //Bucket: s3.bucketName, //Nombre del bucket
      Key: `${nameImage}.png`, // El nombre que quieres darle a la imagen en S3 | Puedo enviar el nombre con la imagen en body
      Body: blobImage,
      ContentType: 'image/png' // El tipo de contenido de la imagen
    };

    // Enviar la imagen al bucket
    s3.upload(params, function (err, data) {
      if (err) {
        // Enviar un mensaje de error al cliente si hubo un problema
        return res.status(500).send(err);
      }

      // Enviar una respuesta al cliente indicando que la imagen se ha subido correctamente
      res.send({ message: 'Imagen subida correctamente' });
    });

  }
  catch (err) {
    console.error(err);
  }
};
*/

module.exports = controller;
