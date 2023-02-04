import express from 'express';
import { deleteUserById, getUserById, updateUserEmailById } from '../services/db/user';

async function postUser(req: express.Request, res: express.Response) {
	const { email, password } = req.body;

	console.log(email);
	try {
		if (await readUserByEmail(email, prismaContext)) {
			return res.status(400).json({
				message: 'Es existiert bereits ein Benutzer mit dieser Email Adresse.',
			});
		} else {
			await createUser(email, password, prismaContext);
			return res.status(200).json({
				message: 'User created',
			});
		}
	} catch (err) {
		return res.status(400).json({
			message: 'Ein Fehler beim Anlegen des Users ist passiert. Versuche es erneut oder kontaktiere den Support.',
		});
	}
}

async function getUser(req: express.Request, res: express.Response) {
	const { email } = req.body;

	try {
		const user = await readUserByEmail(email, prismaContext);

		if (!user) {
			return res.status(400).json({
				message: 'Es existiert kein Benutzer mit dieser ID. Bitte registriere dich zuerst.',
			});
		} else {
			return res.status(200).json({
				user: {
					id: user.id,
					email: user.email,
				},
			});
		}
	} catch (err) {
		return res.status(400).json({
			message: 'Ein Fehler beim Lesen des Users ist passiert. Versuche es erneut oder kontaktiere den Support.',
		});
	}
}

async function patchUser(req: express.Request, res: express.Response) {
	const id = req.params.id;
	const { email } = req.body;

	try {
		if (!updateUserEmail(id, email, prismaContext)) {
			return res.status(400).json({
				message: 'Es existiert kein Benutzer mit dieser ID. Bitte registriere dich zuerst.',
			});
		}

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
		if (!(await deleteUserById(id, prismaContext))) {
			return res.status(400).json({
				message: 'Es existiert kein Benutzer mit dieser ID. Bitte registriere dich zuerst.',
			});
		}

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
	postUser,
	getUser,
	patchUser,
	deleteUser,
};
