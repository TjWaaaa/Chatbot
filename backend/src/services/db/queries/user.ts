import { User } from '@prisma/client';
import prisma, { Context } from '../../../configs/prisma';

export async function createUser(email: string, hashedPassword: string, ctx: Context): Promise<User> {
	return await ctx.prisma.user.create({
		data: {
			email,
			hashedPassword,
		},
	});
}

export async function getUserById(userId: string, ctx: Context) {
	return await ctx.prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			email: true,
			chats: {
				select: {
					id: false,
					chatBotType: true,
					name: true,
					img: true,
					messages: {
						select: {
							id: false,
							chatId: false,
							text: true,
							sentByUser: true,
							timeStamp: true,
						},
					},
				},
			},
		},
	});
}

export async function getUserByEmail(email: string, ctx: Context): Promise<User | null> {
	return await ctx.prisma.user.findUnique({
		where: {
			email,
		},
	});
}

interface UpdateUserEmailById {
	id: string;
	newEmail: string;
}

export async function updateUserEmailById(userData: UpdateUserEmailById, ctx: Context) {
	await ctx.prisma.user.update({
		where: {
			id: userData.id,
		},
		data: {
			email: userData.newEmail,
		},
	});
}

export async function deleteUserById(id: string, ctx: Context): Promise<boolean> {
	if (
		await ctx.prisma.user.delete({
			where: {
				id,
			},
		})
	)
		return true;
	else return false;
}

export default {
	createUser,
	getUserById,
	getUserByEmail,
	updateUserEmailById,
	deleteUserById,
};
