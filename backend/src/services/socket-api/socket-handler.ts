import { Socket } from 'socket.io';
import {
	NO_JOKE_AVAIBLE,
	TRANSLATION_LANGUAGE_MISSING,
	TRANSLATION_PUNCTUATION_MISSING,
} from '../../consts/error-messages';
import { ChatBotType } from '../../enums/chat-bot-type';
import logger from '../../utils/logger';
import { getBusinessAdvice } from '../business-advice/get-business-advice';
import { getJoke } from '../joke/get-joke';
import { getTranslation } from '../translation/get-translation';

export const sendMessage = (socket: Socket, answer: string, chatBotType: ChatBotType) => {
	socket.emit('answer', answer, chatBotType);
};

export async function getChatBotAnswer(chatBotType: ChatBotType, message: string) {
	switch (chatBotType) {
		case ChatBotType.TRANSLATOR:
			return await getTranslation(message).catch((err) => {
				if (err.message === TRANSLATION_PUNCTUATION_MISSING) {
					return err.message;
				}
				return TRANSLATION_LANGUAGE_MISSING;
			});
		case ChatBotType.BUSINESSMAN:
			return await getBusinessAdvice();
		case ChatBotType.JOKE:
			return await getJoke().catch(() => {
				return NO_JOKE_AVAIBLE;
			});
		default:
			logger.warn('no fitting ChatBotType', chatBotType);
	}
}
