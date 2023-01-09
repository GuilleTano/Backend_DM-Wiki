// FUNCIONALIDAD CUANDO USUARIO SE CONECTA A ESA RUTA

// PARA CORRER EL SERVIDOR EL COMANDO ES:  npm run dev

const controller = {};
const connection = require("../dbConnection/connection");
const DigiModel = require("../models/digimon.model");
const s3 = require("../s3config/s3connection") //Llamar a la conexion con s3

const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { GetObjectCommand } = require('@aws-sdk/client-s3');

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
    const fileName = "Agumon.png"; //req.name;
    const fileBlob = req.body;

    // Convierte el objeto blob a un string
    const fileBlobString = JSON.stringify(fileBlob);

    // Crea un buffer a partir del blob
    const fileBuffer = Buffer.from(fileBlobString);
    //console.log(fileBuffer);

    // Prepara los parámetros para la subida del archivo a S3
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer
    };

    //Se crea instancia de PutObjectCommand para utilizarla en el metodo send() de s3
    const command = new PutObjectCommand(params);

    s3.send(command, function(err, data) {
      if (err) {
        console.log('Error', err);
      }
      if (data) {
        console.log('Subido correctamente');
      }
    });

  }
  catch (err) {
    console.error(err);
  }
};

controller.getImagesToAWS = async (req, res) => {

  try{

    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: "Agumon.png",
    };

    const command = new GetObjectCommand(params);

    s3.send(command).then((data) => {
      console.log(`El archivo se ha descargado exitosamente`);
      //console.log(data); // El contenido del archivo se encuentra en la propiedad Body del objeto de respuesta.
      console.log(typeof data);
      const imagen = data.Body;

      console.log(imagen);


      //const pasarString = JSON.stringify(imagen);
      //const blobIMG = new Blob([pasarString]);

      //envio al cliente
      //res.setHeader('Content-Type', 'image/png');
      //res.send(data.Body);

    }).catch((err) => {
      console.log(err);
    });

  

  }
  catch (err){
    console.error(err);
  }

};




module.exports = controller;
