import { WebSocket, Server } from 'mock-socket';
import { userData } from '../fixtures/userData';
describe('mock socket method 1', () => {
	const serverUrl = 'ws://localhost:8000/';
	let mockSocket;
	var mockServer = new Server(serverUrl);
	before(() => {
		cy.intercept(
			{
				method: 'POST', // Route all GET requests
				url: '/auth/isAuthenticated', // that have a URL that matches '/users/*'
			},
			{ status: 200 }, // and force the response to be: []
		).as('isAuthenticated'); // and assign an alias
		cy.visit('localhost:3000', {
			onBeforeLoad(win) {
				cy.stub(win, 'WebSocket', (url) => {
					try {
						mockServer = mockServer.on('connection', (socket) => {
							console.log('mock socket connected ' + serverUrl);

							//socket.on('message', () => {});
							//socket.on('close', () => {});
							socket.emit(
								'sendProfileData',
								'{"email":"' + userData.email + '","chats":"' + userData.chats + '"}',
							);
							console.log('send');

							mockSocket = socket;
						});

						console.log('sendData');
						if (!mockServer) return new WebSocket(serverUrl);
					} catch (e) {
						console.error(e);
					}
				});
			},
		});
	});

	after(() => {
		//mockSocket.close();
		//mockServer.stop(() => {});
	});

	it('can visit', () => {
		cy.visit('localhost:3000');
	});
});
