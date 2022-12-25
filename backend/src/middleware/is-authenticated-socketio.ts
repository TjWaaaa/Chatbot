import { Socket } from 'socket.io';

export function authenticationHandler(socket: Socket, next: any) {
	const session = socket.request.session;
	if (session && session.user) {
		console.log('authenticated');
		next();
	} else {
		console.log('unauthorized');
		next(new Error('unauthorized'));
	}
}
