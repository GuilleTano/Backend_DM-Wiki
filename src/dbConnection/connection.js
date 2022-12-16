const mongoose = require("mongoose");

const password = "MVNJBjhemE80wq6c";
const uri = `mongodb+srv://guille_atlas_03:${password}@cluster0.bqtubmo.mongodb.net/?retryWrites=true&w=majority`;

module.exports = ()=> mongoose.connect(uri);
/* Esto es lo mismo que lo de arriba pero con mas codigo
const connection = ()=> {
    mongoose.connect(uri, {userNewUrlParse: true, useUnifiedTopology: true});
}
module.exports = connection;
*/


// para el error que tira el mongoose
//mongoose.set('strictQuery', true);