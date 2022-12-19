import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import authRouter from './router/auth';
import request from 'request';
import helmet from 'helmet';
import csrfTokenVerification from './middleware/csrfTokenVerification';
import { sessionOptions } from './utils/session';

enum chatBotId {
	TRANSLATOR = 'translator',
	BUSINESSMAN = 'businessMan',
	JOKE = 'joke',
}

dotenv.config();

const app: Application = express();
app.use(helmet());

app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST', 'OPTIONS'], credentials: true }));

if (app.get('env') === 'production') {
	app.set('trust proxy', 1);
	sessionOptions.cookie.secure = true;
}

app.use(sessionOptions);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
});

const wrap = (middleware: any) => (socket: Socket, next: any) => middleware(socket.request, {}, next);

io.use(wrap(sessionOptions));

// only allow authenticated users
io.use((socket, next) => {
	const session = socket.request.session;
	if (session && session.user) {
		console.log('authenticated');
		next();
	} else {
		console.log('unauthorized');
		next(new Error('unauthorized'));
	}
});

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

app.use((req, res, next) => {
	csrfTokenVerification(req, res, next);
});

app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Healthy');
});

const getTranslation = (message: string, socket: Socket) => {
	console.log(message);

	const options = {
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
		console.log(answer);
		socket.emit('answer', answer, chatBotId.TRANSLATOR);
	});
};

const getBusinessAdvice = (message: string, socket: Socket) => {
	const advices = ['Advide 1', 'Advice 2', 'Advide 3'];

	const answer = advices[Math.floor(Math.random() * advices.length)];
	socket.emit('answer', answer, chatBotId.BUSINESSMAN);
};

const getJoke = (message: string, socket: Socket) => {
	request('https://witzapi.de/api/joke', (error: any, response: any) => {
		if (error) throw new Error(error);

		const answer = JSON.parse(response.body)[0].text;
		socket.emit('answer', answer, chatBotId.JOKE);
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
		}
	});
});

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
