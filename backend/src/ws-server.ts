import { Server, Socket } from 'socket.io';
import sessionConfig from './configs/session';
import { httpServer } from './index';
import socketioAuthenticationHandler from './middlewares/socketio-authentication-handler';
import wrapSessionSocketio from './middlewares/wrap-session-socketio';
import { getChatBotAnswer } from './services/socket-api/get-chat-bot-answer';
import logger from './utils/logger';
import { IncomingMessageWS } from './types/override-types';
import userDb from './services/db/user';
import prismaContext from './configs/prisma';
import { saveMessage } from './services/db/db-handler';

export default function wsServer() {
	const io = new Server(httpServer, {
		cors: {
			origin: process.env.ORIGIN,
			credentials: true,
		},
	});

	io.use(wrapSessionSocketio(sessionConfig));
	io.use(socketioAuthenticationHandler);

	io.on('connection', async (socket: Socket) => {
		logger.info('Connected');
		const userId = (socket.request as IncomingMessageWS).session.userId!;
		const userMessages = await userDb.getUserMessages(userId, prismaContext);

		if (!userMessages) {
			socket.emit('sendProfileData', 'Nachrichten konnten nicht geladen werden');
		} else {
			socket.emit('sendProfileData', userMessages);
		}

		socket.on('disconnect', function () {
			logger.info('Disconnected');
		});

		socket.on('message', async ({ chatBotType, message }) => {
			saveMessage(socket, chatBotType, message, true);

			const answer = await getChatBotAnswer(chatBotType, message);

			if (answer === '') {
				throw new Error('Empty Answer');
			}

			saveMessage(socket, chatBotType, answer, false);
			socket.emit('answer', answer, chatBotType);
		});
	});
}
