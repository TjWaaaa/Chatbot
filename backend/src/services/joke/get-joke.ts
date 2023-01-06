import axios from 'axios';
import { Socket } from 'socket.io';
import { ChatBotId } from '~/enums/chat-bot-id';
import logger from '~/utils/logger';
import { sendMessage } from '../sendMessage';

export const getJoke = async () => {
	return axios
		.get('https://witzapi.de/api/joke')
		.then((res) => {
			const answer = res.data[0].text;
			logger.info(`Joke: ${answer}`);
			//socket.emit('answer', answer, ChatBotId.JOKE);
			return answer;
		})
		.catch((err) => {
			throw new Error(err);
		});
};
