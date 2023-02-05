import express from 'express';
import prismaContext from '../configs/prisma';
import { USER_DOES_NOT_EXIST } from '../consts/error-messages';
import { createUser, getUserByEmail, getUserById } from '../services/db/user';
import { deleteUser } from '../services/user/delete-user';
import { updateUserEmail } from '../services/user/update-user';

async function postUser(req: express.Request, res: express.Response) {
	const { email, password } = req.body;

	try {
		if (await getUserByEmail(email, prismaContext)) {
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
	const id = req.params.id;

	try {
		const user = await getUserById(id, prismaContext);

		if (!user) {
			return res.status(400).json({
				message: USER_DOES_NOT_EXIST,
			});
		}
		return res.status(200).json({
			user: {
				id: user.id,
				email: user.email,
			},
		});
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
		await updateUserEmail(id, email, prismaContext);

		return res.status(200).json({
			message: 'User updated',
		});
	} catch (err: Error | any) {
		let message =
			'Ein Fehler beim Updaten des Users ist passiert. Versuche es erneut oder kontaktiere den Support.';
		if (err.message === USER_DOES_NOT_EXIST) {
			message = USER_DOES_NOT_EXIST;
		}

		return res.status(400).json({
			message,
		});
	}
}

async function deleteU(req: express.Request, res: express.Response) {
	const id = req.params.id;
	try {
		await deleteUser(id, prismaContext);

		return res.status(200).json({
			message: 'User deleted',
		});
	} catch (err: Error | any) {
		let message =
			'Ein Fehler beim Löschen des Users ist passiert. Versuche es erneut oder kontaktiere den Support.';
		if (err.message === USER_DOES_NOT_EXIST) {
			message = USER_DOES_NOT_EXIST;
		}

		return res.status(400).json({
			message,
		});
	}
}

export default {
	postUser,
	getUser,
	patchUser,
	deleteU,
};
