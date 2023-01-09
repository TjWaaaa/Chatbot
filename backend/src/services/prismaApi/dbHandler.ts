import { PrismaClient } from '@prisma/client';
import { ChatBotId } from '~/enums/chat-bot-id';
import logger from '~/utils/logger';

const prisma = new PrismaClient();

export const saveMessageToDB = async (userId: any, chatId: ChatBotId, message: string, sentByUser: boolean) => {
	logger.info(`saveChats - uId: ${userId}, cId: ${chatId}, m: ${message}`);

	prisma.
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
