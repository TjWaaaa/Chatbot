import { Socket } from 'socket.io';
import { ChatBotId } from '~/enums/chat-bot-id';
import { setTimeout } from 'timers/promises';

export const sendMessage = async (answer: string, chatBotId: ChatBotId, socket: Socket) => {
	socket.emit('startsTyping');

	await setTimeout(2000);
	socket.emit('answer', answer, chatBotId);
};
