import { Server } from 'mock-socket';

describe('mock socket method 1', () => {
	let mockSocket;
	let mockServer;
	before(() => {
		cy.visit('localhost:3000', {
			onBeforeLoad(win) {
				cy.stub(win, 'WebSocket', (url) => {
					mockServer = new Server(url).on('connection', (socket) => {
						console.log('mock socket connected');
						mockSocket = socket;
					});
					if (!mockServer) return new WebSocket(url);
				});
			},
		});
	});

	after(() => {
		mockSocket.close();
		//((if (!mockServer) mockServer.stop();
	});

	it('gets a message', () => {
		/*
		const object = _createSettingsApiPutPayload(defaultSettingsState);
		mockSocket.send(JSON.stringify(object));
		cy.contains('Motion threshold');*/
	});
	it('gets a message', () => {
		/*
		const object = _createSettingsApiPutPayload(defaultSettingsState);
		mockSocket.send(JSON.stringify(object));
		cy.contains('Motion threshold');*/
	});
});
