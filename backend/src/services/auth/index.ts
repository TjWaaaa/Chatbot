import { User } from '@prisma/client';
import { Context } from '../../configs/prisma';
import { USER_EMAIL_ALREADY_EXISTS } from '../../consts/error-messages';
import { createOnboardingMessages } from '../db/chat';
import userDb from '../db/user';
import bcrypt from 'bcrypt';
import logger from '../../utils/logger';
import express from 'express';

export async function isPasswordCorrect(password: string, user: User): Promise<boolean> {
	try {
		return await bcrypt.compare(password, user.hashedPassword);
	} catch (err) {
		logger.error(err);
		throw err;
	}
}

export function regenerateSession(req: express.Request, res: express.Response, next: express.NextFunction, user: User) {
	req.session.regenerate(function (err) {
		if (err) next(err);

		req.session.userId = user.id;

		req.session.save(function (err) {
			if (err) next(err);
			return res.status(200).json({ message: 'Session generated' });
		});
	});
}

const SALT_ROUNDS = 10;

export async function signUserUp(email: string, password: string, ctx: Context): Promise<User> {
	try {
		const user = await userDb.getUserByEmail(email, ctx);

		if (user) {
			throw new Error(USER_EMAIL_ALREADY_EXISTS);
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		const newUser = await userDb.createUser(email, hashedPassword, ctx);

		logger.info(`User ${newUser.id} created`);

		createOnboardingMessages(newUser, ctx);

		return newUser;
	} catch (err) {
		logger.error(err);
		throw err;
	}
}
export default {
	isPasswordCorrect,
	regenerateSession,
	signUserUp,
};
