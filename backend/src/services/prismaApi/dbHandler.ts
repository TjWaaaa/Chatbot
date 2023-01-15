import { ChatBotType } from '~/enums/chat-bot-type';
import { prisma } from '~/index';
import logger from '~/utils/logger';
import { Socket } from 'socket.io';
import { IncomingMessageWS } from '~/types/override-types';

export const saveMessageToDB = async (
	socket: Socket,
	chatBotType: ChatBotType,
	message: string,
	sentByUser: boolean,
) => {
	logger.info(
		`saveChats - uId: ${
			(socket.request as IncomingMessageWS).session.userId
		}, cType: ${chatBotType}, m: ${message}`,
	);

	const chat = await prisma.user.findUnique({
		where: {
			id: (socket.request as IncomingMessageWS).session.userId,
		},
		select: {
			chats: {
				where: {
					chatBotType: chatBotType,
				},
				select: {
					id: true,
					chatBotType: true,
					messages: true,
				},
			},
		},
	});

	if (!chat?.chats[0].id) return;

	await prisma.message.create({
		data: {
			text: message,
			sentByUser: sentByUser,
			chatId: chat?.chats[0].id,
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
					name: true,
					img: true,
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
