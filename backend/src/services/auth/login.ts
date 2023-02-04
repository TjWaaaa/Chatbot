import express from 'express';
import bcrypt from 'bcrypt';
import { regenerateSession } from './session';
import prismaContext from '../../configs/prisma';
import { getUserByEmail } from '../db/user';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await getUserByEmail(email, prismaContext);

		if (!user) {
			return res.status(400).json({
				message: 'Es existiert kein Benutzer mit dieser E-Mail Adresse. Bitte registriere dich zuerst.',
			});
		}

		bcrypt.compare(password, user.hashedPassword, function (err, result) {
			if (err) {
				return next(err);
			}

			if (!result) {
				return res.status(401).json({
					message: 'Passwort ist falsch.',
				});
			}
			regenerateSession(req, res, next, user);
		});
	} catch (err) {
		return res.status(400).json({
			message: 'Ein Fehler beim Login ist passiert. Versuche es erneut oder kontaktiere den Support.',
		});
	}
};
