import express from 'express';
import { PrismaClient } from '@prisma/client';
import { UserId } from '~/types/session-user-id';
import { ChatBotId } from '~/enums/chat-bot-id';
import logger from '~/utils/logger';

const prisma = new PrismaClient();

export const saveMessageToDB = async (userId: UserId, chatId: ChatBotId, message: string) => {
	logger.info(`saveChats - uId: ${userId}, cId: ${chatId}, m: ${message}`);

	const chat = await prisma.chat.upsert({
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

	const newMessage = await prisma.message.create({
		data: {
			text: message,
			Chat: {
				connect: {
					id: chatId,
				},
			},
		},
	});
};

export const loadMessagesFromDB = () => {};
