import { User } from '@prisma/client';
import { Context } from '../../configs/prisma';
import userDb from '../db/user';
import { getUser } from './get-user';

export const updateUserEmail = async (userId: string, newEmail: string, ctx: Context): Promise<User> => {
	await getUser(userId, ctx);

	return await userDb.updateUserEmailById(userId, newEmail, ctx);
};
