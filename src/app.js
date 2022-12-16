// USA LAS RUTAS

const { Router } = require("express");
const express = require("express");


const app = express();

//const cors = require("cors");
//const fs = require("fs");

//app.use(cors());
//app.use(express.json());


// ROUTES
const routes = require("./routes/index.routers");
app.use(routes);


/*
app.post("/LINK-DEL-POST", (req, res) =>{

    const {id, name, img, attr, skills} = req.body;

    let newObj ={
        id: id,
        name: name,
        img: img,
        attr: attr,
        skills: skills
    };

    const json_newObj = JSON.stringify(newObj);
    fs.writeFileSync("json/lista_Digimon.json", json_newObj, "utf-8");

});
*/


app.listen(3000, ()=>{
    console.log("Escuchando a http://localhost:3000");
});
