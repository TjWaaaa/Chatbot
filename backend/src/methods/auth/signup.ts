import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { regenerateSession } from '../../utils/session';

const saltRounds = 10;
const prisma = new PrismaClient();

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	bcrypt.hash(req.body.password, saltRounds, async function (err, hashedPassword: string) {
		if (err) {
			return next(err);
		}

		try {
			const user = await prisma.user.create({
				data: {
					email: req.body.email,
					hashedPassword,
				},
				select: {
					id: true,
				},
			});
			regenerateSession(req, res, next, user);
		} catch (err) {
			return next(err);
		}
	});
};
