const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const {Schema} = mongoose; //Es lo mismo que lo de arriba pero desestructurado

//Schema crea el esquema o la forma que tendran los datos de la base de datos
//En este ejemplo, como el dato de la BD tiene solo el parametro name (que es un string), solo ponemos ese
const DigiSchema = new Schema({
    name: String
});

const DigiModel = mongoose.model("digimons", DigiSchema);
// Le estasmos diciendo que cree un modelo, que pertenezca a la coleccion "digimons" y que tenga el esquema DigiSchema 

module.exports = DigiModel;