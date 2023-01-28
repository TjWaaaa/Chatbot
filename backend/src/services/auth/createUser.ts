import express from 'express';
import bcrypt from 'bcrypt';
import { regenerateSession } from './session';
import { prisma } from '../../index';
import logger from '../../utils/logger';
import { createOnboardingMessages } from '../prismaApi/create-onboarding-messages';

const SALT_ROUNDS = 10;

export function createUser(req: express.Request, res: express.Response, next: express.NextFunction, password: string) {
	bcrypt.hash(password, SALT_ROUNDS, async function (err, hashedPassword: string) {
		if (err) next(err);

		const newUser = await prisma.user.create({
			data: {
				email: req.body.email,
				hashedPassword,
			},
		});
		await createOnboardingMessages(newUser);

		logger.info(`User ${newUser.id} created`);
		regenerateSession(req, res, next, newUser);
	});
}
