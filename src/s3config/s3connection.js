require("dotenv").config();
const AWS = require("aws-sdk");

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY

// Configurar la autenticación de AWS con tu clave de acceso y clave secreta
AWS.config.update({
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_PUBLIC_KEY,
  secretAccessKey: AWS_SECRET_KEY
});

// Crear una instancia de S3
const s3 = new AWS.S3({params: {Bucket: AWS_BUCKET_NAME}});

module.exports = s3;
/*ESTO YA ESTA EN CONTROLLER
// La imagen en formato base64
const base64Image = 'TU_IMAGEN_EN_BASE64';

// Convertir la imagen en base64 a un buffer para poder enviarla a S3
const buffer = Buffer.from(base64Image, 'base64');

// Configurar los parámetros para enviar la imagen al bucket
const params = {
  Bucket: AWS_BUCKET_NAME,
  Key: 'prueba.jpg', // El nombre que quieres darle a la imagen en S3
  Body: buffer,
  ContentType: 'image/jpeg' // El tipo de contenido de la imagen
};

// Enviar la imagen al bucket
s3.upload(params, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
*/

//module.exports = s3;

/* TUTORIAL DE YOUTUBE
require("dotenv").config();
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY

const client = new S3Client({region: AWS_BUCKET_REGION,
    credentials:{
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
});


async function uploadFile(pathFile){

    const stream = fs.createReadStream(pathFile);

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: "archivo",
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams);

    return await client.send(command);
}

module.exports = {
    uploadFile
}
*/