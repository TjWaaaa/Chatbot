import { Context } from '../../configs/prisma';

interface CreateMessage {
	text: string;
	sentByUser: boolean;
	chatId: string;
}

export async function createMessage(message: CreateMessage, ctx: Context) {
	await ctx.prisma.message.create({
		data: message,
	});
}

export async function deleteAllMessages(userId: string, ctx: Context) {
	await ctx.prisma.message.deleteMany({
		where: {
			Chat: {
				userId,
			},
		},
	});
}

export async function getMessageById(id: string, ctx: Context) {
	return ctx.prisma.message.findUnique({
		where: {
			id,
		},
	});
}

export async function updateMessageById(id: string, text: string, ctx: Context) {
	await ctx.prisma.message.update({
		where: {
			id,
		},
		data: {
			text,
		},
	});
}
