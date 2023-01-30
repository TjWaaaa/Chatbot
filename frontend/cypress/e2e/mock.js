import { Server } from 'mock-socket';

const sockets = {};
export function initServer() {
	// useful to reset sockets when doing TDD and webpack refreshes the app
	for (const socket of Object.values(sockets)) {
		socket.close();
	}

	mockServer();
}

function mockServer() {
	sockets.mockServer = new Server('ws://localhost:8000');

	sockets.mockServer.on('connection', (socket) => {
		sockets.server = socket;

		// Will be sent any time a client connects
		socket.send('Hello, world!');

		socket.on('message', (data) => {
			data: '';
		});
	});
}
