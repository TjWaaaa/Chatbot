import express from 'express';
import prismaContext from '../configs/prisma';
import {
	IS_NOT_LOGGED_IN,
	MESSAGE_DELETE_ERROR,
	MESSAGE_ID_NOT_EXISTS,
	MESSAGE_READ_ERROR,
	MESSAGE_UPDATE_ERROR,
} from '../consts/error-messages';
import { deleteAllMessages, getMessageById, updateMessageById } from '../services/db/message';

async function getMessage(req: express.Request, res: express.Response) {
	const id = req.params.id;

	try {
		const message = await getMessageById(id, prismaContext);

		if (!message) {
			return res.status(400).json({
				message: MESSAGE_ID_NOT_EXISTS,
			});
		}

		return res.status(200).json({
			message,
		});
	} catch (err) {
		return res.status(400).json({
			message: MESSAGE_READ_ERROR,
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
				message: MESSAGE_ID_NOT_EXISTS,
			});
		}

		await updateMessageById(id, text, prismaContext);

		return res.status(200).json({
			message: 'Nachricht geändert',
		});
	} catch (err) {
		return res.status(400).json({
			message: MESSAGE_UPDATE_ERROR,
		});
	}
}

async function deleteAll(req: express.Request, res: express.Response) {
	const userId = req.session.userId;

	if (!userId) {
		return res.status(400).json({
			message: IS_NOT_LOGGED_IN,
		});
	}

	try {
		await deleteAllMessages(userId, prismaContext);

		return res.status(200).json({
			message: 'Nachrichten gelöscht',
		});
	} catch (err) {
		return res.status(400).json({
			message: MESSAGE_DELETE_ERROR,
		});
	}
}

export default {
	getMessage,
	updateMessage,
	deleteAll,
};
