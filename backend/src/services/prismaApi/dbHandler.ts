import { ChatBotId } from '~/enums/chat-bot-id';
import { prisma } from '~/index';
import logger from '~/utils/logger';

export const saveMessageToDB = async (userId: string, chatId: ChatBotId, message: string, sentByUser: boolean) => {
	logger.info(`saveChats - uId: ${userId}, cId: ${chatId}, m: ${message}`);

	await prisma.chat.upsert({
		where: {
			id: chatId,
		},
		update: {},
		create: {
			User: {
				connect: {
					id: userId,
				},
			},
			id: chatId,
		},
	});

	await prisma.message.create({
		data: {
			text: message,
			sentByUser: sentByUser,
			Chat: {
				connect: {
					id: chatId,
				},
			},
		},
	});
};

export const loadMessagesFromDB = () => {};
