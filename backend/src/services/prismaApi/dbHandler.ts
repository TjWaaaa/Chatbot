import { ChatBotId } from '~/enums/chat-bot-id';
import { prisma } from '~/index';
import logger from '~/utils/logger';
import { Socket } from 'socket.io';
import { IncomingMessageWS } from '~/types/override-types';

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
			chatBotType: chatId,
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

export const loadChatsFromDB = async (socket: Socket) => {
	const user = await prisma.user.findUnique({
		where: {
			id: (socket.request as IncomingMessageWS).session.userId,
		},
		select: {
			email: true,
			chats: {
				select: {
					id: false,
					chatBotType: true,
					messages: {
						select: {
							id: false,
							chatId: false,
							text: true,
							sentByUser: true,
							timeStamp: true,
						},
					},
				},
			},
		},
	});

	if (!user) {
		throw new Error('Failed loading messages');
	}

	socket.emit('sendProfileData', user);
};
