import { User } from '@prisma/client';
import { Context } from '../../configs/prisma';

export async function createUser(email: string, hashedPassword: string, ctx: Context): Promise<User> {
	return await ctx.prisma.user.create({
		data: {
			email,
			hashedPassword,
		},
	});
}

export async function getUserMessages(userId: string, ctx: Context) {
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

export async function getUserById(id: string, ctx: Context): Promise<User | null> {
	return await ctx.prisma.user.findUnique({
		where: {
			id,
		},
	});
}

export async function updateUserEmailById(id: string, email: string, ctx: Context) {
	return await ctx.prisma.user.update({
		where: {
			id,
		},
		data: {
			email,
		},
	});
}

export async function deleteUserById(id: string, ctx: Context) {
	return await ctx.prisma.user.delete({
		where: {
			id,
		},
	});
}
