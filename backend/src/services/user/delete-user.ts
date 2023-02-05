import { User } from '@prisma/client';
import { Context } from '../../configs/prisma';
import { deleteUserById } from '../db/user';
import { getUser } from './get-user';

export const deleteUser = async (userId: string, ctx: Context): Promise<User> => {
	await getUser(userId, ctx);

	return deleteUserById(userId, ctx);
};
