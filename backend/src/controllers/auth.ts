import express from 'express';
import { signUserUp } from '../services/auth/create-user';
import { regenerateSession } from '../services/auth/regenerate-session';
import { isPasswordCorrect } from '../services/auth/sign-user-in';
import { getUserByEmail } from '../services/db/user';

async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
	const { email, password } = req.body;

	try {
		const user = await getUserByEmail(email);

		if (user) {
			return res.status(400).json({
				message: 'Ein Benutzer mit dieser E-Mail Adresse existiert bereits. Bitte melde dich an.',
			});
		}

		const newUser = await signUserUp(email, password);

		regenerateSession(req, res, next, newUser);
	} catch (err) {
		return res.status(400).json({
			message: 'Die Registierung ist fehlgeschlagen. Versuche es erneut oder kontaktiere den Support.',
		});
	}
}

async function signIn(req: express.Request, res: express.Response, next: express.NextFunction) {
	const { email, password } = req.body;

	try {
		const user = await getUserByEmail(email);

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
	signup: signUp,
	signin: signIn,
	logout,
	isAuthenticated,
};
