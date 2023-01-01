import { Server, Socket } from 'socket.io';
import { sessionConfig } from './config/session';
import { ChatBotId } from './enums/chat-bot-id';
import { httpServer } from './index';
import { wrap } from './middleware/add-session-to-socketio';
import { authenticationHandler } from './middleware/is-authenticated-socketio';
import { getBusinessAdvice } from './services/business-advice/getBusinessAdvice';
import { getJoke } from './services/joke/get-joke';
import { getTranslation } from './services/translation/get-translation';
import logger from './utils/logger';

export function wsServer() {
	const io = new Server(httpServer, {
		cors: {
			origin: 'http://localhost:3000',
			credentials: true,
		},
	});

	io.use(wrap(sessionConfig));
	io.use(authenticationHandler);

	io.on('connection', (socket: Socket) => {
		logger.info('Connected');

		socket.on('disconnect', function () {
			logger.info('Disconnected');
		});

		socket.on(ChatBotId.TRANSLATOR, (message: string) => {
			getTranslation(message, socket);
		});

		socket.on(ChatBotId.BUSINESSMAN, (message: string) => {
			getBusinessAdvice(message, socket);
		});

		socket.on(ChatBotId.JOKE, (message: string) => {
			getJoke(message, socket);
		});
	});
}
