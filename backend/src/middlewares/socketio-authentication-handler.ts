import { Socket } from 'socket.io';
import { IncomingMessageWS } from '../types/override-types';
import logger from '../utils/logger';

export default function socketioAuthenticationHandler(socket: Socket, next: any) {
	const session = (socket.request as IncomingMessageWS).session;
	if (session && session.userId) {
		logger.info(`User ${session.userId} authenticated`);
		next();
	} else {
		logger.warn('Unauthorized');
		next(new Error('Unauthorized'));
	}
}
