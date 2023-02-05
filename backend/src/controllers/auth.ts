import express from 'express';
import prismaContext from '../configs/prisma';
import { isPasswordCorrect, regenerateSession, signUserUp } from '../services/auth';
import { getUserByEmail } from '../services/db/user';

async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
	const { email, password } = req.body;

	try {
		const newUser = await signUserUp(email, password, prismaContext);

		regenerateSession(req, res, next, newUser);
	} catch (err: Error | any) {
		let message = 'Die Registierung ist fehlgeschlagen. Versuche es erneut oder kontaktiere den Support.';

		if (err.message === 'Ein Benutzer mit dieser E-Mail Adresse existiert bereits. Bitte melde dich an.') {
			message = 'Ein Benutzer mit dieser E-Mail Adresse existiert bereits. Bitte melde dich an.';
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
				message: 'Es existiert kein Benutzer mit dieser E-Mail Adresse. Bitte registriere dich zuerst.',
			});
		}

		const resultPasswordCorrect = await isPasswordCorrect(password, user);

		if (!resultPasswordCorrect) {
			return res.status(400).json({
				message: 'Das Passwort ist falsch. Bitte versuche es erneut.',
			});
		}

		regenerateSession(req, res, next, user);
	} catch (err) {
		return res.status(400).json({
			message: 'Ein Fehler beim Login ist passiert. Versuche es erneut oder kontaktiere den Support.',
		});
	}
}

async function logout(req: express.Request, res: express.Response) {
	req.session.destroy((err) => {
		if (err) {
			return res.status(400).json({ message: 'Abmeldung ist fehlgeschladen.' });
		}
		return res.status(200).json({ message: 'Erfolgreich abgemeldet.' });
	});
}

async function isAuthenticated(req: express.Request, res: express.Response) {
	const session = req.session;

	if (session && session.userId) {
		return res.status(200).json({
			message: 'User is authenticated',
			isLoggedIn: true,
		});
	}
	return res.status(401).json({
		message: 'User is not authenticated',
		isLoggedIn: false,
	});
}

export default {
	signUp,
	signIn,
	logout,
	isAuthenticated,
};
