import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { regenerateSession } from './regenerate-session';

export function signUserIn(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
	password: string,
	user: User,
) {
	bcrypt.compare(password, user.hashedPassword, function (err, result) {
		if (err) next(err);

		if (!result) {
			return res.status(401).json({
				message: 'Passwort ist falsch.',
			});
		}
		regenerateSession(req, res, next, user);
	});
}
