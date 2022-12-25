const mongoose = require("mongoose");

const password = "MVNJBjhemE80wq6c";
const uri = `mongodb+srv://guille_atlas_03:${password}@cluster0.bqtubmo.mongodb.net/?retryWrites=true&w=majority`;
const options = {dbName: "digipedia"};


module.exports = ()=> mongoose.connect(uri, options);
/* Esto es lo mismo que lo de arriba pero con mas codigo
const connection = ()=> {
    mongoose.connect(uri, options);
}
module.exports = connection;
*/


// para el error que tira el mongoose
mongoose.set('strictQuery', true);
