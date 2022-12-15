import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			throw new Error();
		}

		bcrypt.compare(req.body.password, user.hashedPassword, function (err, result) {
			if (err) {
				return next(err);
			}

			if (!result) {
				res.status(401).send('Password is wrong');
			}
			res.status(200).send('User successfully logged in');
		});
	} catch (err) {
		res.status(404).send('User not found');
	}
};
