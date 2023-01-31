import express from 'express';
import { createUser } from '../services/auth/create-user';
import { signUserIn } from '../services/auth/sign-user-in';
import { getUserByEmail } from '../services/db/user';

async function signup(req: express.Request, res: express.Response, next: express.NextFunction) {
	const { email, password } = req.body;

	try {
		const user = await getUserByEmail(email);

		if (user) {
			return res.status(400).json({
				message: 'Ein Benutzer mit dieser E-Mail Adresse existiert bereits. Bitte melde dich an.',
			});
		}

		createUser(req, res, next, password);
	} catch (err) {
		return res.status(400).json({
			message: 'Die Registierung ist fehlgeschlagen. Versuche es erneut oder kontaktiere den Support.',
		});
	}
}

async function signin(req: express.Request, res: express.Response, next: express.NextFunction) {
	const { email, password } = req.body;

	try {
		const user = await getUserByEmail(email);

		if (!user) {
			return res.status(400).json({
				message: 'Es existiert kein Benutzer mit dieser E-Mail Adresse. Bitte registriere dich zuerst.',
			});
		}

		signUserIn(req, res, next, password, user);
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
		} else {
			return res.status(200).json({ message: 'Erfolgreich abgemeldet.' });
		}
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
	signup,
	signin,
	logout,
	isAuthenticated,
};
