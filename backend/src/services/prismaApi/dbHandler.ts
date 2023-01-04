import { PrismaClient } from '@prisma/client';
import { UserId } from '~/types/session-user-id';
import { ChatBotId } from '~/enums/chat-bot-id';
import logger from '~/utils/logger';

const prisma = new PrismaClient();

export const saveMessageToDB = async (userId: UserId, chatId: ChatBotId, message: string, sentByUser: boolean) => {
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
