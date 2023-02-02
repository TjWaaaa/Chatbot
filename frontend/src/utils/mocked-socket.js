import { userData } from '../demoData/userData';

class MockSocket {
	serverListeners = [];
	clientListeners = [];

	emit(eventName, data) {
		this.serverListeners
			.filter((o) => o.eventName === eventName)
			.map((listener) => {
				listener.callback(data);
			});
	}
	emitServer(eventName, data) {
		this.clientListeners
			.filter((o) => o.eventName === eventName)
			.map((listener) => {
				if (data.length) {
					listener.callback(...data);
				} else {
					listener.callback(data);
				}
			});
	}

	on(eventName, callback) {
		this.clientListeners.push({
			eventName: eventName,
			callback: callback,
		});
	}
	onServer(eventName, callback) {
		this.serverListeners.push({
			eventName: eventName,
			callback: callback,
		});
	}

	connect(url) {}

	reset() {
		this.clientListeners = [];
	}
}

let mockedSocket = new MockSocket();
mockedSocket.onServer('connection', (obj) => {
	console.log('connected');
	setTimeout(() => {
		mockedSocket.emitServer('sendProfileData', userData);
	}, 500);
});
mockedSocket.onServer('message', ({ chatBotType, message }) => {
	let chatId;

	switch (chatBotType) {
		case 'translator':
			chatId = 0;
			break;
		case 'businessMan':
			chatId = 1;
			break;
		case 'joke':
			chatId = 2;
	}
	setTimeout(() => {
		mockedSocket.emitServer('answer', ['Test Answer! Here is your input: ' + message, chatId]);
	}, 500);
});
export const mockedSocketClient = mockedSocket;
