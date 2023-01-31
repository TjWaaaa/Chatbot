import { RequestHandler } from 'express';
import { Socket } from 'socket.io';

export default function wrapSessionSocketio(sessionMiddleware: any) {
	return (socket: Socket, next: any) => sessionMiddleware(socket.request, {}, next);
}
