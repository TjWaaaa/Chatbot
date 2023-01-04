import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
import { regenerateSession } from './session';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return res.status(400).json({
				message: 'User does not exist',
			});
		}

		bcrypt.compare(password, user.hashedPassword, function (err, result) {
			if (err) {
				return next(err);
			}

			if (!result) {
				return res.status(401).json({
					message: 'Password is incorrect',
				});
			}
			regenerateSession(req, res, next, user);
		});
	} catch (err) {
		return res.status(400).json({
			message: 'Login user failed',
		});
	}
};
