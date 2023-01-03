import { Server, Socket } from 'socket.io';
import { sessionConfig } from './config/session';
import { ChatBotId } from './enums/chat-bot-id';
import { httpServer } from './index';
import { wrap } from './middleware/add-session-to-socketio';
import { authenticationHandler } from './middleware/is-authenticated-socketio';
import { getBusinessAdvice } from './services/business-advice/getBusinessAdvice';
import { getJoke } from './services/joke/get-joke';
import { saveMessageToDB } from './services/saveChats/saveChats';
import { getTranslation } from './services/translation/get-translation';
import { UserId } from './types/session-user-id';
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

		socket.on('message', ({ userId, chatBotId, message }) => {
			//logger.info(`ws-server: MESSAGE: ${message}, USER_ID: ${userId}, CHAT_BOT_ID: ${chatBotId}`);
			saveMessageToDB(userId, chatBotId, message);

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
