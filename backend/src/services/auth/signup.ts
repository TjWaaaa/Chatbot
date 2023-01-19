import express from 'express';
import bcrypt from 'bcrypt';
import logger from '~/utils/logger';
import { regenerateSession } from './session';
import { prisma } from '~/index';
import seedNewUser from '../prismaApi/seedNewUser';

const SALT_ROUNDS = 10;

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
				message: 'Ein Benutzer mit dieser E-Mail Adresse existiert bereits. Bitte melde dich an.',
			});
		}

		bcrypt.hash(password, SALT_ROUNDS, async function (err, hashedPassword: string) {
			if (err) {
				return next(err);
			}

			const newUser = await prisma.user.create({
				data: {
					email,
					hashedPassword,
				},
			});

			seedNewUser(newUser);

			logger.info(`User ${newUser.id} created`);
			regenerateSession(req, res, next, newUser);
		});
	} catch (err) {
		return res.status(400).json({
			message: 'Die Registierung ist fehlgeschlagen. Versuche es erneut oder kontaktiere den Support.',
		});
	}
};
