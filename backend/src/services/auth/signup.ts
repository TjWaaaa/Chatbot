import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { regenerateSession } from '../../utils/session';

const SALT_ROUNDS = 10;
const prisma = new PrismaClient();

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (user) {
			return res.status(400).json({
				message: 'User already exists',
			});
		}

		bcrypt.hash(password, SALT_ROUNDS, async function (err, hashedPassword: string) {
			if (err) {
				return next(err);
			}

			const newUser = await prisma.user.create({
				data: {
					email: req.body.email,
					hashedPassword,
				},
				select: {
					id: true,
				},
			});
			regenerateSession(req, res, next, newUser);
			return res.status(200).json({ message: 'User successfully created and logged in' });
		});
	} catch (err) {
		return res.status(400).json({
			message: 'Signup user failed',
		});
	}
};
