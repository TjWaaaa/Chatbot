import { Socket } from 'socket.io';
import logger from '~/utils/logger';

export function authenticationHandler(socket: Socket, next: any) {
	const session = socket.request.session;
	if (session && session.userId) {
		logger.info(`User ${session.userId} authenticated`);
		next();
	} else {
		logger.warn('Unauthorized');
		next(new Error('Unauthorized'));
	}
}
