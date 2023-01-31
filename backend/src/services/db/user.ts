import { User } from '@prisma/client';
import { prisma } from '../..';

export async function getUserByEmail(email: string): Promise<User | null> {
	return await prisma.user.findUnique({
		where: {
			email,
		},
	});
}

export async function getUserById(id: string): Promise<User | null> {
	return await prisma.user.findUnique({
		where: {
			id,
		},
	});
}

export async function updateUserEmailById(id: string, email: string) {
	await prisma.user.update({
		where: {
			id,
		},
		data: {
			email,
		},
	});
}

export async function deleteUserById(id: string) {
	await prisma.user.delete({
		where: {
			id,
		},
	});
}
