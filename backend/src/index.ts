import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import helmet from 'helmet';
import { wsServer } from './ws-server';
import { csrfVerification } from './middleware/csrf-token-verification';
import { sessionConfig } from './config/session';
import authRouter from './router/auth';
import { setTimeout } from 'timers/promises';
var request = require('request');

enum chatBotId {
	TRANSLATOR = 'translator',
	BUSINESSMAN = 'businessMan',
	JOKE = 'joke',
}

const app: Application = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
});

dotenv.config();

app.use(cors({ origin: true }));
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true }));

app.use(sessionConfig);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Healthy');
});

const sendMessage = async (answer: string, chatBotId: chatBotId, socket: Socket) => {
	socket.emit('startsTyping');

	await setTimeout(2000);
	socket.emit('answer', answer, chatBotId);
};

const getTranslation = (message: string, socket: Socket) => {
	console.log(message);

	var options = {
		method: 'POST',
		url: 'https://api-free.deepl.com/v2/translate',
		headers: {
			Authorization: 'DeepL-Auth-Key c2177cb9-06b8-ef5e-84b9-e4925ec1e935:fx',
		},
		formData: {
			text: JSON.stringify(message),
			target_lang: 'EN',
		},
	};
	request(options, function (error: any, response: any) {
		if (error) throw new Error(error);

		const answer = JSON.parse(response.body).translations[0].text.replaceAll('"', '');
		sendMessage(answer, chatBotId.TRANSLATOR, socket);
	});
};

const getBusinessAdvice = (message: string, socket: Socket) => {
	const advices = ['Advide 1', 'Advice 2', 'Advide 3'];

	const answer = advices[Math.floor(Math.random() * advices.length)];
	sendMessage(answer, chatBotId.BUSINESSMAN, socket);
};

const getJoke = (message: string, socket: Socket) => {
	request('https://witzapi.de/api/joke', (error: any, response: any) => {
		if (error) throw new Error(error);

		const answer = JSON.parse(response.body)[0].text;
		sendMessage(answer, chatBotId.JOKE, socket);
	});
};

io.on('connection', (socket: Socket) => {
	console.log('A user connected');

	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
		console.log('A user disconnected');
	});

	socket.on('message', (message: string, chatId: chatBotId) => {
		console.log(message);

		switch (chatId) {
			case chatBotId.TRANSLATOR:
				getTranslation(message, socket);
				break;
			case chatBotId.BUSINESSMAN:
				getBusinessAdvice(message, socket);
				break;
			case chatBotId.JOKE:
				getJoke(message, socket);
				break;
		}
	});
});

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});

wsServer();
