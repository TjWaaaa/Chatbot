import express from 'express';
import bcrypt from 'bcrypt';
import { regenerateSession } from './session';
import { User } from '@prisma/client';

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
