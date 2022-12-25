import { Socket } from 'socket.io';

export function wrap(sessionMiddleware: any) {
	return (socket: Socket, next: any) => sessionMiddleware(socket.request, {}, next);
}
