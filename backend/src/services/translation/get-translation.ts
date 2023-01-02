import { Socket } from 'socket.io';
import { ChatBotId } from '../../enums/chat-bot-id';
import axios from 'axios';
import logger from '~/utils/logger';

export const getTranslation = (message: string, socket: Socket) => {
	logger.info(`Message: ${message}`);

	const body = {
		text: [message],
		target_lang: 'EN',
	};

	const headers = {
		headers: {
			Authorization: process.env.DEEPL_AUTH_KEY,
		},
	};

	axios
		.post('https://api-free.deepl.com/v2/translate', body, headers)
		.then((res) => {
			const answer = res.data.translations[0].text;
			logger.info(`Translation: ${answer}`);
			socket.emit('answer', answer, ChatBotId.TRANSLATOR);
		})
		.catch((err) => {
			throw new Error(err);
		});
};
