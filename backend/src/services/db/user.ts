import { User } from '@prisma/client';
import { Context } from '../../configs/prisma';

async function createUser(email: string, hashedPassword: string, ctx: Context): Promise<User> {
	return await ctx.prisma.user.create({
		data: {
			email,
			hashedPassword,
		},
	});
}

async function getUserMessages(userId: string, ctx: Context) {
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

async function getUserByEmail(email: string, ctx: Context): Promise<User | null> {
	return await ctx.prisma.user.findUnique({
		where: {
			email,
		},
	});
}

async function getUserById(id: string, ctx: Context): Promise<User | null> {
	return await ctx.prisma.user.findUnique({
		where: {
			id,
		},
	});
}

async function updateUserEmailById(id: string, email: string, ctx: Context) {
	return await ctx.prisma.user.update({
		where: {
			id,
		},
		data: {
			email,
		},
	});
}

async function deleteUserById(id: string, ctx: Context) {
	return await ctx.prisma.user.delete({
		where: {
			id,
		},
	});
}

export default { createUser, getUserByEmail, getUserById, updateUserEmailById, deleteUserById, getUserMessages };
