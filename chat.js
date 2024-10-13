const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const AI = require('./AI.js');
const express = require('express'); // Importa o Express

const app = express(); // Cria uma instância do Express
const port = 3000 || process.env.PORT; // Define a porta

const whatsapp = new Client({
    authStrategy: new LocalAuth()
});

// whatsapp
whatsapp.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log(qr);
});

whatsapp.on('ready', () => {
    console.log('Client is ready!');
});

whatsapp.on('message', async message => {
    if (message.body) {
        const response = await AI(message.body);
        message.reply(response);
    }
});
// end whatsapp

whatsapp.initialize();

// Rota básica usando Express
app.get('/', (req, res) => {
    res.status(200).send('Hello, World!\n'); // Resposta da rota
});

// Inicia o servidor Express
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});