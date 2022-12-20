import { Socket } from 'socket.io';
var request = require('request');
import { chatBotId } from './botTypes';
export const getJoke = (message: string, socket: Socket) => {
	request('https://witzapi.de/api/joke', (error: any, response: any) => {
		if (error) throw new Error(error);

		const answer = JSON.parse(response.body)[0].text;
		socket.emit('answer', answer, chatBotId.JOKE);
	});
};
