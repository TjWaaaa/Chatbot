import { User } from '@prisma/client';
import { Context } from '../../configs/prisma';
import { USER_DOES_NOT_EXIST } from '../../consts/error-messages';
import userDb from '../db/user';

const updateUserEmail = async (userId: string, newEmail: string, ctx: Context): Promise<User> => {
	await getUser(userId, ctx);

	return await userDb.updateUserEmailById(userId, newEmail, ctx);
};

async function getUser(userId: string, ctx: Context): Promise<User> {
	const user = await userDb.getUserById(userId, ctx);

	if (!user) {
		throw new Error(USER_DOES_NOT_EXIST);
	}

	return user;
}

const deleteUser = async (userId: string, ctx: Context): Promise<User> => {
	await getUser(userId, ctx);

	return userDb.deleteUserById(userId, ctx);
};

export default { deleteUser, updateUserEmail, getUser };
