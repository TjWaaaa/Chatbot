import { User } from '@prisma/client';
import prisma, { Context } from '../../../configs/prisma';
import { chatOnboardingData } from '../../../data/chatOnboarding.data';

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

export async function createOnboardingMessages(newUser: User, ctx: Context) {
	chatOnboardingData.forEach(async (chat) => {
		await ctx.prisma.chat.create({
			data: {
				chatBotType: chat.chatBotType,
				name: chat.name,
				img: chat.img,
				userId: newUser.id,
				messages: {
					createMany: {
						data: chat.messages,
					},
				},
			},
		});
	});
}
