import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const prisma = new PrismaClient();

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	bcrypt.hash(req.body.password, saltRounds, async function (err, hashedPassword: string) {
		if (err) {
			return next(err);
		}

		try {
			await prisma.user.create({
				data: {
					email: req.body.email,
					hashedPassword,
				},
			});
		} catch (err) {
			return next(err);
		}

		res.status(200).send('User Registered successfully');
	});
};
