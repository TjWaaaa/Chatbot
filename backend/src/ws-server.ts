import { Server, Socket } from 'socket.io';
import { sessionConfig } from './config/session';
import { ChatBotType } from './enums/chat-bot-type';
import { httpServer } from './index';
import { wrap } from './middleware/add-session-to-socketio';
import { authenticationHandler } from './middleware/is-authenticated-socketio';
import { getBusinessAdvice } from './services/business-advice/get-business-advice';
import { getJoke } from './services/joke/get-joke';
import { loadChatsFromDB, saveMessageToDB } from './services/prismaApi/dbHandler';
import { sendMessage } from './services/socketApi/socketHandler';
import { getTranslation } from './services/translation/get-translation';
import { IncomingMessageWS } from './types/override-types';
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

	io.on('connection', async (socket: Socket) => {
		logger.info('Connected');
		loadChatsFromDB(socket);

		socket.on('disconnect', function () {
			logger.info('Disconnected');
		});

		socket.on('message', async ({ chatBotType, message }) => {
			saveMessageToDB(socket, chatBotType, message, true);

			let answer = '';
			switch (chatBotType) {
				case ChatBotType.TRANSLATOR:
					answer = await getTranslation(message);
					break;
				case ChatBotType.BUSINESSMAN:
					answer = getBusinessAdvice();
					break;
				case ChatBotType.JOKE:
					answer = await getJoke();
					break;
				default:
					logger.info('no fitting ChatBotType', chatBotType);
			}

			if (answer === '') {
				throw new Error('Empty Answer');
			}

			saveMessageToDB(socket, chatBotType, answer, false);
			sendMessage(socket, answer, chatBotType);
		});
	});
}
