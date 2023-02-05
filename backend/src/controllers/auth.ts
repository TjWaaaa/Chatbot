import express from 'express';
import prismaContext from '../configs/prisma';
import {
	LOGOUT_FAILED,
	PASSWORD_IS_INCORRECT,
	SIGN_IN_ERROR,
	SIGN_UP_ERROR,
	USER_EMAIL_ALREADY_EXISTS,
	USER_EMAIL_NOT_EXISTS,
} from '../consts/error-messages';
import { isPasswordCorrect, regenerateSession, signUserUp } from '../services/auth';
import { getUserByEmail } from '../services/db/user';

async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
	const { email, password } = req.body;

	try {
		const newUser = await signUserUp(email, password, prismaContext);

		regenerateSession(req, res, next, newUser);
	} catch (err: Error | any) {
		let message = SIGN_UP_ERROR;

		if (err.message === USER_EMAIL_ALREADY_EXISTS) {
			message = err.message;
		}

		return res.status(400).json({
			message,
		});
	}
}

async function signIn(req: express.Request, res: express.Response, next: express.NextFunction) {
	const { email, password } = req.body;

	try {
		const user = await getUserByEmail(email, prismaContext);

		if (!user) {
			return res.status(400).json({
				message: USER_EMAIL_NOT_EXISTS,
			});
		}

		const resultPasswordCorrect = await isPasswordCorrect(password, user);

		if (!resultPasswordCorrect) {
			return res.status(400).json({
				message: PASSWORD_IS_INCORRECT,
			});
		}

		regenerateSession(req, res, next, user);
	} catch (err) {
		return res.status(400).json({
			message: SIGN_IN_ERROR,
		});
	}
}

async function logout(req: express.Request, res: express.Response) {
	req.session.destroy((err) => {
		if (err) {
			return res.status(400).json({ message: LOGOUT_FAILED });
		}
		return res.status(200).json({ message: 'Erfolgreich abgemeldet.' });
	});
}

async function isAuthenticated(req: express.Request, res: express.Response) {
	const session = req.session;

	if (session && session.userId) {
		return res.status(200).json({
			message: 'Benutzer ist authentifiziert',
			isLoggedIn: true,
		});
	}
	return res.status(401).json({
		message: 'Benutzer ist nicht authentifiziert',
		isLoggedIn: false,
	});
}

export default {
	signUp,
	signIn,
	logout,
	isAuthenticated,
};
