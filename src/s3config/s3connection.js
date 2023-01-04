require("dotenv").config();

const { S3Client } = require('@aws-sdk/client-s3');

//const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials:{
      accessKeyId: AWS_PUBLIC_KEY,
      secretAccessKey: AWS_SECRET_KEY
  }
});

/*
const s3 = new S3Client({
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_PUBLIC_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});
*/

module.exports = s3;


/* Version antigua

const AWS = require("aws-sdk");
const AWS = require("@aws-sdk/client-s3");

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
*/


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