import express from 'express';
import { Socket } from 'socket.io';
import { ChatBotType } from '../../enums/chat-bot-type';
import { createMessage, deleteAllMessages, getMessageById, updateMessageById } from '../../services/db/queries/message';
import logger from '../../utils/logger';
import { IncomingMessageWS } from '../../types/override-types';
import prismaContext from '../../configs/prisma';
import { getChat } from '../../services/db/queries/chat';

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

async function getMessage(req: express.Request, res: express.Response) {
	const id = req.params.id;

	try {
		const message = await getMessageById(id, prismaContext);

		if (!message) {
			return res.status(400).json({
				message: 'Es existiert keine Nachricht mit dieser ID. Bitte erstelle eine Nachricht.',
			});
		}

		return res.status(200).json({
			message,
		});
	} catch (err) {
		return res.status(400).json({
			message:
				'Ein Fehler beim Abrufen der Nachricht ist passiert. Versuche es erneut oder kontaktiere den Support.',
		});
	}
}

async function updateMessage(req: express.Request, res: express.Response) {
	const id = req.params.id;
	const { text } = req.body;

	try {
		const message = await getMessageById(id, prismaContext);

		if (!message) {
			return res.status(400).json({
				message: 'Es existiert keine Nachricht mit dieser ID. Bitte erstelle eine Nachricht.',
			});
		}

		await updateMessageById(id, text, prismaContext);

		return res.status(200).json({
			message: 'Nachricht geändert',
		});
	} catch (err) {
		return res.status(400).json({
			message:
				'Ein Fehler beim Updaten der Nachricht ist passiert. Versuche es erneut oder kontaktiere den Support.',
		});
	}
}

async function deleteAll(req: express.Request, res: express.Response) {
	const userId = req.session.userId;

	if (!userId) {
		return res.status(400).json({
			message: 'Du musst eingeloggt sein, um Nachrichten zu löschen.',
		});
	}

	try {
		await deleteAllMessages(userId, prismaContext);

		return res.status(200).json({
			message: 'Nachrichten gelöscht',
		});
	} catch (err) {
		return res.status(400).json({
			message:
				'Ein Fehler beim Löschen der Nachrichten ist passiert. Versuche es erneut oder kontaktiere den Support.',
		});
	}
}

export default {
	getMessage,
	updateMessage,
	deleteAll,
};
