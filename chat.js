const qrcode = require('qrcode-terminal');
const { Client, LocalAuth  } = require('whatsapp-web.js');
const AI = require('./AI.js');
const http = require('http');

const whatsapp = new Client({
    authStrategy: new LocalAuth()
});

// whatsapp
whatsapp.on('qr', qr => {
    //qrcode.generate(qr, {small: true });
    console.log(qr)
});

whatsapp.on('ready', () => {
    console.log('Client is ready!');
});

whatsapp.on('message', async message => {
	if(message.body) {
		const response = await AI(message.body);
        message.reply(response);
	}
});
// end whatsapp

whatsapp.initialize();

// Importando o módulo http


// Definindo o hostname e a porta
const hostname = '127.0.0.1'; // localhost
const port = 3000 || process.env.PORT;

// Criando o servidor
const server = http.createServer((req, res) => {
  // Definindo o cabeçalho de resposta HTTP
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Enviando a resposta
  res.end('Hello, World!\n');
});

// Ouvindo a porta 3000
server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
