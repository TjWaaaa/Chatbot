import SocketMock from 'socket.io-mock';
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
				listener.callback(data);
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
		this.listeners = [];
	}
}

let mockedSocket = new MockSocket();
mockedSocket.onServer('connection', (obj) => {
	console.log('connected');
	setTimeout(() => {
		mockedSocket.emitServer('sendProfileData', userData);
	}, 500);
});
mockedSocket.onServer('message', (message) => {
	console.log('message recieved');
});
export const mockedSocketClient = mockedSocket;
