import { ChatBotId } from '~/enums/chat-bot-id';
import { prisma } from '~/index';
import logger from '~/utils/logger';

export const saveMessageToDB = async (userId: any, chatId: ChatBotId, message: string, sentByUser: boolean) => {
	logger.info(`saveChats - uId: ${userId}, cId: ${chatId}, m: ${message}`);

	await prisma.chat.upsert({
		where: {
			id: chatId.toString(),
		},
		update: {},
		create: {
			User: {
				connect: {
					id: userId.toString(),
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
