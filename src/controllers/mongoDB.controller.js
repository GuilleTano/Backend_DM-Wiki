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


module.exports = controller;