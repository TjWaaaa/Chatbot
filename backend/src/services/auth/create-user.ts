import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import logger from '../../utils/logger';
import { createOnboardingMessages } from '../db/create-onboarding-messages';
import { createUser } from '../db/user';

const SALT_ROUNDS = 10;

export async function signUserUp(email: string, password: string): Promise<User> {
	try {
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		const newUser = await createUser(email, hashedPassword);

		logger.info(`User ${newUser.id} created`);

		createOnboardingMessages(newUser);

		return newUser;
	} catch (err) {
		logger.error(err);
		throw new Error();
	}
}
