import { User } from '@prisma/client';
import { Context } from '../../configs/prisma';
import userDb from '../db/user';
import { getUser } from './get-user';

export const deleteUser = async (userId: string, ctx: Context): Promise<User> => {
	await getUser(userId, ctx);

	return userDb.deleteUserById(userId, ctx);
};
