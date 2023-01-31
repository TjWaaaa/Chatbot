import express from 'express';
import { deleteUserById, getUserById, updateUserEmailById } from '../services/db/user';

export async function updateUserEmail(req: express.Request, res: express.Response) {
	const id = req.params.id;
	const { email } = req.body;

	try {
		const user = await getUserById(id);

		if (!user) {
			return res.status(400).json({
				message: 'Es existiert kein Benutzer mit dieser ID. Bitte registriere dich zuerst.',
			});
		}

		await updateUserEmailById(id, email);

		return res.status(200).json({
			message: 'User updated',
		});
	} catch (err) {
		return res.status(400).json({
			message: 'Ein Fehler beim Updaten des Users ist passiert. Versuche es erneut oder kontaktiere den Support.',
		});
	}
}

async function deleteUser(req: express.Request, res: express.Response) {
	const id = req.params.id;
	try {
		const user = await getUserById(id);

		if (!user) {
			return res.status(400).json({
				message: 'Es existiert kein Benutzer mit dieser ID. Bitte registriere dich zuerst.',
			});
		}

		await deleteUserById(id);

		return res.status(200).json({
			message: 'User deleted',
		});
	} catch (err) {
		return res.status(400).json({
			message: 'Ein Fehler beim Löschen des Users ist passiert. Versuche es erneut oder kontaktiere den Support.',
		});
	}
}

export default {
	updateUserEmail,
	deleteUser,
};
