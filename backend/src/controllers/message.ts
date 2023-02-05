import express from 'express';
import prismaContext from '../configs/prisma';
import { deleteAllMessages, getMessageById, updateMessageById } from '../services/db/message';

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
