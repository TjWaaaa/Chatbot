import { User } from '@prisma/client';
import { Context } from '../../configs/prisma';
import { chatOnboardingData } from '../../data/chatOnboarding.data';
import { ChatBotType } from '../../enums/chat-bot-type';

export async function getChat(userId: string, chatBotType: ChatBotType, ctx: Context) {
	return await ctx.prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			chats: {
				where: {
					chatBotType: chatBotType,
				},
				select: {
					id: true,
					chatBotType: true,
					messages: true,
				},
			},
		},
	});
}

export async function createOnboardingMessages(newUser: User, ctx: Context) {
	const onboarding = await Promise.all(
		chatOnboardingData.map(async (chat) => {
			return ctx.prisma.chat.create({
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
		}),
	);

	console.log(onboarding);
	return onboarding;
}

export default {
	getChat,
	createOnboardingMessages,
};
