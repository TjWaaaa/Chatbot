import { User } from '@prisma/client';
import { chatOnboardingData } from '../../data/chatOnboardingData';
import { prisma } from '../../index';

export async function createOnboardingMessages(newUser: User) {
	chatOnboardingData.forEach(async (chat) => {
		await prisma.chat.create({
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
