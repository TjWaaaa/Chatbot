import userQueries from '../db/user';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import logger from '../../utils/logger';
import { createOnboardingMessages } from '../db/message';
import { Context } from '../../configs/prisma';

const SALT_ROUNDS = 10;

export async function createUser(email: string, password: string, ctx: Context): Promise<User> {
	try {
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		if (await userQueries.getUserByEmail(email, ctx)) {
			throw new Error('User already exists');
		}

		const newUser = await userQueries.createUser(email, hashedPassword, ctx);

		logger.info(`User ${newUser.id} created`);

		await createOnboardingMessages(newUser, ctx);

		return newUser;
	} catch (err) {
		logger.error(err);
		throw err;
	}
}

export const readUserById = async (userId: string, ctx: Context) => {
	return await userQueries.getUserById(userId, ctx);
};

export const readUserByEmail = async (email: string, ctx: Context) => {
	return await userQueries.getUserByEmail(email, ctx);
};

export const updateUserEmail = async (userId: string, newEmail: string, ctx: Context): Promise<boolean> => {
	if (!(await userQueries.getUserById(userId, ctx))) return false;

	await userQueries.updateUserEmailById({ id: userId, newEmail: newEmail }, ctx);
	return true;
};

export const deleteUserById = async (userId: string, ctx: Context): Promise<boolean> => {
	if (!(await userQueries.getUserById(userId, ctx))) return false;

	await userQueries.deleteUserById(userId, ctx);
	return true;
};

export default {
	createUser,
	readUserById,
	readUserByEmail,
	updateUserEmail,
	deleteUserById,
};
