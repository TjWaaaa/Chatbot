import { Server, Socket } from 'socket.io';
import { sessionConfig } from './config/session';
import { ChatBotId } from './enums/chat-bot-id';
import { httpServer } from './index';
import { wrap } from './middleware/add-session-to-socketio';
import { authenticationHandler } from './middleware/is-authenticated-socketio';
import { getBusinessAdvice } from './services/business-advice/get-business-advice';
import { getJoke } from './services/joke/get-joke';
import { saveMessageToDB } from './services/prismaApi/dbHandler';
import { sendMessage } from './services/socketApi/socketHandler';
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

		socket.on('message', async ({ chatBotId, message }) => {
			logger.info(
				`ws-server: MESSAGE: ${message}, USER_ID: ${socket.request.session.userId}, CHAT_BOT_ID: ${chatBotId}`,
			);
			saveMessageToDB(socket.request.session.userId, chatBotId, message, true);

			let answer: string = '';
			switch (chatBotId) {
				case ChatBotId.TRANSLATOR:
					answer = await getTranslation(message);
					break;
				case ChatBotId.BUSINESSMAN:
					answer = getBusinessAdvice();
					break;
				case ChatBotId.JOKE:
					answer = await getJoke();
					break;
				default:
					logger.info('no fitting ChatBotId', chatBotId);
			}

			if (answer === '') {
				throw new Error('Empty Answer');
			}

			saveMessageToDB(socket.request.session.userId, chatBotId, answer, false);
			sendMessage(socket, answer, chatBotId);
		});
	});
}
