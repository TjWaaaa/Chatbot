import express from 'express';
import prismaContext from '../configs/prisma';
import {
	USER_CREATE_ERROR,
	USER_DELETE_ERROR,
	USER_DOES_NOT_EXIST,
	USER_EMAIL_ALREADY_EXISTS,
	USER_READ_ERROR,
	USER_UPDATE_ERROR,
} from '../consts/error-messages';
import { deleteUser } from '../services/user/delete-user';
import { updateUserEmail } from '../services/user/update-user';
import userDb from '../services/db/user';

async function postUser(req: express.Request, res: express.Response) {
	const { email, password } = req.body;

	try {
		const user = await userDb.getUserByEmail(email, prismaContext);

		if (user) {
			return res.status(400).json({
				message: USER_EMAIL_ALREADY_EXISTS,
			});
		}

		await userDb.createUser(email, password, prismaContext);

		return res.status(200).json({
			message: 'Benutzer erstellt',
		});
	} catch (err) {
		return res.status(400).json({
			message: USER_CREATE_ERROR,
		});
	}
}

async function getUser(req: express.Request, res: express.Response) {
	const id = req.params.id;

	try {
		const user = await userDb.getUserById(id, prismaContext);

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
			message: USER_READ_ERROR,
		});
	}
}

async function patchUser(req: express.Request, res: express.Response) {
	const id = req.params.id;
	const { email } = req.body;

	try {
		await updateUserEmail(id, email, prismaContext);

		return res.status(200).json({
			message: 'Benutzer geändert',
		});
	} catch (err: Error | any) {
		let message = USER_UPDATE_ERROR;

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
			message: 'Benutzer gelöscht',
		});
	} catch (err: Error | any) {
		let message = USER_DELETE_ERROR;
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
