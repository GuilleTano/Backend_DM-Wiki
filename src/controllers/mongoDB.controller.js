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
        //const docs = await DigiModel.find({ 'priorEvolutions': { $elemMatch: { id: null, digimon:"Amano Nene" } } }).exec();

        console.log(docs.length);

        // Con esto modifico todos los Digitama con ID null a el ID o dato que quiera
        /*
        const filter = { 'priorEvolutions.id': null, 'priorEvolutions.digimon': 'Amano Nene' };
        const update = { $set: { 
            'priorEvolutions.$[elem].id': 1433,
            'priorEvolutions.$[elem].digimon': 'Amano Nene'
        } };
        const options = { arrayFilters: [ { 'elem.id': null ,'elem.digimon': 'Amano Nene' } ] };
        const result = await DigiModel.updateMany(filter, update, options);
        console.log(result.nModified + ' documents updated');
        */

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
}

controller.getNextEvoNull = async (req, res) => {
    try {
        await connectionDB();

        const docs = await DigiModel.find({ 'nextEvolutions': { $elemMatch: { id: null } } }).exec();
        //const docs = await DigiModel.find({ 'nextEvolutions': { $elemMatch: { id: null, digimon:"Minotarumon Adult" } } }).exec();

        console.log(docs.length);

        //console.log(docs[0].name);

        // Con esto modifico todos los Digitama con ID null a el ID o dato que quiera
        /*
        const filter = { 'nextEvolutions.id': null, 'nextEvolutions.digimon': 'Xros Up Opossummon' };
        const update = { $set: { 
            'nextEvolutions.$[elem].id': 305,
            'nextEvolutions.$[elem].digimon': 'Xros Up Opossummon (Candmon)'
        } };
        const options = { arrayFilters: [ { 'elem.id': null ,'elem.digimon': 'Xros Up Opossummon' } ] };
        const result = await DigiModel.updateMany(filter, update, options);
        console.log(result.nModified + ' documents updated');
        */

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
}



module.exports = controller;