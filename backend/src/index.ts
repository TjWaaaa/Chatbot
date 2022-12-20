import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import authRouter from './router/auth';

import { chatBotId } from './bots/botTypes';
import { getTranslation } from './bots/translationBot';
import { getJoke } from './bots/jokeBot';

const app: Application = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
});

dotenv.config();

io.on('connection', (socket: Socket) => {
	console.log('A user connected');

	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
		console.log('A user disconnected');
	});

	socket.on('message', (message) => {
		console.log(message);
		socket.emit('answer', 'Server Answer');
	});
});

app.use(cors({ origin: true }));
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Healthy');
});

const getBusinessAdvice = (message: string, socket: Socket) => {
	const advices = ['Advide 1', 'Advice 2', 'Advide 3'];

	const answer = advices[Math.floor(Math.random() * advices.length)];
	socket.emit('answer', answer, chatBotId.BUSINESSMAN);
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
			case chatBotId.BUSINESSMAN:
				getBusinessAdvice(message, socket);
			case chatBotId.JOKE:
				getJoke(message, socket);
		}
	});
});

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
