import { Socket } from 'socket.io';
import { ChatBotType } from '~/enums/chat-bot-type';

export const sendMessage = (socket: Socket, answer: string, chatBotType: ChatBotType) => {
	let chatId = -1;
	switch (chatBotType) {
		case ChatBotType.BUSINESSMAN:
			chatId = 0;
			break;
		case ChatBotType.JOKE:
			chatId = 1;
			break;
		case ChatBotType.TRANSLATOR:
			chatId = 2;
			break;
	}

	socket.emit('answer', answer, chatId);
};
