import { Socket } from 'socket.io';
import { ChatBotId } from '~/enums/chat-bot-id';

export const sendMessage = (socket: Socket, answer: string, chatBotId: ChatBotId) => {
	socket.emit('answer', answer, chatBotId);
};
