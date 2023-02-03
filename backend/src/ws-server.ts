import { Server, Socket } from 'socket.io';
import sessionConfig from './configs/session';
import { saveMessage } from './router/routeHandler/message';
import { httpServer } from './index';
import socketioAuthenticationHandler from './middlewares/socketio-authentication-handler';
import wrapSessionSocketio from './middlewares/wrap-session-socketio';
import { getChatBotAnswer, sendMessage } from './services/socket-api/socket-handler';
import logger from './utils/logger';
import { IncomingMessageWS } from './types/override-types';
import { getUserById } from './services/db/queries/user';
import prismaContext from './configs/prisma';

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
		const user = await getUserById((socket.request as IncomingMessageWS).session.userId!, prismaContext);
		socket.emit('sendProfileData', user);

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
			sendMessage(socket, answer, chatBotType);
		});
	});
}
