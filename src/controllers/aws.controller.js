const controller = {};
const s3 = require("../s3config/s3connection") //Llamar a la conexion con s3
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
//const { ListObjectsCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const myCache = require("../myCache/myCache");

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

        // Primero se revisa el cache de imagenes
        const imgCache = myCache.getImgCache(digiName);
        if (imgCache){
            const url = imgCache
            return res.json({ url, ok: true });
        }

        // Si la imagen no existe en cache, se solicita a AWS
        const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: digiName,
        };
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3, command, { expiresIn: 43.200 }); //12hs = 43.200s

        // Y aqui se guarda en el cache
        myCache.saveImgCache(digiName, url);

        return res.json({ url, ok: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
};


module.exports = controller;