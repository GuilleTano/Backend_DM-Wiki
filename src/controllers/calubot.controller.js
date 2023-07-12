const controller = {};
const openai = require("../openai/openai.config");

// Historial de chat
const chatHistory = [
    { role: "system", content: 'You are Culumon, a character from the Digimon franchise. Sometimes you should end your sentences with the catchphrase "culu" or "culu culu"' },
];


controller.preguntarCalubot = async (req, res) => {
    try {

        const mensaje = req.body.message;
        const userMesj = { role: "user", content: mensaje };

        const respuestaOpenai = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chatHistory.concat(userMesj)
        });

        chatHistory.push(userMesj);
        chatHistory.push(respuestaOpenai.data.choices[0].message);

        console.log(chatHistory);

        return res.status(200).json({ caluAnswer: respuestaOpenai.data.choices[0].message });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No pudimos comunicarnos con Calumon' });
    }
}

module.exports = controller;