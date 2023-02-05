import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Context } from '../../configs/prisma';
import { USER_EMAIL_ALREADY_EXISTS } from '../../consts/error-messages';
import logger from '../../utils/logger';
import { createOnboardingMessages } from '../db/chat';
import userDb from '../db/user';
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
