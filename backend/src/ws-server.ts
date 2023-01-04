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

		socket.on('message', ({ chatBotId, message }) => {
			logger.info(`ws-server: MESSAGE: ${message}, CHAT_BOT_ID: ${chatBotId}`);

			switch (chatBotId) {
				case ChatBotId.TRANSLATOR:
					getTranslation(message, socket);
					break;
				case ChatBotId.BUSINESSMAN:
					getBusinessAdvice(message, socket);
					break;
				case ChatBotId.JOKE:
					getJoke(message, socket);
					break;
				default:
					logger.info('no fitting ChatBotId', chatBotId);
			}
		});
	});
}
