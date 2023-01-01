import axios from 'axios';
import { Socket } from 'socket.io';
import { ChatBotId } from '~/enums/chat-bot-id';
import logger from '~/utils/logger';

export const getJoke = (message: string, socket: Socket) => {
	axios
		.get('https://witzapi.de/api/joke')
		.then((res) => {
			const answer = res.data[0].text;
			logger.info(`Joke: ${answer}`);
			socket.emit('answer', answer, ChatBotId.JOKE);
		})
		.catch((err) => {
			throw new Error(err);
		});
};
