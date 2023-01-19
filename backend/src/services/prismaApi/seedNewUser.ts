import { prisma } from '~/index';
import { chatOnboardingData } from '~/chatOnboardingData';
import { User } from '@prisma/client';

export default async function seedNewUser(newUser: User) {
	for (const chat of chatOnboardingData) {
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
	}
}
