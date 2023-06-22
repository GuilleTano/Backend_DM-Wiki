const mongoose = require("mongoose");
const {Schema} = mongoose;

const DigiSchema = new Schema({
    id: Number,
    name: String,
    xAntibody: Boolean,
    releaseDate: String,
    types:[{
        id: {
          type: Number,
          required: true
        },
        type: {
          type: String,
          required: true
        }
      }],
    levels:[{
        id: Number,
        level: String
    }],
    fields: [{
        id: Number,
        field: String
    }],
    attributes: [{
        id: Number,
        attribute: String
    }],
    descriptions: [{
        origin: String,
        language: String,
        description: String
    }],
    skills: [{
        id: Number,
        skill: String,
        description: String,
        translation: String
    }],
    priorEvolutions: [{
        id: Number,
        digimon: String,
        condition: String
    }],
    nextEvolutions: [{
        id: Number,
        digimon: String,
        condition: String
    }]
});

const DigiModel = mongoose.model("digimons", DigiSchema);

module.exports = DigiModel;