import { Socket } from 'socket.io';
import { ChatBotId } from '~/enums/chat-bot-id';
import logger from '~/utils/logger';
import { sendMessage } from '../sendMessage';

export const getBusinessAdvice = () => {
	const advices = ['Advide 1', 'Advice 2', 'Advide 3'];

	const answer = advices[Math.floor(Math.random() * advices.length)];
	logger.info(`Business advice: ${answer}`);
	//socket.emit('answer', answer, ChatBotId.BUSINESSMAN);
	return answer;
};
