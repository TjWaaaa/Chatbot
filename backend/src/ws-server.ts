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
					try {
						answer = await getTranslation(message);
					} catch (e) {
						answer =
							'Etwas ist schief gegangen...\nHast du die Sprache angegeben, in welche der Text übersetzt werden soll?\nBsp.: Französisch. Ich habe hunger.';
					}

					break;
				case ChatBotType.BUSINESSMAN:
					answer = getBusinessAdvice();
					break;
				case ChatBotType.JOKE:
					try {
						answer = await getJoke();
					} catch (e) {
						answer = 'Ich habe leider momentan keinen Witz parat. Frag mich bitte später noch einmal.';
					}

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
