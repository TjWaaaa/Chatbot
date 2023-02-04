import { Socket } from 'socket.io';
import { TEXT_NOT_FOUND } from '../../const/errorCodes';
import { ChatBotType } from '../../enums/chat-bot-type';
import logger from '../../utils/logger';
import { getBusinessAdvice } from '../business-advice/get-business-advice';
import { getJoke } from '../joke/get-joke';
import { getTranslation } from '../translation/get-translation';

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

export async function getChatBotAnswer(chatBotType: ChatBotType, message: string) {
	switch (chatBotType) {
		case ChatBotType.TRANSLATOR:
			return await getTranslation(message).catch((err) => {
				if (err.message === TEXT_NOT_FOUND) {
					return 'Etwas ist schief gegangen...\nHast du nach der Sprache ein Satzzeichen angegeben?\nBsp.: Französisch. Ich habe hunger.';
				}
				return 'Etwas ist schief gegangen...\nHast du die Sprache angegeben, in welche der Text übersetzt werden soll?\nBsp.: Französisch. Ich habe hunger.';
			});
		case ChatBotType.BUSINESSMAN:
			return getBusinessAdvice();
		case ChatBotType.JOKE:
			return await getJoke().catch(() => {
				return 'Ich habe leider momentan keinen Witz parat. Frag mich bitte später noch einmal.';
			});
		default:
			logger.info('no fitting ChatBotType', chatBotType);
	}
}
