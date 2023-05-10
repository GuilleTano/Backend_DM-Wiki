const controller = {};
const connectionDB = require("../dbConnection/connection");
const DigiModel = require("../models/digimon.model");
require("dotenv").config();


controller.addDigimonToBD = async (req, res, next) => {
    let i = 0;
    try {
        const { name, id, xAntibody, releaseDate, levels, fields,
            attributes, descriptions, skills, types, priorEvolutions, nextEvolutions } = req.body;
        const newDigimon = {
            name: name,
            id: id,
            types: types,
            xAntibody: xAntibody,
            releaseDate: releaseDate,
            levels: levels,
            fields: fields,
            attributes: attributes,
            descriptions: descriptions,
            skills: skills,
            priorEvolutions: priorEvolutions,
            nextEvolutions: nextEvolutions
        };

        await connectionDB();
        const digimon = await DigiModel.findOne({ name: newDigimon.name });
        if (digimon) {
            console.log("El Digimon ya existe");
            return res.status(200).json({ message: 'El Digimon ya existe' });
        }

        await DigiModel.create(newDigimon);
        i++
        console.log("Digimon cargados a DB: " + i);
        return res.status(200).json({ message: 'El Digimon se agregó correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
};

controller.getDigimonFromBD = async (req, res) => {
    try {
        await connectionDB();
        const digimon = await DigiModel.findOne({ name: req.params.name });

        if (!digimon) {
            return res.status(200).json({ message: 'El Digimon' + digimon + 'no existe' });
        }

        console.log("Digimon enviado");
        return res.json(digimon);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
}


//Controller para pedir lista de id null
controller.getPriorEvoNull = async (req, res) => {
    try {
        await connectionDB();

        const docs = await DigiModel.find({ 'priorEvolutions': { $elemMatch: { id: null } } }).exec();

        console.log(docs.length);
        //console.log(docs[1].priorEvolutions);

        
        /* Con esto remplazamos todos los Digitama con ID null a ID 1500 (Falta agregar imagen de Digitama)
        const filter = { 'priorEvolutions.id': null, 'priorEvolutions.digimon': 'Digitama' };
        const update = { $set: { 'priorEvolutions.$[elem].id': 1500 } };
        const options = { arrayFilters: [ { 'elem.id': null, 'elem.digimon': 'Digitama' } ] };
        const result = await DigiModel.updateMany(filter, update, options);
        console.log(result.nModified + ' documents updated');
        */

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
}




module.exports = controller;