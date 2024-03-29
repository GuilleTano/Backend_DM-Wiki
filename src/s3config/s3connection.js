require("dotenv").config();
const { S3Client } = require('@aws-sdk/client-s3');

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


module.exports = s3;