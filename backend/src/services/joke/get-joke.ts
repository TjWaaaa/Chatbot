import axios from 'axios';
import logger from '../../utils/logger';

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
