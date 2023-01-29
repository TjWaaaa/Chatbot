import { User } from '@prisma/client';
import { prisma } from '../..';

export default async function (email: string): Promise<User | null> {
	return await prisma.user.findUnique({
		where: {
			email,
		},
	});
}
