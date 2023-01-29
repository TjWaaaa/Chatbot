import { Server, Socket } from 'socket.io';
import sessionConfig from './configs/session';
import { httpServer } from './index';
import socketioAuthenticationHandler from './middlewares/socketio-authentication-handler';
import wrapSessionSocketio from './middlewares/wrap-session-socketio';
import { loadChatsFromDB, saveMessageToDB } from './services/db/db-handler';
import { getChatBotAnswer, sendMessage } from './services/socket-api/socket-handler';
import logger from './utils/logger';

export default function wsServer() {
	const io = new Server(httpServer, {
		cors: {
			origin: 'http://localhost:3000',
			credentials: true,
		},
	});

	io.use(wrapSessionSocketio(sessionConfig));
	io.use(socketioAuthenticationHandler);

	io.on('connection', async (socket: Socket) => {
		logger.info('Connected');
		loadChatsFromDB(socket);

		socket.on('disconnect', function () {
			logger.info('Disconnected');
		});

		socket.on('message', async ({ chatBotType, message }) => {
			saveMessageToDB(socket, chatBotType, message, true);

			const answer = await getChatBotAnswer(chatBotType, message);

			if (answer === '') {
				throw new Error('Empty Answer');
			}

			saveMessageToDB(socket, chatBotType, answer, false);
			sendMessage(socket, answer, chatBotType);
		});
	});
}
