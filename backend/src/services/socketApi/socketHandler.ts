import { Socket } from 'socket.io';
import { ChatBotType } from '~/enums/chat-bot-type';

export const sendMessage = (socket: Socket, answer: string, chatBotType: ChatBotType) => {
	socket.emit('answer', answer, chatBotType);
};
