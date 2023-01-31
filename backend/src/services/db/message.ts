import { prisma } from '../../index';

export async function deleteAllMessages(userId: string) {
	await prisma.message.deleteMany({
		where: {
			Chat: {
				userId,
			},
		},
	});
}

export async function getMessageById(id: string) {
	return prisma.message.findUnique({
		where: {
			id,
		},
	});
}

export async function updateMessageById(id: string, text: string) {
	await prisma.message.update({
		where: {
			id,
		},
		data: {
			text,
		},
	});
}
