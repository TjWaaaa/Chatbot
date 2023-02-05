import { ChatBotType } from '../../enums/chat-bot-type';
import logger from '../../utils/logger';
import { Socket } from 'socket.io';
import { IncomingMessageWS } from '../../types/override-types';
import { createMessage } from './message';
import prismaContext from '../../configs/prisma';
import { getChat } from './chat';

export const saveMessage = async (socket: Socket, chatBotType: ChatBotType, message: string, sentByUser: boolean) => {
	logger.info(
		`saveChats - uId: ${
			(socket.request as IncomingMessageWS).session.userId
		}, cType: ${chatBotType}, m: ${message}`,
	);

	const chat = await getChat((socket.request as IncomingMessageWS).session.userId!, chatBotType, prismaContext);

	if (!chat?.chats[0].id) return;

	createMessage(
		{
			sentByUser: sentByUser,
			text: message,
			chatId: chat?.chats[0].id,
		},
		prismaContext,
	);
};
