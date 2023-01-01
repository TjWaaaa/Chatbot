import { Socket } from 'socket.io';
import logger from '~/utils/logger';

export function authenticationHandler(socket: Socket, next: any) {
	const session = socket.request.session;
	if (session && session.user) {
		logger.info(`User ${session.user.id} authenticated`);
		next();
	} else {
		logger.warn('Unauthorized');
		next(new Error('Unauthorized'));
	}
}
