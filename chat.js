const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const AI = require('./AI.js');
const http = require('http');

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

// Servidor HTTP
const hostname = '127.0.0.1'; // localhost
const port = 3000 || process.env.PORT;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});