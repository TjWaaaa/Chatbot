import { Server } from 'mock-socket';

describe('mock socket method 1', () => {
	let mockSocket;
	let mockServer;
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
					mockServer = new Server(url).on('connection', (socket) => {
						console.log('mock socket connected');
						mockSocket = socket;

						mockSocket.on('sendProfileData', () => {
							socket.emit('sendProfileData', {});
						});
					});
					if (!mockServer) return new WebSocket(url);
				});
			},
		});
	});

	after(() => {
		mockSocket.close();
		//mockServer.stop();
	});

	it('can visit', () => {
		cy.visit('localhost:3000');
	});
});
