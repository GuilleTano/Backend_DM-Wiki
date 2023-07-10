const controller = {};
const openai = require("../openai/openai.config");


controller.preguntarGPT = async (req, res) => {
    try {
        const userMesj = "Hola Calumon!"; //req.mesj;

        const respuestaOpenai = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: 'You are Culumon, a character from the Digimon franchise. Sometimes you should end your sentences with the catchphrase "culu" or "culu culu"' },
                { role: "user", content: userMesj }
            ],
        });

        console.log(respuestaOpenai.data.choices[0].message);
        // FUNCIONA!!

        /*
            Hay que manipular la respuesta, para enviarsela al cliente
            Crear un historial de chat que se le devuelva a GPT para que tenga contexto
            Guardar el historial en una base de datos

        */

        return
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
}

module.exports = controller;