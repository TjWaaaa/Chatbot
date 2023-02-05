import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Context } from '../../configs/prisma';
import logger from '../../utils/logger';
import { createOnboardingMessages } from '../db/chat';
import { createUser, getUserByEmail } from '../db/user';

const SALT_ROUNDS = 10;

export async function signUserUp(email: string, password: string, ctx: Context): Promise<User> {
	try {
		const user = await getUserByEmail(email, ctx);

		if (user) {
			throw new Error('Ein Benutzer mit dieser E-Mail Adresse existiert bereits. Bitte melde dich an.');
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		const newUser = await createUser(email, hashedPassword, ctx);

		logger.info(`User ${newUser.id} created`);

		createOnboardingMessages(newUser, ctx);

		return newUser;
	} catch (err) {
		logger.error(err);
		throw err;
	}
}
