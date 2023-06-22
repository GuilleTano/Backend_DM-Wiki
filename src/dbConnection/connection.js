require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_PASS = process.env.MONGODB_PASS;
const MONGODB_NAME = process.env.MONGODB_NAME;
const uri = `mongodb+srv://guille_atlas_03:${MONGODB_PASS}@cluster0.bqtubmo.mongodb.net/?retryWrites=true&w=majority`;
const options = {dbName: MONGODB_NAME};


module.exports = ()=> mongoose.connect(uri, options);


mongoose.set('strictQuery', true);