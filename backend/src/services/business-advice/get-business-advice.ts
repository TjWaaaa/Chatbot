import logger from '../../utils/logger';

export const getBusinessAdvice = () => {
	const advices = ['Advice 1', 'Advice 2', 'Advice 3'];

	const answer = advices[Math.floor(Math.random() * advices.length)];
	logger.info(`Business advice: ${answer}`);
	//socket.emit('answer', answer, ChatBotId.BUSINESSMAN);
	return answer;
};
